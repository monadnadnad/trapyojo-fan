<script setup lang="ts">
const { data: dreams } = await useAsyncData("dreams", () =>
  queryCollection("dreams").order("publishedAt", "DESC").all(),
)
</script>

<template>
  <div class="mx-auto flex max-w-6xl flex-col gap-6">
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DreamCard
        v-for="dream in dreams"
        :key="dream.id"
        :dream="dream"
      />
    </div>
  </div>
</template>
