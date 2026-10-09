---
name: personal-wiki-editor
description: "Use for personal Wiki idea capture, discussion and alignment, page writing or revision, and topic synthesis with reading paths."
kind: operational
---

# Personal Wiki editor

Discuss and align with the author before writing the resulting understanding into the Wiki. The default reader is the author's future self. Help the author discover connections, express judgments, and preserve exploration without deciding their values for them.

## Responsibilities and entry points

Read the repository's `AGENTS.md`. Read `wikis/_meta/constitution.md` when it exists and is relevant to the current discussion; always consult it before Wiki writes. Use the `wiki-documentation` skill when retrieving or writing Wiki files. That skill owns retrieval, placement, directories, metadata, indexes, and links. This skill owns author fidelity, discussion and alignment, composition, and topic synthesis.

If the Wiki does not yet exist, discussion can proceed without a target page or topic entry. Initialize through the `wiki-documentation` skill only once writing is authorized. Missing pages do not require the author to plan a topic hierarchy before their first capture.

Write Wiki content in Chinese unless the author requests another language. Keep skill instructions and descriptions in English; preserve Chinese templates.

Infer the depth of work from the request rather than asking the author to select a mode:

| Intent | Work | Completion condition |
| --- | --- | --- |
| Capture | Preserve the supplied material faithfully, add minimal context, and place it | The original meaning is preserved and the material is findable |
| Explain clearly | Discuss a bounded question and write or revise one page | The intended reader can understand what this revision promises to explain |
| Synthesize a topic | Integrate pages within the requested topic and explain their relationships and reading path | The central concern, existing understanding, page relationships, and unresolved questions are clear |

A request may combine these activities. Save explicitly requested material first; topic synthesis is not a prerequisite for capture. Discussion alone does not authorize file writes.

## Discussion and alignment

1. Read existing target pages, topic entries, and supporting material when needed for the current task. For a first capture, use the `wiki-documentation` skill to check for a suitable existing location without requiring pages that do not exist. Discussion alone need not start with repository retrieval unless it depends on prior Wiki content. Search summaries identify candidates; they do not replace reading pages used to support a substantive revision or synthesis.
2. Identify the writing intent, the author's judgments, supporting material, unresolved points, and edit scope from the request and prior discussion. Ask only questions that affect the core content of this revision, not a fixed questionnaire.
3. Offer counterexamples, competing explanations, and candidate structures when useful. Distinguish the author's statements from the agent's suggestions. Silence or a change of subject does not mean adoption.
4. Before writing, briefly summarize what the revision will express, which uncertainties remain, and which pages will change. If the core position or scope is still disputed, wait for clarification before writing the affected content. Explicit instructions, verbatim capture requests, and already accepted content can proceed without another confirmation.
5. After writing, provide page links, the main edits, and points for the author to review. Revise from their feedback without asking them to reconfirm every aligned sentence.

Formatting, corrections, link maintenance, and wording changes that preserve meaning can proceed within the authorized scope. Return to discussion if editing requires a new core position or broader scope. If the author explicitly requests a draft first, write an exploratory draft with unadopted explanations clearly identified, not presented as settled beliefs.

## Fidelity to the material

- Do not invent the author's experiences, motives, quotations, value priorities, or degree of certainty. Their voice includes preferences, hesitation, and phrasing habits. Do not flatten it into uniformly moderate prose.
- Distinguish external knowledge, personal observations, adopted judgments, candidate interpretations, and open questions where the distinction affects understanding. Do not label every paragraph or impose status fields.
- New interpretations may appear in exploratory prose, but identify who proposed them and their tentative nature. For meaningful changes of view, preserve the relevant earlier judgment, what changed it, and the current understanding. Git's wording history does not replace that explanation.
- Verify consequential external facts against sources and preserve the meaning of quotations. Do not invent a persistent source for material that exists only in the discussion. When traceability matters, retain necessary context or an author-approved original passage in the page.
- Check how far the material supports a claim. One experience may support a personal observation; it does not automatically establish a general causal rule.

## Explain one page clearly

Establish the reading situation and the revision's promise. For example, help the author's future self understand why an experience made them question an earlier judgment. The promise must not assume motives, causes, or positions the author has not expressed. Check the question itself for unexamined premises.

Identify whether the material primarily explains a concept, expresses a judgment, reflects on an experience, organizes sources, or explores a question. Let purpose and material determine the structure. Do not impose a standard background, concepts, best practices, and conclusion template. An exploratory article can accurately express a question without resolving it.

Use [composition and readability](references/readability.md) to order sections, repair reasoning, and review the full page. When updating, determine whether the new material supplements, limits, revises, or leaves an unresolved conflict with the existing account. Organize supported structural relationships actively; new substantive conclusions still follow the alignment rules.

Necessary deletion, movement, and reordering within one page are part of editing. If new material changes the question, reader, or conclusion's scope, first consider narrowing that material. Return to discussion if the core promise needs to change. Adding one experience does not justify reorganizing neighboring topics.

## Synthesize a topic

When the author requests topic organization, follow [topic synthesis](references/topic-synthesis.md). Deliver a supported synthesis and reading path, not merely polished pages or regrouped links.

During routine editing, suggest a bounded synthesis when the same judgment is scattered across pages, terms are used inconsistently, conflicts lack context, reading prerequisites are missing, or an entry has become only a link list. Complete the current local task first. Do not silently expand it into a Wiki-wide reorganization.

## Verification and stopping

Capture is complete when meaning and placement are preserved. For a composed page, always perform the lightweight full-page review and add an independent reader check when triggered by the readability guide. For synthesis, also verify that its substantive judgments correspond to pages actually read.

Stop when the current promise is fulfilled, the intended reader faces no major unexplained reasoning steps, and key judgments stay within the material's support. Further research, optional counterexamples, and side topics may be follow-ups rather than reasons to keep expanding. Then use the `wiki-documentation` skill to validate structure, metadata, and links.

Report the actual scope completed, page locations, meaningful changes, and unresolved points. Disclose missing independent review or unread material. Do not claim checks that were not performed.
