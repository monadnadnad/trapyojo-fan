<script setup lang="ts">
import type { NuxtError } from "#app"

const props = defineProps<{ error: NuxtError }>()

const is404 = computed(() => props.error?.statusCode === 404)
const statusMessage = computed(() =>
  is404.value ? "404 - Page Not Found" : "Unexpected Error",
)

function goHome() {
  return clearError({ redirect: "/" })
}
</script>

<template>
  <NuxtLayout>
    <main class="relative mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center gap-5 px-4 py-6 text-center overflow-hidden">
      <p class="text-sm font-semibold uppercase tracking-widest text-slate-600">
        {{ statusMessage }}
      </p>
      <p class="font-black text-[clamp(1.8rem,6vw,2.6rem)] leading-snug">
        <span class="inline-block">ふぇぇ、わからないよぅ</span>
        <span class="block sm:inline-block whitespace-nowrap">
          &gt; &lt;
        </span>
      </p>

      <img
        class="mx-auto w-40 max-w-[80vw] drop-shadow-md sm:w-48"
        src="/404.png"
        alt="trapyojoが頭を抱えてる画像"
      >

      <Button
        class="px-6 font-semibold shadow-sm"
        @click="goHome"
      >
        トップページへ戻る
      </Button>
    </main>
  </NuxtLayout>
</template>
