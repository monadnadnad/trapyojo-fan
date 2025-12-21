type TweetFilters = {
  readonly safeMode?: boolean
}

export const useTweets = () => {
  const baseQuery = (filters: TweetFilters = {}) => {
    let query = queryCollection("tweets")
    if (filters.safeMode) {
      query = query.where("isNSFW", "=", false)
    }
    return query
  }

  const getAll = async (filters: TweetFilters = {}) => {
    return baseQuery(filters).order("postedAt", "DESC").all()
  }

  const getById = async (id: string, filters: TweetFilters = {}) => {
    return baseQuery(filters).where("tweet_id", "=", id).first()
  }

  const getRandom = async (filters: TweetFilters = {}) => {
    const tweets = await getAll(filters)
    if (!tweets.length) return null
    const randomIndex = Math.floor(Math.random() * tweets.length)
    return tweets[randomIndex]
  }

  return {
    getAll,
    getById,
    getRandom,
  }
}
