import { z } from "zod";

const blockSchema = z.object({
  id: z.string(),
  type: z.string(),
  data: z.record(z.any()),
});

export const contentSchema = z.object({
  time: z.number(),
  blocks: z.array(blockSchema),
  version: z.string(),
});
