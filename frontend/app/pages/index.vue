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
  <div class="min-h-screen bg-background px-4 py-10 text-foreground">
    <div class="mx-auto flex max-w-4xl flex-col gap-8">
      <header class="flex flex-col gap-3 text-center">
        <h1 class="text-3xl font-bold text-foreground">
          trapyojoのなにか
        </h1>
      </header>

      <div class="flex flex-wrap items-center justify-center gap-4">
        <label class="flex items-center gap-4 rounded-full border border-border px-4 py-2 text-sm shadow-sm">
          <span class="font-semibold text-foreground">安全なツイート</span>
          <Switch
            v-model="safeMode"
            class="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
          />
        </label>
        <Button
          size="lg"
          class="rounded-full px-4 py-2 shadow-sm"
          @click="pickRandom"
        >
          別のツイートを表示
        </Button>
      </div>

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
    </div>
  </div>
</template>
