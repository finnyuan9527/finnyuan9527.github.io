import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['ai-app', 'ai-platform', 'enterprise', 'dev-efficiency']),
    tagline: z.string(),
    role: z.string(),
    problem: z.string(),
    approach: z.string(),
    outcome: z.string(),
    retrospective: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, notes };
