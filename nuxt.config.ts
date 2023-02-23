import VueSetupExtend from "unplugin-vue-setup-extend/vite"
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "%s - Nuxt3",
      title: "艾莎编程",
      charset: "utf-8",
      htmlAttrs: {
        lang: "zh-cn",
      },
      meta: [
        { name: "description", content: "帝莎编程描述" },
        { name: "keywords", content: "帝莎编程关键词" },
      ],
      script: [
        // { src:"http://xxx.js" }
      ],
      link: [
        // { rel:"stylesheet",href:"http://xxx.css" }
      ],
    },
  },
  css: ["@/assets/main.css"],
  modules: ["nuxt-windicss"],
  build: {
    transpile: [
      "naive-ui",
      "vueuc",
      "@css-render/vue3-ssr",
      "@juggle/resize-observer",
    ],
  },
  vite: {
    plugins: [VueSetupExtend({})],
    optimizeDeps: {
      include: ["date-fns-tz/esm/formatInTimeZone"],
    },
  },
  imports: {
    dirs: ["apis"],
  },
});
