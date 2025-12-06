<script setup lang="ts">
const { safeMode } = useSafeMode()
const { getRandom } = useTweets()

const randomTweet = useState<Tweet | null>("random-tweet", () =>
  getRandom({ safeMode: safeMode.value }),
)

const pickRandom = () => {
  randomTweet.value = getRandom({ safeMode: safeMode.value })
}
</script>

<template>
  <div class="mx-auto flex flex-col gap-8">
    <TweetCard
      v-if="randomTweet"
      :tweet="randomTweet"
    />
    <div
      v-else
      class="rounded-2xl border border-dashed border-border bg-card p-6 text-center text-muted-foreground"
    >
      表示できるツイートがありません。
    </div>
    <div class="flex flex-wrap items-center justify-end gap-4">
      <Button
        size="lg"
        class="rounded-full px-4 py-2 shadow-sm"
        @click="pickRandom"
      >
        別のツイートを表示
      </Button>
    </div>
  </div>
</template>
