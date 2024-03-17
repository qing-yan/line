// ==UserScript==
// @name         动态快捷删除
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://space.bilibili.com/43450743/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //等待页面加载
    window.onload = () => {
        //
        var myButton = addDiv()
        myButton.addEventListener('click', () => {
            //获取动态组件
            var dtArr = document.querySelectorAll('.bili-dyn-list__item');
            for (let i = 0; i < dtArr.length; i++) {
                const dt = dtArr[i];
                //获取删除按钮
                var sc = dt.querySelector('.bili-dyn-more__menu__item + div');
                if (sc == null) {
                    continue;
                }
                //添加自动确认删除监听
                sc.addEventListener('click', () => {
                    setTimeout(() => {
                        document.querySelector('.bili-modal__button.confirm').click()
                    }, 100);
                });
                // sc.setAttribute('data-modal', '');
                //获取父组件的父组件的父组件
                var fdiv = dt.querySelector('.bili-dyn-item__main');
                try {
                    fdiv.insertBefore(sc, fdiv.firstChild)
                } catch (error) {
                    console.log('遇到源动态被删除了')
                }
            }
        })

    }
})();

/**
 * 创建顶层浮动面板
 * @returns {Object} - 创建的浮动面板
 */
function addDiv() {
    //创建顶层浮动面板
    var div = document.createElement('div')
        //设置样式，位于网页左侧居中
    div.style.position = 'fixed';
    div.style.top = '100px';
    div.style.left = '10px';
    div.style.zIndex = '9999';
    //背景色天蓝色
    div.style.backgroundColor = '#87cefa';
    //背景不透明度
    div.style.opacity = '0.9';
    //修改border
    div.style.borderRadius = '5px';
    div.style.border = '1px solid #ccc';
    div.style.padding = '10px';
    div.style.fontSize = '16px';
    div.style.cursor = 'pointer';
    div.innerHTML = '外置删除按钮';
    //将面板添加到网页中
    document.body.appendChild(div)
    return div
}