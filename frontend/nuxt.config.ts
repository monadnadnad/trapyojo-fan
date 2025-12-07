// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "shadcn-nuxt", "@nuxt/icon"],
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  compatibilityDate: "2025-07-15",
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  eslint: {
    config: {
      stylistic: {
        quotes: "double",
      },
    },
  },
  icon: {
    mode: "css",
    cssLayer: "base",
  },
  shadcn: {
    prefix: "",
    componentDir: "@/components/ui",
  },
})
