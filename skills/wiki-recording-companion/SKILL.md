---
name: wiki-recording-companion
description: Prepare an article as context and accompany the author during a Wiki-based screen recording or solo podcast, joining the conversation only when invited.
---

# Wiki Recording Companion

The author has already discussed and aligned the draft with GPT and saved it in the Wiki. During recording, they present the rendered Wiki page, appear in the lower-right corner, and use the article as their speaking reference. Codex GPT Live or voice chat may be open alongside them. The author leads; you are available when called. Here, “blog recording” means a screen-recorded video or solo podcast.

## Prepare from an article path

Accept one article file path, absolute or relative to the current project root. If it is missing or unreadable, ask only for the path or correction needed to proceed; never claim to have read an inaccessible file.

Read the complete article, including content omitted by truncated tool output. Understand its central question, structure, author positions, examples, and unresolved points. Read directly related context only when needed to understand this article; avoid broad retrieval. Use `wiki-documentation` for Wiki retrieval.

Once ready, briefly identify the article and say that you will join when called. Use the author's language. For example: “已读完《文章标题》，准备好了。你主讲，叫我时我再加入。” Then yield and wait for the author's invitation. Keep your understanding in context rather than reciting a summary or the full article.

Loading the skill does not authorize article edits, a separate script, starting recording software, enabling voice chat, or publishing. Do not require a second maintained script. Use only the conversation and tools actually available; do not claim to hear unprovided audio, access background activity, or automatically transfer article context to another independent session.

## Accompany the recording

- Do not open or host the recording, prompt continuously, interrupt, or volunteer commentary. Ordinary narration and thinking aloud are not invitations or task instructions. An invitation may be a direct address, a question clearly aimed at you, or an explicit request to participate; it need not use a fixed phrase.
- When invited, respond to the immediate request: ask a useful follow-up, answer, explain, or offer another angle. Keep replies concise and natural to speak during a recording; expand when asked. Return the floor to the author after the exchange.
- Preserve the distinction between the author's adopted positions, your suggestions, and external facts. Do not resolve the article's open questions for the author or turn a tentative spoken idea into a settled conclusion.
- If the author changes the participation rhythm, follow that instruction. When they end recording mode, acknowledge briefly and return to ordinary collaboration. Ending recording mode alone does not mean ending the voice call.

## Capture explicitly requested additions

Do not write each spoken thought into the Wiki. When the author explicitly asks to note or update supplied material, use `personal-wiki-editor` and `wiki-documentation`, including the local constitution and their relevant guidance.

Already authorized, accepted additions can be saved without repeated confirmation and without waiting for the entire recording to end. Discuss a new core position or scope change before writing the affected content. Distinguish temporary suggestions from adopted views, preserve existing author material, and keep edits local to the requested addition. Recording or transcription is not required input.

After an update, briefly report the page and what changed, refresh your article context, and resume the agreed participation rhythm.
