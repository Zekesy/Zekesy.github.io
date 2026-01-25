import { defineCollection, reference, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Glob loader creates entries from directories of Markdown, MDX, Markdoc, JSON, YAML, or TOML files
//  It accepts a pattern of entry files to match using glob patterns supported by micromatch, 
// and a base file path of where your files are located. Each entry’s id will be automatically generated 
// from its file name. Use this loader when you have one file per entry.

const blog = defineCollection({ 
    loader: glob({ pattern: "**/*.md", base: "./src/content/blogs"}),
    schema: z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        related: z.array(
            z.union([
                reference('blog'),
                reference('article'),
                reference('note'),
            ])
        ).optional(),
    })

});

const articles = defineCollection({
    loader: glob({ pattern : "**/*.md", base: "./src/content/articles"}),
    schema: z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        updateDate: z.coerce.date().optional(),
        related: z.array(
            z.union([
                reference('blog'),
                reference('article'),
            ])
        ).optional(),
    })
});

const notes = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/notes"}),
    schema: z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        updateDate: z.coerce.date().optional(),
        description: z.string().optional(),
        type: z.enum(["tweet", "article", "note"]),
        hashtags: z.array(z.string()).optional(),
        avatar: z.string().optional(),
        photo: z.string().optional(),
        related: z.array(
            z.union([
                reference('blog'),
                reference('article'),
            ])
        ).optional(),
    })
});



export const collections = { blog, notes , articles};