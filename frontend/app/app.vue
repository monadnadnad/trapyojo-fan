<script setup lang="ts">
const { safeMode } = useSafeMode()
const route = useRoute()

const navItems = [
  { label: "ホーム", to: "/" },
  { label: "ツイート", to: "/tweets" },
  { label: "最近みた夢", to: "/dreams" },
]

const title = "ロリ子、生き返れ"
const description = "traPスーパーようじょbotロリ子 @trapyojo を生き返らせるための非公式アーカイブサイトの予定です。"
const headerImage = "https://res.cloudinary.com/dsgc6z5yg/image/upload/header.png"

useSeoMeta({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${title}` : title
  },
  ogTitle: title,
  description: description,
  ogImage: headerImage,
  ogDescription: description,
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: headerImage,
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <div class="min-h-screen bg-background text-foreground">
    <header class="w-full border-b border-border bg-card">
      <div class="mx-auto w-full max-w-7xl space-y-2 pb-3">
        <div class="relative min-w-sm h-28 sm:h-36 md:h-44 lg:h-52 overflow-hidden">
          <NuxtImg
            provider="cloudinary"
            src="/header.png"
            alt="ヘッダー画像"
            class="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
          />
        </div>
        <div class="flex flex-wrap items-center justify-between gap-3 px-2 sm:px-1">
          <NavigationMenu>
            <NavigationMenuList class="flex items-center gap-2 rounded-lg bg-muted p-1">
              <NavigationMenuItem
                v-for="item in navItems"
                :key="item.to"
              >
                <NavigationMenuLink as-child>
                  <NuxtLink
                    :to="item.to"
                    class="inline-flex min-w-24 items-center justify-center rounded-lg font-semibold"
                    :class="route.path === item.to ? 'bg-accent/70 text-accent-foreground shadow-sm' : 'bg-card/70 text-foreground'"
                  >
                    {{ item.label }}
                  </NuxtLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <SafeModeBar v-model:safe-mode="safeMode" />
        </div>
      </div>
    </header>

    <main class="mx-auto w-full max-w-7xl px-2 sm:px-4 lg:px-6 py-10">
      <NuxtPage />
    </main>

    <footer class="w-full border-t border-border bg-card/40">
      <div class="mx-auto flex justify-center max-w-7xl px-2 sm:px-4 lg:px-6 py-6 text-xs text-muted-foreground">
        <p>traPスーパーようじょbotロリ子の発言をまとめている、 traP とは無関係の非公式サイトです。</p>
      </div>
    </footer>
  </div>
</template>
