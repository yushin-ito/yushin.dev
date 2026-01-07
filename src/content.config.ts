import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const experiences = defineCollection({
	loader: glob({
		base: "./src/content/experiences",
		pattern: "**/*.{md,mdx}",
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		organization: z.string(),
		start: z.coerce.date(),
		end: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
	}),
});

const posts = defineCollection({
	loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		createdAt: z.coerce.date(),
		updatedAt: z.coerce.date(),
	}),
});

const works = defineCollection({
	loader: glob({ base: "./src/content/works", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		createdAt: z.coerce.date(),
		updatedAt: z.coerce.date(),
	}),
});

export const collections = { experiences, posts, works };
