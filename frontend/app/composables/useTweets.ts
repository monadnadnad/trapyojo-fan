import tweets from "@/data/tweets.json"
// テスト用
const tweetsData = tweets as Tweet[]

type TweetFilters = {
  readonly safeMode?: boolean
}

const applySafeMode = (tweets: Tweet[], { safeMode }: TweetFilters) => {
  if (!safeMode) {
    return tweets
  }

  return tweets.filter(tweet => !tweet.isNSFW)
}

export const useTweets = () => {
  const getAll = (filters: TweetFilters = {}) => {
    return applySafeMode(tweetsData, filters)
  }

  const getRandom = (filters: TweetFilters = {}) => {
    const filteredTweets = applySafeMode(tweetsData, filters)
    const randomIndex = Math.floor(Math.random() * filteredTweets.length)

    return filteredTweets[randomIndex] || null
  }

  return {
    getAll,
    getRandom,
  }
}
