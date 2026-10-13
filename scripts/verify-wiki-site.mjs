import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const project = fileURLToPath(new URL('../', import.meta.url));
const fixture = mkdtempSync(path.join(tmpdir(), 'lifewiki-site-'));
const cli = path.join(fixture, 'node_modules/astro/bin/astro.mjs');
function write(relative, content) {
	const file = path.join(fixture, relative);
	mkdirSync(path.dirname(file), { recursive: true });
	writeFileSync(file, content);
}
function build(expectError) {
	const result = spawnSync(process.execPath, [cli, 'build'], { cwd: fixture, encoding: 'utf8' });
	const output = result.stdout + result.stderr;
	if (expectError) {
		assert.notEqual(result.status, 0, `Expected build failure: ${expectError}\n${output}`);
		assert.match(output, expectError);
	} else assert.equal(result.status, 0, output);
}
function html(route = '') { return decodeURI(readFileSync(path.join(fixture, 'dist', route, 'index.html'), 'utf8')); }
const article = `---
title: 如何理解反馈
created: '2026-10-09'
updated: '2026-10-10'
tags:
  - feedback
  - learning
sidebar:
  order: 1
  label: 反馈
---
# 如何理解反馈

[主题](README.md?from=article#成长) [图示](diagram.mdx) [主页](../README.md)

[参考入口][topic] [维护规则][private]

[topic]: README.md#成长
[private]: ../_meta/constitution.md

:::note
正文中的提示。
:::
`;
try {
	for (const file of ['astro.config.mjs', 'tsconfig.json', 'package.json', 'pnpm-lock.yaml', 'src', 'public']) {
		cpSync(path.join(project, file), path.join(fixture, file), { recursive: true });
	}
	// Astro's virtual style modules require dependencies to live inside the fixture root.
	const install = spawnSync('pnpm', ['install', '--offline', '--frozen-lockfile', '--ignore-scripts'], { cwd: fixture, encoding: 'utf8' });
	assert.equal(install.status, 0, install.stdout + install.stderr);
	write('wikis/README.md', '# 人生 Wiki\n\n[成长](growth/README.md) [维护](../skills/personal-wiki-editor/SKILL.md)\n');
	write('wikis/growth/README.md', '# 成长\n\n[反馈](01-feedback.md#如何理解反馈) [深层主题](habits/README.md)\n');
	write('wikis/growth/habits/README.md', '<!-- 维护备注 -->\n\n[parent]: ../README.md\n\n# 习惯\n\n[上层][parent]\n');
	write('wikis/growth/01-feedback.md', article);
	write('src/components/FixtureNote.astro', '<aside data-fixture-component="rendered">组件正文</aside>');
	write('wikis/growth/diagram.mdx', `---
title: 反馈图示
tags:
  - feedback
---
import Note from '@components/FixtureNote.astro';

# 反馈图示

<Note />

[正文](01-feedback.md#如何理解反馈)

<a href="README.md#成长">MDX 链接</a>

<a href="../_meta/constitution.md">私有链接</a>
`);
	write('wikis/_meta/constitution.md', '# 不公开\n');
	write('wikis/.hidden/README.md', '# 不公开\n');
	write('wikis/growth/_scratch.md', '# 不公开\n');
	write('wikis/growth/hidden.md', '---\ntitle: 隐藏导航\nsidebar:\n  hidden: true\n---\n正文\n');
	write('wikis/growth/draft.md', '---\ntitle: 草稿\ndraft: true\n---\n正文\n');
	write('wikis/conversion.md', '---\ntitle: 格式转换\ntags: [feedback]\n---\n转换后正文\n');
	build();
	assert.match(html(), /<html[^>]*lang="zh-CN"/);
	assert.match(html(), /href="\/growth\/"/);
	assert.match(html('growth'), /href="\/growth\/01-feedback\/#如何理解反馈"/);
	assert.match(html('growth/habits'), /href="\/growth\/"/);
	const feedback = html('growth/01-feedback');
	assert.equal((feedback.match(/<h1\b/g) ?? []).length, 1);
	assert.match(feedback, /id="如何理解反馈"/);
	assert.match(feedback, /id="_top"/);
	assert.match(feedback, /href="\/growth\/\?from=article#成长"/);
	assert.match(feedback, /href="\/growth\/#成长"/);
	assert.match(feedback, /starlight-aside--note/);
	assert.match(feedback, /datetime="2026-10-10/);
	assert.match(feedback, /<\/div>\s*<ul[^>]*class="wiki-tags/);
	const tagHues = [...feedback.matchAll(/<li[^>]*style="--tag-hue: ([^"]+)"/g)].map((match) => match[1]);
	assert.equal(tagHues.length, 2);
	assert.equal(new Set(tagHues).size, 2);
	assert.doesNotMatch(html(), /<ul[^>]*class="wiki-tags/);
	assert.match(html('conversion'), /<\/h1>\s*<ul[^>]*class="wiki-tags/);
	assert.match(html('conversion'), new RegExp(`--tag-hue: ${tagHues[0]}`));
	const diagram = html('growth/diagram');
	assert.match(diagram, /data-fixture-component="rendered"/);
	assert.match(diagram, /href="\/growth\/#成长"/);
	assert.equal((diagram.match(/<h1\b/g) ?? []).length, 1);
	assert.match(diagram, /<\/div>\s*<ul[^>]*class="wiki-tags/);
	assert.match(diagram, new RegExp(`--tag-hue: ${tagHues[0]}`));
	for (const page of [html(), feedback, diagram]) {
		assert.doesNotMatch(page, /href="[^\"]*(?:_meta|skills|\.md(?:x)?(?:[?#"]))/);
		assert.doesNotMatch(page, /href="\/growth\/(?:hidden|draft)\//);
	}
	for (const route of ['_meta/constitution', '.hidden', 'growth/_scratch', 'growth/draft']) {
		assert.equal(existsSync(path.join(fixture, 'dist', route, 'index.html')), false, route);
	}
	renameSync(path.join(fixture, 'wikis/conversion.md'), path.join(fixture, 'wikis/conversion.mdx'));
	build();
	assert.match(html('conversion'), /转换后正文/);
	rmSync(path.join(fixture, 'wikis/growth/diagram.mdx'));
	build(/Broken Wiki link/);
	write('wikis/growth/diagram.mdx', '---\ntitle: 反馈图示\n---\n图示\n');
	write('wikis/growth/01-feedback.mdx', '---\ntitle: 冲突\n---\n');
	build(/Wiki route collision/);
	rmSync(path.join(fixture, 'wikis/growth/01-feedback.mdx'));
	write('wikis/growth.md', '---\ntitle: 路由冲突\n---\n');
	build(/Wiki route collision/);
	rmSync(path.join(fixture, 'wikis/growth.md'));
	write('wikis/index.md', '---\ntitle: 首页冲突\n---\n');
	build(/Wiki route collision/);
	rmSync(path.join(fixture, 'wikis/index.md'));
	write('wikis/growth/01-feedback.md', article + '\n<a href="missing.md">错误 HTML 链接</a>\n');
	build(/Broken Wiki link/);
	write('wikis/growth/01-feedback.md', article);
	write('wikis/growth/bad-date.md', "---\ntitle: 错误日期\nupdated: '2026-02-30'\n---\n正文\n");
	build(/updated/);
	rmSync(path.join(fixture, 'wikis/growth/bad-date.md'));
	write('wikis/growth/no-title.md', '# 普通页必须有元数据\n');
	build(/title/);
	console.log('Wiki site verification passed: routes, metadata, Markdown/MDX links, components, privacy, cached graph validation, collisions, required page titles.');
} finally {
	rmSync(fixture, { recursive: true, force: true });
}
