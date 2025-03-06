import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  loader: () => {
    return [];
  },
  schema: z.custom(),
});

export const collections = { blog };
