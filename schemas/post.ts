import { z } from "zod";

export const editorSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  content: z.any().optional(),
});

export const tableSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  published: z.boolean(),
  authorId: z.string(),
  _count: z.object({
    views: z.number(),
    likes: z.number(),
  }),
});
