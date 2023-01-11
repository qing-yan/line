import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "生活",
      icon: "note",
      prefix: "life/",
      children: "structure",
    },
    {
      text: "学习",
      icon: "note",
      prefix: "learn/",
      children: "structure",
    },
    {
      text: "其他",
      icon: "note",
      prefix: "other/",
      children: "structure",
    },
    // "slides",//幻灯片
  ],
});
