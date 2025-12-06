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
  <article class="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
    <header class="flex items-center gap-3">
      <img
        src="/trapyojo_400x400.jpg"
        alt="trapypojoのアイコン"
        class="h-12 w-12 rounded-full border border-border object-cover"
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
    </header>
    <div class="whitespace-pre-line text-lg leading-relaxed text-foreground">
      {{ tweet.text }}
    </div>

    <div class="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
      <span>{{ formattedDate }}</span>
      <NuxtLink
        :to="tweet.sourceUrl"
        target="_blank"
        class="font-bold hover:underline"
      >
        元ツイートを見る ↗
      </NuxtLink>
    </div>

    <ul class="flex flex-wrap gap-2 text-xs text-muted-foreground">
      <li
        v-for="tag in tweet.tags"
        :key="tag"
        class="rounded-full border border-border/70 px-3 py-1 uppercase tracking-wide"
      >
        #{{ tag }}
      </li>
    </ul>
  </article>
</template>
