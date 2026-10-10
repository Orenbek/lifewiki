# 人生 Wiki

沉淀作者的想法、观点、经历与知识，默认写给未来的自己。[`wikis/`](wikis/README.md) 是唯一知识源，`src/` 负责 Astro/Starlight 展示。

- Wiki 维护使用 `wiki-documentation` skill，遵守 [Wiki 宪法](wikis/_meta/constitution.md)；内容编辑另用 `personal-wiki-editor` skill；广泛检索使用 `wikis-locator` Agent。
- 先讨论对齐，再写入；明确指令、已认可内容及常规维护无需重复确认。区分假设、Agent 建议和作者观点，新的核心立场或范围变化须先讨论。
- Skill 正文、指南及 description 用英文；模板和 Wiki 用中文。Skill 之间以名称引用，不写文件路径链接。
- 正文默认 `.md`，需要组件时用 `.mdx`，通过 `@components/` 导入。页面保留相对 `.md` / `.mdx` 链接，目录入口为 `README.md`，网站负责路由转换。
- 下划线目录（如 `_meta/`）不发布；指向这些目录或 Wiki 外部文件的链接在网站显示为普通文字。

## 开发

- 开发服务器使用 `astro dev --background`；通过 `astro dev stop|status|logs` 管理。
- 按需查阅 [Astro 官方文档](https://docs.astro.build)。
