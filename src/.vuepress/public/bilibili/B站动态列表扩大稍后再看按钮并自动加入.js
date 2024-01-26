// ==UserScript==
// @name         B站动态列表扩大稍后再看按钮并自动加入
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://t.bilibili.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //打印标记
    console.log('B站动态列表稍后再看按钮扩大并自动加入脚本已加载');
    //每隔5秒获取所有稍后再看按钮组件
    setInterval(function() {
        //获取包含bili-dyn-card-video__mark但不包含active属性的组件
        var buttons = document.querySelectorAll('.bili-dyn-card-video__mark:not(.active)');
        //遍历按钮组件
        buttons.forEach(function(button) {
            //设置宽度和高度为100
            button.style.width = '112px';
            button.style.height = '112px';
            //点击稍后再看按钮
            button.click();
        });
    }, 5000);
})();