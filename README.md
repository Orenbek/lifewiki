# 人生 Wiki

与 Agent 一起讨论、对齐并沉淀想法、观点、经历和知识。允许先保存未成熟的材料，再逐步整理出清楚的文章和连贯的主题。

## 入口与职责

- [人生 Wiki](wikis/README.md)是知识源入口。
- [Wiki 宪法](wikis/_meta/constitution.md)规定稳定原则。
- [personal-wiki-editor](skills/personal-wiki-editor/SKILL.md)负责记录、讨论对齐、文章编辑和主题综合。
- [wiki-documentation](skills/wiki-documentation/SKILL.md)负责归位、元数据、索引、链接与维护。
- [wikis-locator](agents/wikis-locator.md)负责只读检索。

例如，可以让 Agent “记下这段想法”“把刚才讨论的判断整理成一页”，或“梳理这个主题下已经形成的认识”。纯讨论不会自动写入；写入基于明确指令或已对齐内容。

## Agent 使用

[AGENTS.md](AGENTS.md)给出本地 skill 与 Agent 的读取入口。Skill 指令使用英文，模板和 Wiki 内容使用中文。

这些资产以 `agent-harness/plugins/shared/project-wiki` 为初始来源，在本仓库针对个人知识编辑作了修改，由本仓库维护。

## 网站

Astro 与 Starlight 直接读取 `wikis/` 中的 `.md` 和 `.mdx`。文章只维护这一份；`src/` 保存网站配置、组件和发布适配。

- `src/content.config.ts` 定义文章加载和元数据校验；`astro.config.mjs` 配置网站展示。
- 根 `wikis/README.md` 对应网站首页，主题下的 `README.md` 对应该主题入口。索引仍使用普通 Markdown，以首个 H1 作为标题。
- Wiki 中继续使用相对文件链接，例如 `./ideas/README.md`、`./01-introduction.md#背景`，发布时转换为网页地址。目标页面必须存在；开发时输出断链诊断，构建时遇到断链或重复网址会失败。
- 下划线或点号开头的文件和目录不发布，包括 `_meta/`。指向这些文件或 Wiki 外文件的 Markdown 链接在网站中显示为普通文字；仓库里的原始链接保留。
- 页面图片放在 Markdown 所在目录的 `assets/` 下，用 `![图片说明](./assets/example.png)` 引用；构建时由 Astro 处理，无需复制到 `public/`。
- 普通文章优先使用 `.md`。需要 Astro 组件时使用 `.mdx`，通过 `@components/` 导入 `src/components/` 下的组件。
- 侧栏根据实际目录和索引标题生成；页面可用 Starlight 的 `sidebar.order`、`sidebar.label` 和 `sidebar.hidden` 调整导航。文件路径决定网址，移动或重编号页面时同步修复引用。

例如，在 MDX 页面中引用组件：

```mdx
---
title: 我如何理解反馈
created: "2026-10-10"
updated: "2026-10-10"
---

import ThoughtTimeline from '@components/ThoughtTimeline.astro';

先用正文讲清楚这里的理解。

<ThoughtTimeline />
```

上面的组件名仅为写法示例，使用前需创建对应组件。Markdown 链接和 MDX 中静态 `<a href="…">` 会自动转换；组件属性或 JavaScript 表达式生成的链接使用网页地址。更新时间默认来自文章的 `updated` 字段，表示内容编辑时间。

安装依赖后，在仓库根目录使用以下命令：

| 命令 | 用途 |
| --- | --- |
| `pnpm dev --background` | 在后台启动开发站点 |
| `pnpm astro dev stop` | 停止后台开发站点 |
| `pnpm check` | 同步内容并检查 TypeScript |
| `pnpm test` | 在临时项目中验证发布规则和错误输入 |
| `pnpm build` | 校验链接并构建 Wiki 网站 |
| `pnpm preview` | 预览构建结果 |
