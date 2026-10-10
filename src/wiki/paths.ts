import path from 'node:path';

export function isPublishedSource(source: string): boolean {
	return /\.(md|mdx)$/.test(source) && !source.split('/').some((part) => /^[_.]/.test(part));
}

export function isReadme(source: string): boolean {
	return /^README\.(md|mdx)$/.test(path.posix.basename(source));
}

export function sourceToId(source: string): string {
	const id = source.replace(/\.(md|mdx)$/, '').replace(/(^|\/)(README|index)$/, '');
	return id || 'index';
}

export function routeHref(id: string, base = '/'): string {
	const route = id === 'index' ? '' : id.split('/').map(encodeURIComponent).join('/');
	return `${base.replace(/\/$/, '')}/${route}${route ? '/' : ''}`;
}

export type WikiLink =
	| { kind: 'unchanged' }
	| { kind: 'private' }
	| { kind: 'page'; source: string; suffix: string };

export function resolveWikiLink(from: string, href: string): WikiLink {
	if (!href || /^(?:[a-z][a-z\d+.-]*:|\/|#|\?)/i.test(href)) return { kind: 'unchanged' };
	const match = href.match(/^([^?#]*)(.*)$/)!;
	const target = path.posix.normalize(path.posix.join(path.posix.dirname(from), decodeURIComponent(match[1]!)));
	if (target === '..' || target.startsWith('../') || target.split('/').some((part) => /^[_.]/.test(part))) {
		return { kind: 'private' };
	}
	if (!/\.(md|mdx)$/.test(target)) return { kind: 'unchanged' };
	return { kind: 'page', source: target, suffix: match[2]! };
}

export function assertUniqueRoutes(sources: string[]): void {
	const owners = new Map<string, string>();
	for (const source of sources) {
		const id = sourceToId(source);
		const previous = owners.get(id);
		if (previous) throw new Error(`Wiki route collision: "${previous}" and "${source}" both map to "${id}".`);
		owners.set(id, source);
	}
}
