import { defineCollection, defineContentConfig, z } from "@nuxt/content"

export default defineContentConfig({
  collections: {
    tweets: defineCollection({
      type: "data",
      source: "tweets/*.json",
      schema: z.object({
        tweet_id: z.string(),
        text: z.string(),
        sourceUrl: z.string(),
        postedAt: z.string(),
        isNSFW: z.boolean(),
        tags: z.array(z.string()),
        replyCount: z.number(),
        retweetCount: z.number(),
        likeCount: z.number(),
      }),
    }),
    dreams: defineCollection({
      type: "data",
      source: "dreams/*.json",
      schema: z.object({
        title: z.string(),
        type: z.enum(["image", "video"]),
        src: z.string(),
        comment: z.string().optional(),
        publishedAt: z.string(),
        createdBy: z.enum(["Sora2", "Nano Banana"]).optional(),
      }),
    }),
  },
})
