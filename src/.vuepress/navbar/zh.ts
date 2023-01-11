import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "生活", icon: "discover", link: "/life/" },
  {
    text: "学习",
    icon: "edit",
    prefix: "/learn/",
    children: [
      {
        text: "诗词",
        icon: "edit",
        prefix: "sici/",
        children: [
          // { text: "苹果2", icon: "edit", link: "2" },
          "du-fu", "su-shi",
        ],
      },
    ],
  },
  {
    text: "其他",
    icon: "",
    prefix: "/other/",
    children: [
      "sites"
    ]
  },
  {
    text: "V2 文档",
    icon: "note",
    link: "https://theme-hope.vuejs.vuepress/zh/",
  },
]);
