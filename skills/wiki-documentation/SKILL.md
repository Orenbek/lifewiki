---
name: "wiki-documentation"
description: "Use for retrieval, page placement, initialization, metadata, indexes, links, and structural maintenance of lifewiki under wikis/."
kind: operational
---

# Wiki Documentation

Use this skill for the storage and maintenance of the personal Wiki under `wikis/`. Treat `wikis/_meta/constitution.md` as its stable constitution. For discussing ideas, writing prose, revising arguments, or synthesizing a topic, also use the `personal-wiki-editor` skill. That skill owns alignment, author fidelity, narrative structure, and readability. This skill owns placement, metadata, indexes, and links.

## Resolve Authority

Apply instructions in this order:

1. The user's request and repository-level instructions.
2. The governing principles in `wikis/_meta/constitution.md`.
3. The generic protocol in this skill and its references.

Call out a conflict instead of silently overriding a higher-priority rule.

## Load References

Read each reference completely when its subject is relevant:

- [governance.md](references/governance.md) — decide what belongs in the Wiki, where generic rules live, and how to avoid speculative governance.
- [directory-structure.md](references/directory-structure.md) — place pages, name paths, structure domains, and maintain README indexes.
- [frontmatter.md](references/frontmatter.md) — apply and maintain the frontmatter contract.
- [authoring.md](references/authoring.md) — create, update, merge, and cross-link Wiki content.
- [retrieval.md](references/retrieval.md) — locate and read Wiki knowledge without modifying files.
- [maintenance.md](references/maintenance.md) — audit, move, remove, deduplicate, and repair Wiki content.

## Work

1. Classify the task as retrieval, authoring, initialization, or maintenance.
2. Read repository instructions and inspect the relevant `wikis/` index pages and directory structure before choosing a path. Use the runtime's native file-listing or glob support; generate a scoped directory tree when it helps clarify the structure.
3. Read the relevant references and the local constitution when it exists.
4. Search before writing. Prefer updating an existing authoritative page over creating a competing page.
   Before substantive writes, follow the editor's discussion and alignment rules. An explicit request to record supplied text already authorizes faithful capture. Pure retrieval stays read-only.
5. Keep changes within the requested domain and the indexes or links directly affected by the change.
6. Validate applicable frontmatter, paths, README entries, and relative links before finishing.

## Initialize From Templates

When a task requires writing Wiki content and `wikis/` does not exist, initialize it automatically from:

- `templates/wikis/README.md`
- `templates/wikis/_meta/constitution.md`

Replace the placeholders in `README.md`, list only domains that actually exist, and use the constitution template as the default governing document. Keep business domains and page inventories in indexes rather than adding them to the constitution. Never overwrite an existing Wiki with the templates.

Do not initialize `wikis/` for retrieval-only tasks.

## Guardrails

- Write Wiki pages in Chinese unless the author requests another language. Keep skill instructions and descriptions in English, and preserve Chinese templates.
- Keep pure retrieval read-only.
- Preserve user-authored changes and avoid unrelated Wiki cleanup.
- Trace external factual claims to their sources and personal judgments to the author's material. Repository code is not the source of truth for personal experience or belief.
- Keep the local constitution focused on stable Wiki purpose, knowledge boundaries, structural principles, and governance boundaries.
- Add structure and process only when the current Wiki needs them.

## Report

For retrieval, return precise Wiki paths, relevance notes, and the search terms used when nothing matches. For modifications, summarize the pages and indexes changed, the placement rationale, and any unresolved factual question.
