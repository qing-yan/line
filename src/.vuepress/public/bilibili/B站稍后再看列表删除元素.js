// ==UserScript==
// @name         B站稍后再看列表删除元素
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.bilibili.com/watchlater/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.onload = () => {
            console.log(1111)
            var items = document.querySelectorAll('.av-item.clearfix')
            for (let i = 0; i < items.length; i++) {
                const e = items[i];
                console.log(i)
                var bb = document.createElement('button')
                bb.innerHTML = '删除'
                bb.setAttribute('style', 'margin-left: 40px')
                e.querySelector('.state').appendChild(bb)
                bb.addEventListener('click', () => {
                    e.innerHTML = ''
                })
            }
        }
        // Your code here...
})();