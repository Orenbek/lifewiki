import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { MdastPluginEntry, HastPluginEntry, MdastVisitorContext, MdxJsxFlowElement, MdxJsxTextElement } from 'satteri';
import { publishedHref, visitTree, wikiRoot } from './documents';
import { isPublishedSource } from './paths';

function sourcePath(fileURL: URL | undefined): string | undefined {
	if (!fileURL) return;
	const source = path.relative(wikiRoot, fileURLToPath(fileURL)).split(path.sep).join('/');
	if (source.startsWith('../') || !isPublishedSource(source)) return;
	return source;
}

export function wikiMarkdownLinks(base = '/'): MdastPluginEntry {
	return ({ fileURL }) => {
		const source = sourcePath(fileURL);
		if (!source) return;
		const privateReferences = new Set<string>();
		return {
			name: 'wiki-source-links',
			before(root) {
				visitTree(root, (node) => {
					if (node.type === 'definition' && publishedHref(source, node.url, wikiRoot, base) === undefined) {
						privateReferences.add(node.identifier.toUpperCase());
					}
				});
			},
			link(node, context) {
				const href = publishedHref(source, node.url, wikiRoot, base);
				if (href === undefined) context.replaceNode(node, [...node.children]);
				else context.setProperty(node, 'url', href);
			},
			definition(node, context) {
				const href = publishedHref(source, node.url, wikiRoot, base);
				if (href === undefined) context.removeNode(node);
				else context.setProperty(node, 'url', href);
			},
			linkReference(node, context) {
				if (privateReferences.has(node.identifier.toUpperCase())) context.replaceNode(node, [...node.children]);
			},
			mdxJsxFlowElement: rewriteAnchor,
			mdxJsxTextElement: rewriteAnchor,
		};

		function rewriteAnchor(node: Readonly<MdxJsxFlowElement | MdxJsxTextElement>, context: MdastVisitorContext) {
			if (node.name !== 'a') return;
			const attr = node.attributes.find((attr) => attr.type === 'mdxJsxAttribute' && attr.name === 'href');
			if (!attr || attr.type !== 'mdxJsxAttribute' || typeof attr.value !== 'string') return;
			const href = publishedHref(source!, attr.value, wikiRoot, base);
			if (href === undefined) context.replaceNode(node, [...node.children]);
			else context.replaceNode(node, { ...node, attributes: node.attributes.map((attribute) => attribute === attr ? { ...attr, value: href } : attribute) });
		}
	};
}

export function wikiHtmlLinks(base = '/'): HastPluginEntry {
	return ({ fileURL }) => {
		const source = sourcePath(fileURL);
		if (!source) return;
		return {
			name: 'wiki-html-links',
			element: {
				filter: ['a'],
				visit(node, context) {
					if (typeof node.properties?.href !== 'string') return;
					const href = publishedHref(source, node.properties.href, wikiRoot, base);
					if (href === undefined) context.replaceNode(node, [...node.children]);
					else context.setProperty(node, 'href', href);
				},
			},
		};
	};
}
