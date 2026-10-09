## 人生 Wiki

本仓库沉淀作者的想法、观点、经历和知识，默认读者是未来的自己。知识源目录是 `wikis/`，入口是 [人生 Wiki](wikis/README.md)。`src/content/docs/` 当前是 Starlight 示例站点，本轮未接入知识源。不要在那里维护第二份 Wiki 正文。

- 涉及 Wiki 检索、归位、索引、链接或维护，先读 [wiki-documentation](skills/wiki-documentation/SKILL.md) 和 [Wiki 宪法](wikis/_meta/constitution.md)。
- 涉及记录想法、讨论观点、撰写或修改页面、综合主题，另读 [personal-wiki-editor](skills/personal-wiki-editor/SKILL.md)。默认先讨论并对齐，再写入。已有明确指令和已认可内容无需重复确认。
- 讨论中的假设、Agent 建议和作者已采纳的判断必须区分。排版、措辞、链接等常规维护可在授权范围内自主完成；新的核心立场或范围变化须回到讨论。
- 广泛检索时使用 [wikis-locator](agents/wikis-locator.md) Agent。
- Skill 正文、参考指南与 description 使用英文；模板和 Wiki 内容使用中文。
- Skill 之间使用名称引用，例如 `personal-wiki-editor` skill，不使用指向其他 skill 的文件路径链接；同一 skill 内的参考文件保留相对链接。

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
