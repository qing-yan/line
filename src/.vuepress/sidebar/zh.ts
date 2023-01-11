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
      icon: "study",
      prefix: "learn/",
      children: "structure",
    },
    {
      text: "工具",
      icon: "tool",
      prefix: "tools/",
      children: "structure",
    },
    {
      text: "其他",
      icon: "others",
      prefix: "other/",
      children: "structure",
    },
    // "slides",//幻灯片
  ],
});
