export type Dream = Readonly<{
  title: string
  type: "image" | "video"
  src: string
  publishedAt: string
  comment?: string
  createdBy?: "Sora2" | "Nano Banana"
}>
