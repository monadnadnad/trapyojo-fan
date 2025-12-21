<script setup lang="ts">
useSeoMeta({
  title: "ツイート一覧",
})

const { safeMode } = useSafeMode()
const { getAll } = useTweets()

const { data: tweets } = await useAsyncData(
  () => `tweets-${safeMode.value ? "safe" : "all"}`,
  () => getAll({ safeMode: safeMode.value }),
  { watch: [safeMode] },
)
</script>

<template>
  <div class="mx-auto flex max-w-5xl flex-col gap-6">
    <div
      v-if="tweets?.length"
      class="grid gap-2"
    >
      <TweetCard
        v-for="tweet in tweets"
        :key="tweet.tweet_id"
        :tweet="tweet"
      />
    </div>

    <div
      v-else
      class="border border-dashed bg-card p-6 text-center"
    >
      表示できるツイートがありません。
    </div>
  </div>
</template>
