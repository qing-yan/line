---
title: 黑洞
date: 2023-12-10
category:
 - 代码 
tag:
 - css
---

<iframe :src="$withBase('/blackhole.html')" id="iframeId" width="100%" height="740"  allowfullscreen="true" frameborder="0" scrolling="No" leftmargin="0" topmargin="0"/>

<el-button style="position: absolute; left: 90%; top: 53%" type="primary" size="" @click="dianji">全屏</el-button>

源码 [JS是没有上限的 网页宇宙黑洞](https://www.bilibili.com/video/BV1ku4y157wU)   

<script>
export default {
  data: () => ({  }),
  methods: {
    dianji() {
      //设置后就是id==con_lf_top_div 的容器全屏 allow="fullscreen"
      let case1 = document.getElementById("iframeId");
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (case1.requestFullscreen) {
          case1.requestFullscreen();
        } else if (case1.webkitRequestFullScreen) {
          case1.webkitRequestFullScreen();
        } else if (case1.mozRequestFullScreen) {
          case1.mozRequestFullScreen();
        } else if (case1.msRequestFullscreen) {
          // IE11
          case1.msRequestFullscreen();
        }
      }
      case1.contentWindow.location.reload();
    },
  },
};
</script>