export type Dream = Readonly<{
  dreamId: string
  title: string
  type: "image" | "video"
  src: string
  publishedAt: string
  comment?: string
  createdBy?: "Sora2" | "Nano Banana"
}>
