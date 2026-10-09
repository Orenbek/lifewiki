# Wiki Retrieval

## Boundary

Keep retrieval read-only unless the user also asks for documentation changes. A missing result is not authorization to create a page.

## Find Relevant Pages

1. Read the root and likely domain indexes and inspect the relevant `wikis/` directories. Treat indexes as navigation, not proof that they are complete or current.
2. Use the runtime's native file-listing or glob support to find Markdown files within the candidate domains. Generate a scoped directory tree when it helps clarify their structure; use paths and index context to select candidate pages.
3. Expand the query with language variants, aliases, abbreviations, and repository identifiers. Use frontmatter tags when present.
4. Search paths, filenames, frontmatter, headings, and body text in the likely domains.
5. Read the strongest matches and only the indexes or linked pages needed to establish context.
6. Expand to other domains or all of `wikis/` only when the narrowed search is insufficient.

If `wikis/` or an expected index is missing, report the available search scope. For broad discovery, use the read-only [wikis-locator](../../../agents/wikis-locator.md) agent to find candidate pages. Read substantive pages before interpreting them.

## Interpret Results

Distinguish sourced knowledge, personal observation, adopted judgment, tentative explanation, unresolved questions, and earlier views. Index placement, frontmatter, and `updated` are discovery signals, not proof that the author still holds a view.

When answering what the author currently thinks, compare relevant passages and their stated context. Report ambiguity rather than assuming the newest edited page supersedes everything else. Compare repository behavior with code only when that is actually the subject.

## Report

Answer the user's question rather than only describing the search process. For discovery requests, rank results and provide repository-relative paths, relevant sections, and concise relevance notes.

If the Wiki only partially answers the question or has no useful match, state what remains unsupported and list the domains and terms searched. Do not infer that an undocumented capability does not exist.
