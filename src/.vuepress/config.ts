import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from "@vuepress/utils";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: "/line/",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Line",
      description: "",
    },
  },
  theme,
  shouldPrefetch: false,
  plugins: [
    registerComponentsPlugin({
      
    }),
  ],
  head: [
    ['meta',{name: 'referrer',content: 'no-referrer'}]
  ],
  //
  alias: {
    "@T123": path.resolve(__dirname, './components/t123.vue'),
    "@ExcelImport": path.resolve(__dirname, './components/excel-import.vue'),
  },
})
