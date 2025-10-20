// ==UserScript==
// @name         稍后再看数据统计V4
// @namespace    http://tampermonkey.net/
// @version      4
// @description  try to take over the world!
// @author       You
// @match        https://www.bilibili.com/watchlater/*
// @require      file://D:/workspace/work/tampermonkey/shzksjtjv4.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

var data = {};
(function () {
    'use strict';
    // Your code here...
    window.onload = () => {
        start();
    }
})();