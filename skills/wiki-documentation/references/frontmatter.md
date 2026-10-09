# Wiki Frontmatter

## Contract

Apply frontmatter to substantive Wiki pages. Require `title`, `created`, and `updated`; add `tags` only when useful for retrieval. Write README indexes and Wiki infrastructure under `_meta/` as plain Markdown.

```yaml
---
title: "Document Title"
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
tags:
  - topic-keyword
---
```

## Fields

### `title`

Use a concise Chinese title aligned with the first H1.

### `created`

Record the page creation date in `YYYY-MM-DD` format and keep it unchanged.

### `updated`

Record the date of the latest meaningful content change in `YYYY-MM-DD` format.

### `tags`

Optional. Add topic labels, keywords, and common aliases that improve retrieval.

Prefer lowercase kebab-case for normalized concepts. Choose terms that narrow retrieval and omit administrative labels, dates, and generic filler.

## Editing Rules

- Revise tags when terminology or scope changes.
- Keep YAML valid and store dates as quoted strings. When present, write `tags` as a list, including when there is only one tag, and quote values containing YAML-significant characters.
