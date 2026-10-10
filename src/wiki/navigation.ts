import path from 'node:path';
import type { CollectionEntry } from 'astro:content';
import type { StarlightRouteData } from '@astrojs/starlight/route-data';
import { isReadme, routeHref } from './paths';

type Page = CollectionEntry<'docs'>;
type SidebarEntry = StarlightRouteData['sidebar'][number];
type SidebarLink = Extract<SidebarEntry, { type: 'link' }>;
type Directory = { name: string; overview?: Page; pages: Page[]; directories: Map<string, Directory> };

export function buildSidebar(pages: Page[], pathname: string, base = '/'): SidebarEntry[] {
	const root: Directory = { name: '', pages: [], directories: new Map() };
	for (const page of pages) {
		const source = page.data.wikiSource;
		if (!source) continue;
		let directory = root;
		const parent = path.posix.dirname(source);
		for (const segment of parent === '.' ? [] : parent.split('/')) {
			if (!directory.directories.has(segment)) {
				directory.directories.set(segment, { name: segment, pages: [], directories: new Map() });
			}
			directory = directory.directories.get(segment)!;
		}
		if (isReadme(source)) directory.overview = page;
		else directory.pages.push(page);
	}

	function link(page: Page): SidebarLink {
		const href = routeHref(page.id, base);
		const config = page.data.sidebar;
		const badge = config.badge;
		return {
			type: 'link',
			label: config.label ?? page.data.title,
			href,
			isCurrent: decodeURI(pathname).replace(/\/$/, '') === decodeURI(href).replace(/\/$/, ''),
			attrs: config.attrs,
			badge: typeof badge === 'string' ? { text: badge, variant: 'default' } : badge ? {
				...badge,
				text: typeof badge.text === 'string' ? badge.text : badge.text['zh-CN'] ?? Object.values(badge.text)[0] ?? '',
			} : undefined,
		};
	}

	function entries(directory: Directory): SidebarEntry[] {
		const items: { order: number; source: string; entry: SidebarEntry }[] = [];
		for (const page of directory.pages) {
			if (!page.data.sidebar.hidden) items.push({ order: page.data.sidebar.order ?? Infinity, source: page.data.wikiSource, entry: link(page) });
		}
		for (const child of directory.directories.values()) {
			const children = entries(child);
			if (!children.length) continue;
			items.push({
				order: child.overview?.data.sidebar.order ?? Infinity,
				source: child.name,
				entry: {
					type: 'group',
					label: child.overview?.data.sidebar.label ?? child.overview?.data.title ?? child.name,
					entries: children,
					collapsed: false,
					badge: undefined,
				},
			});
		}
		items.sort((a, b) => a.order - b.order || a.source.localeCompare(b.source, 'zh-CN', { numeric: true }));
		const overview = directory.overview;
		return [
			...(overview && !overview.data.sidebar.hidden ? [link(overview)] : []),
			...items.map(({ entry }) => entry),
		];
	}
	return entries(root);
}
