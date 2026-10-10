import { getCollection } from 'astro:content';
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { buildSidebar } from './navigation';

export const onRequest = defineRouteMiddleware(async ({ locals, url }, next) => {
	const pages = await getCollection('docs', ({ data }) => import.meta.env.MODE !== 'production' || !data.draft);
	const route = locals.starlightRoute;
	route.sidebar = buildSidebar(pages, url.pathname, import.meta.env.BASE_URL);
	route.hasSidebar = route.entry.data.template !== 'splash' && route.sidebar.length > 0;
	route.pagination = { prev: undefined, next: undefined };
	await next();
});
