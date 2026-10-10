// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { satteri } from '@astrojs/markdown-satteri';
import { wikiMarkdownLinks, wikiHtmlLinks } from './src/wiki/markdown';

// https://astro.build/config
export default defineConfig({
	trailingSlash: 'always',
	markdown: {
		processor: satteri({
			mdastPlugins: [wikiMarkdownLinks()],
			hastPlugins: [wikiHtmlLinks()],
		}),
	},
	integrations: [
		starlight({
			title: '人生 Wiki',
			description: '沉淀想法、观点、经历与知识，逐步形成连贯的个人知识体系。',
			locales: { root: { label: '中文', lang: 'zh-CN' } },
			sidebar: [],
			pagination: false,
			lastUpdated: false,
			customCss: ['./src/styles/site.css'],
			markdown: { processedDirs: ['wikis'] },
			routeMiddleware: './src/wiki/route-middleware.ts',
			components: {
				PageTitle: './src/components/WikiPageTitle.astro',
				TableOfContents: './src/components/CollapsibleTableOfContents.astro',
				TwoColumnContent: './src/components/WikiTwoColumnContent.astro',
			},
		}),
	],
});
