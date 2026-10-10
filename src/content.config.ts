import { defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';
import { z } from 'astro/zod';
import { wikiLoader } from './wiki/loader';

export const collections = {
	docs: defineCollection({
		loader: wikiLoader(),
		schema: docsSchema({
			extend: z.object({
				created: z.iso.date().optional(),
				updated: z.iso.date().optional(),
				tags: z.array(z.string()).optional(),
				wikiSource: z.string(),
				bodyHasTitle: z.boolean(),
			}),
		}),
	}),
};
