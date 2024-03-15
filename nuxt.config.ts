// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "Generators",
      link: [
        { rel: "icon", href: "./logo.svg" }
      ]
    }
  }
})
