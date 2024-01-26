// ==UserScript==
// @name         B站本人动态快捷删除
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
    // window.onload = () => {
    //增加按钮
    document.querySelector('body').appendChild(document.createElement('button'))
    var myButton = document.querySelector('body').querySelector('button')
    myButton.setAttribute('style', 'position: fixed; right: 0px; bottom: 0px; z-index: 99; background: #333; color: white; padding: 16px 24px; width: 120px; height: 50px; border-radius: 5px; text-align: center; line-height: 25px;')
    myButton.setAttribute('id', 'top')
        //设置点击事件
    myButton.addEventListener('click', () => {
        console.log(1111)
        var dts = document.querySelectorAll('.bili-dyn-list__item');
        console.log(dts.length)
        dts.forEach(e => {
            // var dynBut = e.querySelector('button');
            // if (dynBut == null) {
            //     e.querySelector('.bili-dyn-item__more').appendChild(document.createElement('button'));
            //     dynBut = e.querySelector('button');
            //     dynBut.setAttribute('style', "width: 50px; height: 50px; margin-right: 50px;")
            //     dynBut.click()
            // }

            //
            var newCancle = e.querySelector('#newCancle');
            if (newCancle == null) {
                e.querySelector('.bili-dyn-more__btn.tp').click();
                var cancle = e.querySelector('.bili-dyn-more__menu__item + div');
                if (cancle != null) {
                    cancle.setAttribute('style', 'margin-right: 50px');
                    cancle.setAttribute('id', 'newCancle');
                    e.querySelector('.bili-dyn-item__more').appendChild(cancle);
                    cancle.addEventListener('click', () => {
                        setTimeout(() => {
                            document.querySelector('.bili-modal__button.confirm').click()
                        }, 500)
                    })
                }
            }

            // cancle.setAttribute('style', 'left: -69px; top: 16px; width: 94px; z-index: 2010; border-radius: 8px; box-shadow: rgba(106, 115, 133, 0.12) 0px 11px 12px 0px; cursor: default;');
            // cancle.setAttribute('data-modal', '')
            //bili-dyn-more__menu__item


        });
    });
    // }

    // Your code here...
})();

// #float_button {
//     position: fixed;/*表示在窗口固定*/
//         right: 0px;/*距窗口右侧是0px，这个看具体需求*/
//         bottom: 0px;/*距窗口底部是0px，这个看具体需求*/
//         z-index: 99;/*优先级略高，防止其他元素覆盖，看需求*/
//         background: #333;
//         color: white;
//         padding: 16px 24px;
//         width: 120px;
//         height: 50px;
//         border-radius: 5px;
//         text-align: center;
//         line-height: 25px;
//         }