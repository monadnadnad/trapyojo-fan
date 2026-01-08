<script setup lang="ts">
const props = defineProps<{
  dream: Dream
  videoUrl?: string
  videoPosterUrl?: string
}>()

const emit = defineEmits<{
  (event: "preview-enter" | "preview-leave", value: MouseEvent): void
}>()
</script>

<template>
  <DialogTrigger as-child>
    <Card
      class="group w-full overflow-hidden transition hover:-translate-y-1 hover:shadow-lg"
      @mouseenter="emit('preview-enter', $event)"
      @mouseleave="emit('preview-leave', $event)"
    >
      <div class="relative aspect-3/4 overflow-hidden bg-muted/30">
        <NuxtImg
          v-if="props.dream.type === 'image'"
          provider="cloudinary"
          :src="props.dream.src"
          :alt="props.dream.title"
          sizes="400px"
          class="h-full w-full object-cover"
        />
        <video
          v-else
          muted
          loop
          playsinline
          preload="metadata"
          :src="props.videoUrl"
          :poster="props.videoPosterUrl"
          class="h-full w-full object-cover"
        />
      </div>

      <div class="space-y-1 p-3">
        <div class="text-sm font-semibold">
          {{ props.dream.title }}
        </div>
        <div class="text-xs text-muted-foreground flex items-center gap-2">
          <time :datetime="props.dream.publishedAt">{{ formatDate(props.dream.publishedAt) }}</time>
          <span v-if="props.dream.createdBy"> Created by {{ props.dream.createdBy }}</span>
        </div>
      </div>
    </Card>
  </DialogTrigger>
</template>
