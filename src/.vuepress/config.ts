import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

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
    // autoCatalogPlugin({
    //   //插件选项
    // }),
  ],
});
