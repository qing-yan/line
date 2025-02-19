import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";

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
  // theme: hopeTheme({
  //   plugins: {
  //     mdEnhance: {
  //       echarts: true,
  //     },
  //   },
  // }),
  theme,
  shouldPrefetch: false,
  plugins: [
    registerComponentsPlugin({}), 
  ],
  head: [
    ['meta',{name: 'referrer',content: 'no-referrer'}]
  ],
  //
  alias: {
    "@Tjd": path.resolve(__dirname, './components/tjd.vue'),
    "@ExcelImport": path.resolve(__dirname, './components/excel-import.vue'),
    "@Sici": path.resolve(__dirname, './components/sici.vue'),
    "@Tcompare": path.resolve(__dirname, './components/tcompare.vue'),
    "@Regex": path.resolve(__dirname, './components/regex.vue'),
    "@SQL": path.resolve(__dirname, './components/SQL.vue'),
    "@Tidcard": path.resolve(__dirname, './components/tidcard.vue'),
    "@Cook": path.resolve(__dirname, './components/cook.vue'),
    "@MyWorld": path.resolve(__dirname, './components/myworld.vue'),
    "@Decoration": path.resolve(__dirname, './components/decoration.vue'),
    "@ThreeDoors": path.resolve(__dirname, './components/math/threeDoors.vue'),
  },
})
