<script setup lang="ts">
defineProps<{
  tweet: Tweet
}>()
</script>

<template>
  <Card
    class="mx-auto w-full max-w-xl shadow-sm gap-2 cursor-pointer"
    tabindex="0"
    @click="$router.push(`/tweets/${tweet.tweet_id}`)"
    @keydown.enter="$router.push(`/tweets/${tweet.tweet_id}`)"
    @keydown.space="$router.push(`/tweets/${tweet.tweet_id}`)"
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

      <div class="flex w-full flex-wrap gap-1">
        <Badge
          v-for="tag in tweet.tags"
          :key="tag"
          variant="outline"
        >
          #{{ tag }}
        </Badge>
      </div>
    </CardFooter>
  </Card>
</template>
