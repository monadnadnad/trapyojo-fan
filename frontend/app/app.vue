<script setup lang="ts">
const { safeMode } = useSafeMode()

const title = "trapyojo の何か"

useSeoMeta({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${title}` : title
  },
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <div class="min-h-screen bg-background text-foreground">
    <header class="w-full border-b border-border bg-card">
      <div class="mx-auto w-full max-w-7xl space-y-2 pb-2">
        <div class="relative min-w-sm h-28 sm:h-36 md:h-44 lg:h-52 overflow-hidden border border-border/70">
          <img
            src="/header.png"
            alt="ヘッダー画像"
            class="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
          >
        </div>
        <SafeModeBar
          v-model:safe-mode="safeMode"
          class="justify-end"
        />
      </div>
    </header>

    <main class="mx-auto w-full max-w-7xl px-2 sm:px-4 lg:px-6 py-10">
      <NuxtPage />
    </main>

    <footer class="w-full border-t border-border bg-card/40">
      <div class="mx-auto flex justify-center max-w-7xl px-2 sm:px-4 lg:px-6 py-6 text-xs text-muted-foreground">
        <p>traPスーパーようじょbotロリ子の発言をまとめている非公式サイトです。</p>
      </div>
    </footer>
  </div>
</template>
