<script setup lang="ts">
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const { safeMode } = useSafeMode()
const { getRandom } = useTweets()

const isThinking = ref(false)
const message = ref("...")
const link = ref<string | null>(null)

const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

const speak = async () => {
  if (isThinking.value) return

  isThinking.value = true
  message.value = "..."
  link.value = null

  const startedAt = Date.now()

  try {
    const tweet = await Promise.resolve(
      getRandom({ safeMode: safeMode.value }),
    )

    const elapsed = Date.now() - startedAt
    const remaining = Math.max(0, 500 - elapsed)
    if (remaining) await wait(remaining)

    if (tweet) {
      message.value = tweet.text
      link.value = tweet.sourceUrl
    }
    else {
      message.value = "表示できるツイートがありません。"
      link.value = null
    }
  }
  finally {
    isThinking.value = false
  }
}
</script>

<template>
  <Card class="mx-auto w-full max-w-3xl">
    <CardContent class="grid items-center gap-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6 sm:py-4">
      <div class="flex flex-col gap-4 items-center">
        <Button
          variant="outline"
          size="icon-lg"
          class="
          relative h-36 w-36 justify-self-center rounded-full border border-border
          bg-background/80 shadow-sm
          transition-transform hover:-translate-y-1 hover:shadow-md
          sm:h-44 sm:w-44 sm:justify-self-start

          disabled:opacity-80 disabled:saturate-100 disabled:brightness-100
          disabled:cursor-default
          focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none
          "
          aria-label="トラップようじょをしゃべらせる"
          :aria-busy="isThinking"
          :disabled="isThinking"
          @click="speak"
        >
          <img
            src="/trapyojo_400x400.jpg"
            alt="トラップようじょのアイコン"
            class="h-full w-full rounded-full border border-border object-cover"
            loading="lazy"
          >
          <Badge class="absolute bottom-0 right-0 shadow-sm">
            TAP
          </Badge>
        </Button>
        <NuxtLink
          to="https://x.com/trapyojo"
          target="_blank"
          class="flex items-center gap-2 text-lg text-muted-foreground font-semibold hover:underline"
        >
          <Icon
            name="simple-icons:x"
            class="w-5 h-5"
          />
          @trapyojo
        </NuxtLink>
      </div>
      <div
        class="relative w-full max-w-xl rounded-2xl border border-border px-5 py-4 text-base shadow-sm"
        :class="{ 'animate-pulse': isThinking }"
        aria-live="polite"
      >
        <div class="flex min-h-28 flex-col">
          <p class="flex-1 whitespace-pre-line leading-relaxed">
            {{ message }}
          </p>
          <div
            v-if="link"
            class="mt-2 flex justify-end text-xs text-muted-foreground"
          >
            <NuxtLink
              :to="link"
              target="_blank"
              class="inline-flex items-center gap-1 font-semibold hover:underline hover:text-foreground"
            >
              <span>元ツイートを見る↗</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
