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
  },
})
