import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob, type Loader } from 'astro/loaders';
import { assertUniqueRoutes, isPublishedSource, isReadme, sourceToId } from './paths';
import { readWikiDocument, validateWikiLinks, wikiRoot } from './documents';

function validateWikiGraph(): string[] {
	const sources = readdirSync(wikiRoot, { recursive: true, withFileTypes: true })
		.filter((entry) => entry.isFile())
		.map((entry) => path.relative(wikiRoot, path.join(entry.parentPath, entry.name)).split(path.sep).join('/'))
		.filter(isPublishedSource);
	assertUniqueRoutes(sources);
	for (const source of sources) validateWikiLinks(source, readWikiDocument(path.join(wikiRoot, source)).tree);
	return sources;
}

export function wikiLoader(): Loader {
	const owners = new Map<string, string>();
	const watched = new WeakSet<object>();
	const loader = glob({
		base: './wikis',
		pattern: ['**/*.{md,mdx}', '!**/_*/**', '!**/_*', '!**/.*/**', '!**/.*'],
		generateId({ entry, data }) {
			if (data.slug !== undefined) throw new Error(`Wiki page "${entry}" cannot override its path with slug.`);
			const id = sourceToId(entry);
			const previous = owners.get(id);
			if (previous && previous !== entry && existsSync(path.join(wikiRoot, previous))) {
				throw new Error(`Wiki route collision: "${previous}" and "${entry}" both map to "${id}".`);
			}
			owners.set(id, entry);
			return id;
		},
	});
	return {
		name: 'wiki-loader',
		async load(context) {
			// Graph validation must run even when glob reuses a cached referring page.
			const sources = validateWikiGraph();
			owners.clear();
			for (const source of sources) owners.set(sourceToId(source), source);
			await loader.load({
				...context,
				store: {
					...context.store,
					get<TData extends Record<string, unknown>>(id: string) {
						const entry = context.store.get<TData>(id);
						const source = owners.get(id);
						// An MD → MDX rename can keep both the route ID and the content digest.
						if (entry?.filePath && source && path.resolve(fileURLToPath(context.config.root), entry.filePath) !== path.join(wikiRoot, source)) {
							context.store.delete(id);
							return undefined;
						}
						return entry;
					},
					delete(id) {
						const entry = context.store.get(id);
						const source = owners.get(id);
						// A delayed unlink of the old extension must not delete its replacement.
						if (entry?.filePath && source && path.resolve(fileURLToPath(context.config.root), entry.filePath) === path.join(wikiRoot, source) && existsSync(path.join(wikiRoot, source))) return;
						context.store.delete(id);
					},
				},
				generateDigest: (data) => context.generateDigest({ adapter: 2, data }),
				async parseData(options) {
					const source = path.relative(wikiRoot, options.filePath!).split(path.sep).join('/');
					const { tree, firstTitle, leadingTitle } = readWikiDocument(options.filePath!);
					validateWikiLinks(source, tree);
					const title = options.data.title ?? (isReadme(source) ? firstTitle : undefined);
					return context.parseData({
						...options,
						data: {
							...options.data,
							title,
							wikiSource: source,
							bodyHasTitle: leadingTitle !== undefined && leadingTitle === title,
							lastUpdated: options.data.lastUpdated ?? (typeof options.data.updated === 'string' ? new Date(options.data.updated) : options.data.updated),
						},
					});
				},
			});
			if (context.watcher && !watched.has(context.watcher)) {
				watched.add(context.watcher);
				let pending: ReturnType<typeof setTimeout> | undefined;
				const validateChange = (filePath: string) => {
					const source = path.relative(wikiRoot, filePath).split(path.sep).join('/');
					if (source.startsWith('../') || !isPublishedSource(source)) return;
					// Coalesce rename events; unchanged referring pages still need validation.
					clearTimeout(pending);
					pending = setTimeout(() => {
						try {
							validateWikiGraph();
						} catch (error) {
							context.logger.error(`Wiki graph validation failed: ${error instanceof Error ? error.message : String(error)}`);
						}
					}, 75);
				};
				context.watcher.on('add', validateChange);
				context.watcher.on('change', validateChange);
				context.watcher.on('unlink', validateChange);
			}
		},
	};
}
