// ==UserScript==
// @name         B站自动收藏脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.bilibili.com/video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.onkeydown = (e) => {
        if (e.key == 'r') {
            console.log(e.key)
            document.querySelector('.video-fav.video-toolbar-left-item').click()
            setTimeout(() => {
                document.querySelector('.group-list > ul span[title=稍后再听]').click()
            }, 200);
            setTimeout(() => {
                document.querySelector('.btn.submit-move').click()
            }, 200);
        }
    };
    // Your code here...
})();