<script setup lang="ts">
const route = useRoute()
const { safeMode } = useSafeMode()
const { getById } = useTweets()

const { data: tweet } = await useAsyncData(
  () => `tweet-${route.params.id}-${safeMode.value ? "safe" : "all"}`,
  () => getById(route.params.id as string, { safeMode: safeMode.value }),
  { watch: [() => route.params.id, safeMode] },
)
</script>

<template>
  <div class="mx-auto flex max-w-4xl flex-col gap-6">
    <NuxtLink
      to="/tweets"
      class="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:underline"
    >
      ← ツイート一覧に戻る
    </NuxtLink>
    <div v-if="tweet">
      <TweetCard :tweet="tweet" />
    </div>

    <div
      v-else
      class="rounded-2xl border border-dashed border-border bg-card p-6 text-center"
    >
      <p class="text-lg font-semibold text-foreground">
        ツイートを表示できませんでした。
      </p>
      <p class="mt-2 text-sm text-muted-foreground">
        {{ safeMode ? "セーフモードが ON なせいかも。" : "登録されていないツイートです。" }}
      </p>
    </div>
  </div>
</template>
