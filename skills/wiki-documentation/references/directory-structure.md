# Wiki Directory Structure

## Core Layout

```text
wikis/
├── README.md
├── _meta/
│   └── constitution.md
└── <domain>/
    ├── README.md
    └── <subdomain>/
        └── <page>.md
```

Use `wikis/README.md` as the global index and link every existing top-level domain from it. Add a domain only when it has real content.

Reserve `_meta/` for Wiki-wide governance and infrastructure. It is not a knowledge domain and does not contain substantive pages. Store repository-defined authoring templates in `_meta/templates/` when they exist.

Give every top-level domain a README that states its scope and links its content. Except for `_meta/`, keep top-level domain roots limited to `README.md` and place substantive pages in subdirectories.

## Placement

Choose top-level domains by stable knowledge area, not by contributor, temporary task, branch, time period, or document status. Reuse an existing domain unless the topic has a distinct, durable boundary.

Evaluate a proposed domain by its knowledge cohesion, readers, and whether its pages would evolve together. A first real record may establish a minimal domain with one substantive page and an index that explains its scope. No minimum page count applies. Reuse an existing domain when it fits; do not create empty domains or invent additional material to justify placement.

Group subdomains by stable questions or knowledge areas that actually occur in the author's material. Keep closely coupled content together; connect distinct perspectives with explanatory links. Do not pre-create a comprehensive taxonomy of life.

Apply stable semantic boundaries at every depth. Do not organize subdirectories by contributor, temporary branch, or one-off task.

Before designing or reorganizing several domains, inventory the durable knowledge that actually exists and map it to current boundaries. Allow the domain set to evolve as the repository grows, but do not create empty indexes, placeholder directories, or speculative trees.

Within a subdomain, use the shallowest clear path. Create deeper directories only when grouping related pages improves navigation.

Limit topic directories to four levels below `wikis/`; neither `wikis/` itself nor the Markdown filename counts. For example, `wikis/<domain>/<subdomain>/<topic>/<subtopic>/<page>.md` reaches the limit. If a proposed directory would exceed it, broaden or regroup the existing boundaries instead.

Add a directory when existing material forms a distinct, nameable subtopic and grouping it improves navigation. File count or article length alone is not a reason. Each topic directory should have a README explaining its scope, direct children, and useful reading order. Flatten a directory that only wraps another directory without adding a meaningful boundary or navigation value.

Split a page when a section addresses an independently useful question, serves a different reader, or needs separate maintenance, and can stand alone with minimal context. Keep sections together when they jointly develop one argument. Merge pages that cover the same scope and repeatedly explain the same premises, preserving distinct perspectives and meaningful history.

Make every substantive page discoverable from the nearest useful README.

## Static Assets

Store page-owned images and other static attachments in an `assets/` directory beside the Markdown file. Reference images with source-relative Markdown paths, for example `![Meaningful image description](./assets/example.png)`. Use descriptive lowercase kebab-case filenames.

```text
topic/
├── README.md
├── local-images.md
└── assets/
    └── toc-button.png
```

When several pages share a directory, use `assets/<page-stem>/` if needed to distinguish their attachments. Reuse genuinely shared assets from the nearest common topic's `assets/` directory through relative paths. Do not duplicate page assets into `public/`; reserve website-level resources for the presentation layer.

Keep assets with their owning content when moving pages, and update all affected references. Asset directories contain attachments, not Wiki pages, so they do not need README indexes or count toward the four-level topic-directory limit. Check that local files exist and that image paths render correctly in the website; non-image attachments may require separate publication support and must be verified before promising a download link.

## Naming

- Use `README.md` for directory indexes.
- Name domains with concise nouns or stable domain phrases.
- Use lowercase kebab-case for domain directories, subdirectories, and page filenames other than README.md.
- Use descriptive topic names instead of generic names such as `notes.md`, `misc.md`, or `new.md`.
- Use date, sequence, or version markers only when chronological, ordered, or multi-version reading is inherent to the content. Use consistent forms such as `YYYY-MM-DD-<description>.md`, `01-<description>.md`, or `<name>-v<major>.md`.

Keep small version differences in one page. Create separate version paths only when versions need independent navigation or maintenance.

### Numbered series

Use numeric prefixes when pages form a stable sequence that readers are expected to follow, such as a course, a multi-step tutorial, or chapters of a longer work. Prefer stable semantic filenames for independent concepts, opinions, experiences, and evolving knowledge; put optional reading orders in the README.

- Within one series directory, use a consistent zero-padded width, such as `01-introduction.md` and `02-core-concepts.md`. Two digits are a default for small series; use a wider consistent width when the actual series requires it.
- Numbers express position within that series, not importance, creation date, or a Wiki-wide identifier. Keep a descriptive kebab-case name after the prefix. Leave the index named `README.md`.
- A README for a numbered series should list the existing chapters in sequence and explain how they fit together. Do not create placeholder chapters to fill numbering gaps.
- Do not number unrelated pages just to make a directory look orderly. Do not rename established semantic paths merely because a new recommended reading path has been added.

When adding a chapter, decide whether it belongs in the stable sequence or can remain a separately linked supplement. If insertion or reordering requires renumbering, keep it within the agreed editing scope. Map old paths to new paths, repair inbound links and plain-path references, and update affected indexes and any navigation configuration that uses those paths. Follow [maintenance](maintenance.md) and validate the changed references before finishing. Do not automatically renumber neighboring series.

## README Indexes

Reserve README.md for directory indexes, not standalone articles or example pages. Put substantive content in a named .md or .mdx file with frontmatter and link it from the index. Write README indexes as plain Markdown without frontmatter. State the scope, link only existing content, and explain each link's contribution. A topic README may include a concise synthesis and optional reading path using the `personal-wiki-editor` skill for topic synthesis. Keep substantial arguments in their primary pages. Omit empty sections. Link the constitution from `wikis/README.md`.

Give indexes a normal Markdown H1 with a Chinese display title. Do not introduce special heading delimiters.

Update the affected index when a page is created, moved, renamed, or removed. Use relative Markdown links and link directories through their `README.md`.
