// ==UserScript==
// @name         批量添加稍后再看
// @namespace    http://tampermonkey.net/
// @version      2024-03-28
// @description  try to take over the world!
// @author       You
// @match        https://space.bilibili.com/*/video
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //等待页面加载完成
    window.onload = function() {
        var button = addButton('稍后再看', '10px');
        button.addEventListener('click', () => {
            var list = document.querySelectorAll('.small-item.fakeDanmu-item')
            list.forEach(e => {
                e.querySelector('.i-watchlater').click()
            });
        });

    }
})();
/**
 * 创建按钮
 * @returns 
 */
function addButton(text, top) {
    //在网页最上层创建按钮
    var button = document.createElement('button');
    //设置按钮的文本内容
    button.innerText = text;
    //设置按钮的样式，位于网页左侧居中
    button.style.position = 'fixed';
    button.style.top = top;
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
    return button;
}