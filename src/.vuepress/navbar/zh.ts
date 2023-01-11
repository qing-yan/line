import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "生活", icon: "note", link: "/life/" },
  {
    text: "学习",
    icon: "study",
    prefix: "/learn/",
    children: [
      { text: "诗词", icon: "", link: "sici/" },
      { text: "代码", icon: "", link: "code/" },
    ],
  },
  { text: "工具", icon: "tool", link: "/tools/" },
  {
    text: "其他",
    icon: "others",
    prefix: "/other/",
    children: [
      "sites"
    ]
  },
]);
