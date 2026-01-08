<script setup lang="ts">
const props = defineProps<{
  dream: Dream
  videoUrl?: string
  videoPosterUrl?: string
}>()
</script>

<template>
  <DialogContent class="max-h-[80vh] overflow-hidden bg-card p-0 sm:max-w-4xl">
    <div class="flex h-full max-h-[80vh] flex-col md:grid md:grid-cols-[1.35fr_1fr] md:items-stretch">
      <div class="flex shrink-0 items-center justify-center overflow-hidden">
        <NuxtImg
          v-if="props.dream.type === 'image'"
          provider="cloudinary"
          :src="props.dream.src"
          class="h-full max-h-[50vh] w-full object-contain md:max-h-[80vh]"
        />
        <video
          v-else
          controls
          playsinline
          class="h-full max-h-[50vh] w-full md:max-h-[80vh]"
          :src="props.videoUrl"
          :poster="props.videoPosterUrl"
        />
      </div>

      <div class="flex min-h-0 flex-col gap-4 p-4 sm:p-6">
        <DialogHeader class="gap-2">
          <DialogTitle class="text-xl font-semibold">
            {{ props.dream.title }}
          </DialogTitle>
          <DialogDescription class="sr-only">
            {{ props.dream.title }} の詳細
          </DialogDescription>
          <div
            v-if="props.dream.createdBy"
            class="text-xs text-muted-foreground/80"
          >
            Created By {{ props.dream.createdBy }}
          </div>
        </DialogHeader>

        <div class="max-h-[35vh] flex-1 overflow-y-auto md:max-h-none">
          <div class="flex flex-col gap-4">
            <div
              v-if="props.dream.comment"
              class="flex items-start gap-2"
            >
              <div class="h-10 w-10 shrink-0 overflow-hidden rounded-full border">
                <NuxtImg
                  src="/trapyojo_400x400.jpg"
                  class="h-full w-full object-cover"
                />
              </div>

              <div class="rounded-lg border bg-muted/30 px-3 py-2">
                <p class="text-sm leading-relaxed text-foreground">
                  {{ props.dream.comment }}
                </p>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-2 text-xs text-muted-foreground/80">
              <time
                :datetime="props.dream.publishedAt"
                class="rounded-full border bg-background px-2 py-0.5 font-medium text-foreground/80"
              >
                {{ formatDate(props.dream.publishedAt) }}
              </time>
              <span class="rounded-full border bg-background px-2 py-0.5 font-medium text-foreground/80 first-letter:uppercase">
                {{ props.dream.type }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DialogContent>
</template>
