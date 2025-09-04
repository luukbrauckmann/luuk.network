import { defineCollection, z } from 'astro:content';
import { loader as datocmsLoader } from '@datocms/loader';

const pages = defineCollection({ loader: datocmsLoader });

export const collections = { pages };
