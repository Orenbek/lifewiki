# Wiki Authoring

## Choose The Destination

Use the `personal-wiki-editor` skill for discussion, alignment, composition, and substantive revision. Then choose placement using these rules.

Update the primary page when material belongs to the same topic and scope. Create a page for a distinct question, concept, experience, or source note with a clear navigation position. Brief material may remain brief; it need not become an argument to qualify for capture.

Keep separate pages for distinct domain perspectives. Cross-link them instead of forcing them into one page.

Place a cross-cutting principle in the most stable authoritative page and link domain-specific pages to it. Add a cross-domain index only when multiple existing pages need shared navigation.

## Markdown, MDX, and Components

Use `.md` for ordinary prose. Use `.mdx` when components improve the explanation, such as tabs for alternatives, steps for a procedure, cards for navigation, or a custom visualization. MDX is an allowed authoring format, not an exception requiring approval. Keep the central explanation in readable prose and use components for a clear purpose.

Import built-in content components from `@astrojs/starlight/components`, for example `Aside`, `Tabs`, `TabItem`, `Steps`, `Card`, and `CardGrid`. Check the installed version and the [Starlight component documentation](https://starlight.astro.build/components/using-components/) for supported props and usage. Prefer built-in components when they fit; store custom components in `src/components/` and import them through `@components/`.

```mdx
---
title: "如何阅读这篇文章"
created: "2026-10-10"
updated: "2026-10-10"
---

import { Aside } from '@astrojs/starlight/components';

# 如何阅读这篇文章

先阅读正文中的说明，再按需要查看补充材料。

<Aside type="note" title="阅读提示">
  这里放与当前段落直接相关的补充说明。
</Aside>
```

MDX pages follow the same placement, frontmatter, asset, and index rules as Markdown pages. Keep source-relative `.md` / `.mdx` links in Markdown syntax; URLs supplied through component props or JavaScript expressions must use published website paths. When changing a page extension, repair referring links. Build the site and preview affected pages when introducing or changing components; check that they remain readable on mobile.

## Choose A Template

Before creating or substantially rewriting a page, inspect `wikis/_meta/templates/` for a template that matches its purpose. Use it when available; otherwise follow the general authoring rules.

## Create

- State the page's scope and purpose so it remains understandable without the current task context.
- Distinguish the author's adopted judgment from candidate interpretations and open questions.
- Link sources, original author material, or related pages when they explain consequential claims. Do not invent a source path when the material exists only in the conversation.
- Preserve meaningful context and reasons for changes in understanding.

## Update

- Correct verified factual errors. For changes of belief, preserve the earlier judgment and what changed it when that history matters.
- Identify whether new material supplements, limits, revises, or conflicts with the existing account. Unresolved personal tensions may remain explicit; do not silently harmonize them.

## Merge

Merge overlapping material into the page with the clearest scope. Preserve unique experiences, perspectives, uncertainty, and meaningful chronology. Correct factual discrepancies, but retain unresolved judgments as such. Remove a source page only within an authorized merge and after preserving its unique value and inbound references.

After creating, updating, or merging content, apply `frontmatter.md` and `directory-structure.md` to the affected pages, indexes, and links.
