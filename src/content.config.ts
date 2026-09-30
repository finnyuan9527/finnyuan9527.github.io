import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    category: z.enum(['ai-app', 'ai-platform', 'enterprise']),
    tagline: z.string(),
    role: z.string(),
    stage: z.string(),
    period: z.string(),
    highlight: z.string(),
    scope: z.string(),
    evidence: z.string(),
    tags: z.array(z.string()).default([]),
    relatedNotes: z.array(z.string()).default([]),
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
    updated: z.coerce.date().optional(),
    relatedProjects: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, notes };
