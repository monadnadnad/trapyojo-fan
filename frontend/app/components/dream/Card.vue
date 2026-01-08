<script setup lang="ts">
const props = defineProps<{
  dream: Dream
}>()

const videoBase = "https://res.cloudinary.com/dsgc6z5yg/video/upload/"
const isVideo = computed(() => props.dream.type === "video")
const videoUrl = computed(() =>
  isVideo.value ? `${videoBase}${props.dream.src}` : undefined,
)
const videoPosterUrl = computed(() =>
  isVideo.value ? `${videoBase}so_0,f_jpg/${props.dream.src}` : undefined,
)

const getPreviewVideo = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement | null
  return target?.querySelector("video") as HTMLVideoElement | null
}

const resetPreview = (el: HTMLVideoElement) => {
  el.pause()
  el.currentTime = 0
}

const handlePreviewEnter = async (event: MouseEvent) => {
  if (!isVideo.value) return
  const el = getPreviewVideo(event)
  if (!el) return
  resetPreview(el)
  try {
    await el.play()
  }
  catch {
    // autoplay or quick hover-out can abort; ignore
  }
}

const handlePreviewLeave = (event: MouseEvent) => {
  if (!isVideo.value) return
  const el = getPreviewVideo(event)
  if (!el) return
  resetPreview(el)
}
</script>

<template>
  <Dialog>
    <DreamCardTrigger
      :dream="dream"
      :video-url="videoUrl"
      :video-poster-url="videoPosterUrl"
      @preview-enter="handlePreviewEnter"
      @preview-leave="handlePreviewLeave"
    />

    <DreamContent
      :dream="dream"
      :video-url="videoUrl"
      :video-poster-url="videoPosterUrl"
    />
  </Dialog>
</template>
