type LikesResponse = {
  dreamId: string
  count: number
}

export const useLikes = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  const getLikes = (dreamId: string) => {
    return useFetch<LikesResponse>("/likes", {
      baseURL,
      query: { dreamId },
    })
  }

  const postLikes = (dreamId: string) => {
    return $fetch<LikesResponse>("/likes", {
      baseURL,
      method: "POST",
      body: { dreamId },
    })
  }

  return {
    getLikes,
    postLikes,
  }
}
