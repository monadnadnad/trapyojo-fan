<script setup lang="ts">
useSeoMeta({
  title: "ツイート一覧",
})

const { safeMode } = useSafeMode()
const { getAll } = useTweets()

const tweets = computed(() => getAll({ safeMode: safeMode.value }))
</script>

<template>
  <div class="mx-auto flex max-w-5xl flex-col gap-6">
    <h1 class="text-xl font-semibold text-foreground">
      ツイート一覧
    </h1>
    <div
      v-if="tweets.length"
      class="grid gap-4"
    >
      <TweetCard
        v-for="tweet in tweets"
        :key="tweet.status"
        :tweet="tweet"
      />
    </div>
    <div
      v-else
      class="rounded-2xl border border-dashed border-border bg-card p-6 text-center text-muted-foreground"
    >
      表示できるツイートがありません。
    </div>
  </div>
</template>
