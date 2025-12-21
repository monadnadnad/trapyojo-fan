export type Tweet = Readonly<{
  tweet_id: string
  text: string
  sourceUrl: string
  postedAt: string
  isNSFW: boolean
  tags: string[]
  replyCount: number
  retweetCount: number
  likeCount: number
}>
