// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,

  runtimeConfig: { 
    public:{apiUrl:process.env.NUXT_API_URL}
  },

  modules: ['@nuxtjs/tailwindcss',],
})