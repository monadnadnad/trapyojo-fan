<script setup lang="ts">
const props = defineProps<{
  tweet: Tweet
}>()

const router = useRouter()
const handleCardActivate = (event: MouseEvent | KeyboardEvent) => {
  if (event.defaultPrevented) return

  const selection = window.getSelection()
  if (selection && !selection.isCollapsed) return

  router.push(`/tweets/${props.tweet.tweet_id}`)
}
</script>

<template>
  <Card
    class="mx-auto w-full max-w-xl shadow-sm gap-2 cursor-pointer transition-colors hover:bg-neutral-100/50"
    tabindex="0"
    @click="handleCardActivate"
    @keydown.enter="handleCardActivate"
    @keydown.space.prevent="handleCardActivate"
  >
    <CardHeader class="flex flex-row items-center gap-2 pb-2">
      <img
        src="/trapyojo_400x400.jpg"
        alt="trapyojoのアイコン"
        class="h-12 w-12 rounded-full border object-cover"
        loading="lazy"
      >
      <div class="flex flex-col leading-tight">
        <span class="font-bold">
          traPスーパーようじょbotロリ子
        </span>
        <span class="text-sm text-muted-foreground">
          @trapyojo
        </span>
      </div>
    </CardHeader>

    <CardContent>
      <p class="whitespace-pre-line leading-relaxed text-foreground">
        {{ tweet.text }}
      </p>
    </CardContent>

    <CardFooter class="flex flex-col gap-3 pt-4 text-sm text-muted-foreground">
      <div class="flex w-full flex-wrap items-center justify-start gap-8">
        <div class="flex items-center gap-2 leading-none">
          <Icon
            name="tabler:message-circle"
            class="h-4 w-4"
          />
          <span
            v-if="tweet.replyCount > 0"
            class="tabular-nums"
          >
            {{ tweet.replyCount }}
          </span>
        </div>
        <div class="flex items-center gap-2 leading-none">
          <Icon
            name="tabler:repeat"
            class="h-4 w-4"
          />
          <span
            v-if="tweet.retweetCount > 0"
            class="tabular-nums"
          >
            {{ tweet.retweetCount }}
          </span>
        </div>
        <div class="flex items-center gap-2 leading-none">
          <Icon
            name="tabler:heart"
            class="h-4 w-4"
          />
          <span
            v-if="tweet.likeCount > 0"
            class="tabular-nums"
          >
            {{ tweet.likeCount }}
          </span>
        </div>
      </div>

      <div class="flex w-full flex-wrap gap-1">
        <Badge
          v-for="tag in tweet.tags"
          :key="tag"
          variant="outline"
        >
          #{{ tag }}
        </Badge>
      </div>

      <div class="flex w-full flex-wrap items-center justify-between gap-3">
        <span>{{ formatDateTime(tweet.postedAt) }}</span>
        <NuxtLink
          :to="tweet.sourceUrl"
          target="_blank"
          class="font-semibold hover:underline"
          @click.stop
          @keydown.stop
        >
          元ツイートを見る ↗
        </NuxtLink>
      </div>
    </CardFooter>
  </Card>
</template>
