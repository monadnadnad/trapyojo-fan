<script setup lang="ts">
const props = defineProps<{
  tweet: Tweet
}>()

const formattedDate = computed(() => {
  const date = new Date(props.tweet.postedAt)
  return new Intl.DateTimeFormat("ja-JP", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
})
</script>

<template>
  <Card class="mx-auto w-full max-w-xl shadow-sm gap-0">
    <CardHeader class="flex flex-row items-center gap-3 pb-2">
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
        <span class="text-xs text-muted-foreground">
          @trapyojo
        </span>
      </div>
    </CardHeader>

    <CardContent>
      <p class="whitespace-pre-line text-lg leading-relaxed text-foreground">
        {{ tweet.text }}
      </p>
    </CardContent>

    <CardFooter class="flex flex-col gap-3 pt-4 text-sm text-muted-foreground">
      <div class="flex w-full flex-wrap items-center justify-between gap-3">
        <span v-if="formattedDate">{{ formattedDate }}</span>
        <NuxtLink
          :to="tweet.sourceUrl"
          target="_blank"
          class="font-bold hover:underline"
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
