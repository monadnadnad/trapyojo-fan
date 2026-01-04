// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "shadcn-nuxt",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxt/content",
    "@nuxt/image",
  ],
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      ],
    },
  },
  css: ["~/assets/css/tailwind.css"],
  content: { experimental: { sqliteConnector: "native" } },
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
  image: {
    cloudinary: {
      baseURL: "https://res.cloudinary.com/dsgc6z5yg/image/upload/",
    },
  },
  shadcn: {
    prefix: "",
    componentDir: "@/components/ui",
  },
})
