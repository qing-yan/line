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
    //等待页面加载完毕
    window.onload = function() {
        //打印标记
        console.log('B站动态列表稍后再看按钮扩大并自动加入脚本已加载');
        //在网页最上层创建按钮
        var button = document.createElement('button');
        //设置按钮的文本内容为"稍后再看"
        button.innerText = "稍后再看";
        //设置按钮的样式，位于网页左侧居中
        button.style.position = 'fixed';
        button.style.top = '500px';
        button.style.left = '10px';
        button.style.zIndex = '9999';
        //背景色天蓝色
        button.style.backgroundColor = '#87cefa';
        //修改border
        button.style.borderRadius = '5px';
        button.style.border = '1px solid #ccc';
        button.style.padding = '10px';
        button.style.fontSize = '16px';
        button.style.cursor = 'pointer';
        //将按钮添加到网页中
        document.body.appendChild(button);
        //打印标记
        console.log('按钮已创建');
        //添加监听功能
        button.addEventListener('click', function() {
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
            button.innerText = `稍后再看+${buttons.length}`;
        });
    };
})();