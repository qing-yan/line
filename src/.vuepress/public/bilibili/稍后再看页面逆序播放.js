// ==UserScript==
// @name         稍后再看页面逆序播放
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.bilibili.com/list/watchlater
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //等待页面加载完成
    window.onload = function() {
        //获取排序按钮
        var sortButton = document.querySelector('.list-playorder-btn.list-tool-btn');
        //点击排序按钮
        sortButton.click();
        //延迟1秒
        setTimeout(function() {
            //获取下一个按钮并点击
            var nextButton = document.querySelector('.bpx-player-ctrl-btn.bpx-player-ctrl-next');
            nextButton.click();
        }, 1000);
        //延迟1秒
        setTimeout(function() {
            //获取网页全屏按钮并点击
            var fullscreenButton = document.querySelector('.bpx-player-ctrl-btn.bpx-player-ctrl-web');
            fullscreenButton.click();
        }, 2000);
    }
})();