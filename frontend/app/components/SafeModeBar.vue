<script setup lang="ts">
const safeMode = defineModel<boolean>("safeMode", { default: true })
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-4">
    <label class="flex items-center gap-4 px-4 py-2 text-sm">
      <span class="font-semibold text-foreground">安全なツイート</span>
      <Switch
        v-model="safeMode"
        class="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
      />
    </label>
  </div>
</template>
