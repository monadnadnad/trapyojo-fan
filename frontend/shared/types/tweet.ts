export type Tweet = Readonly<{
  status: number
  text: string
  sourceUrl: string
  postedAt: string
  isNSFW: boolean
  tags: string[]
}>
