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

仓库包含 Astro 与 Starlight 初始站点。`src/content/docs/` 当前仍是示例内容，尚未发布或同步 `wikis/`。知识维护只写 `wikis/`，站点接入是后续独立工作。

安装依赖后，在仓库根目录使用以下命令：

| 命令 | 用途 |
| --- | --- |
| `pnpm dev` | 启动开发站点 |
| `pnpm build` | 构建现有站点 |
| `pnpm preview` | 预览构建结果 |
