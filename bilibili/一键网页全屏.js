// ==UserScript==
// @name         一键网页全屏
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.addEventListener("keyup", function(event) { //创建全局监听
        if (event.keyCode == '192') { //只对回车事件作出响应
            var but = document.querySelector('.bpx-player-ctrl-btn.bpx-player-ctrl-web')
            if (but != null) {
                but.click()
            }
        }
    });
})();