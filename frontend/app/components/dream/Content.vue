<script setup lang="ts">
const props = defineProps<{
  dream: Dream
  videoUrl?: string
  videoPosterUrl?: string
}>()

const { getLikes, postLikes } = useLikes()
const { data, pending } = getLikes(props.dream.dreamId)
const clapFloats = ref<{ id: number, x: number, delay: number }[]>([])
const clapActive = ref(false)

const handleLike = async () => {
  clapActive.value = false
  requestAnimationFrame(() => {
    clapActive.value = true
    window.setTimeout(() => {
      clapActive.value = false
    }, 320)
  })
  const id = Date.now()
  clapFloats.value.push({
    id,
    x: Math.round((Math.random() - 0.5) * 36),
    delay: Math.round(Math.random() * 80),
  })
  window.setTimeout(() => {
    clapFloats.value = clapFloats.value.filter(item => item.id !== id)
  }, 1200)
  const res = await postLikes(props.dream.dreamId)
  data.value = res
}
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
            {{ formatDate(props.dream.publishedAt) }} Created by {{ props.dream.createdBy }}
          </div>
          <div class="flex items-center gap-2">
            <Button
              variant="secondary"
              class="relative hover:-translate-y-0.5 "
              :disabled="pending"
              @click="handleLike"
            >
              <span class="text-foreground font-bold text-xl">
                <span
                  class="relative inline-flex"
                  aria-hidden="true"
                >
                  <span
                    class="clap-emoji"
                    :class="{ 'clap-active': clapActive }"
                  >
                    👏
                  </span>
                  <span class="pointer-events-none absolute inset-0">
                    <span
                      v-for="item in clapFloats"
                      :key="item.id"
                      class="clap-float absolute left-0 top-0 select-none text-2xl leading-none"
                      :style="{ '--x': item.x + 'px', '--delay': item.delay + 'ms' }"
                    >👏</span>
                  </span>
                </span>
                <span>{{ data?.count ?? 0 }}</span>
              </span>
            </Button>
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
          </div>
        </div>
      </div>
    </div>
  </DialogContent>
</template>

<style scoped>
.clap-emoji {
  display: inline-block;
  transform-origin: 40% 70%;
}

.clap-active {
  animation: clap 300ms cubic-bezier(0.25, 0.9, 0.2, 1);
}

.clap-float {
  opacity: 0;
  animation: clap-float 1200ms ease-out forwards;
  animation-delay: var(--delay, 0ms);
}

@keyframes clap {
  0% {
    transform: scale(1) rotate(0deg);
    text-shadow: 0 0 0 transparent;
  }
  50% {
    transform: scale(1.15) rotate(10deg);
    text-shadow:
      -4px 0 0 color-mix(in oklab, var(--color-accent) 35%, transparent),
      4px 0 0 color-mix(in oklab, var(--color-primary) 30%, transparent);
  }
  100% {
    transform: scale(1) rotate(0deg);
    text-shadow: 0 0 0 transparent;
  }
}

@keyframes clap-float {
  0% {
    opacity: 0;
    transform: translate(0, 0);
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(var(--x, 0px), -70px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .clap-active,
  .clap-float {
    animation: none;
  }
}
</style>
