import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter } from 'astro/markdown';
import { htmlToHast, markdownToMdast, mdxToMdast, type MdastNode, type HastNode } from 'satteri';
import { resolveWikiLink, routeHref, sourceToId } from './paths';

export const wikiRoot = fileURLToPath(new URL('../../wikis/', import.meta.url));

export function visitTree(node: MdastNode, visit: (node: MdastNode) => void): void {
	visit(node);
	if ('children' in node) for (const child of node.children) visitTree(child, visit);
}

function textContent(node: MdastNode): string {
	if ('value' in node && typeof node.value === 'string') return node.value;
	if ('children' in node) return node.children.map(textContent).join('');
	return '';
}

export function readWikiDocument(filePath: string) {
	const { content } = parseFrontmatter(readFileSync(filePath, 'utf8'));
	const tree = filePath.endsWith('.mdx') ? mdxToMdast(content) : markdownToMdast(content);
	const children = 'children' in tree ? tree.children : [];
	const first = children.find((node) => node.type !== 'mdxjsEsm' && node.type !== 'yaml' && node.type !== 'definition'
		&& !(node.type === 'html' && /^\s*<!--[\s\S]*-->\s*$/.test(node.value)));
	const heading = children.find((node) => node.type === 'heading' && node.depth === 1);
	const firstTitle = heading ? textContent(heading).trim() : undefined;
	const leadingTitle = first?.type === 'heading' && first.depth === 1 ? textContent(first).trim() : undefined;
	return { tree, firstTitle, leadingTitle };
}

export function publishedHref(source: string, href: string, root = wikiRoot, base = '/'): string | undefined {
	const target = resolveWikiLink(source, href);
	if (target.kind === 'private') return undefined;
	if (target.kind === 'unchanged') return href;
	if (!existsSync(path.join(root, target.source))) {
		throw new Error(`Broken Wiki link in "${source}": "${href}" targets missing "${target.source}".`);
	}
	return routeHref(sourceToId(target.source), base) + target.suffix;
}

export function validateWikiLinks(source: string, tree: MdastNode, root = wikiRoot): void {
	visitTree(tree, (node) => {
		if (node.type === 'link' || node.type === 'definition') publishedHref(source, node.url, root);
		if (node.type === 'html') validateHtml(htmlToHast(node.value));
		if ((node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && node.name === 'a') {
			for (const attr of node.attributes) {
				if (attr.type === 'mdxJsxAttribute' && attr.name === 'href' && typeof attr.value === 'string') {
					publishedHref(source, attr.value, root);
				}
			}
		}
	});
	function validateHtml(node: HastNode): void {
		if (node.type === 'element' && node.tagName === 'a' && typeof node.properties?.href === 'string') {
			publishedHref(source, node.properties.href, root);
		}
		if ('children' in node) for (const child of node.children) validateHtml(child);
	}
}
