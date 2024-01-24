import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "生活", icon: "note", link: "/life/" },
  { text: "学习", icon: "study", link: "/learn/" },
  { text: "工具", icon: "tool", link: "/tools/" },
  { text: "其他", icon: "others", link: "/other/" },
 
]);
