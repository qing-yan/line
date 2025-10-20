// ==UserScript==
// @name         动态快捷删除
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://space.bilibili.com/43450743/*
// @require      file://D:/workspace/work/tampermonkey/publicFunctions.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //等待页面加载
    window.onload = () => {
        out_del();
        check_time();
    }
})();
function check_time() {
    var myButton = floatButton('检查时间', document.body);
    // 设置按钮在页面中的位置
    myButton.style.top = '150px';
    myButton.style.left = '10px';
    // 改变按钮的背景色为天蓝色
    myButton.style.backgroundColor = '#87cefa';
    myButton.onclick = () => {
        var dt_list = document.querySelectorAll('.bili-dyn-list__item');
        for (var i = 0; i < dt_list.length; i++) {
            var dt_item = dt_list[i];
            if (!dt_item.innerText.includes('互动抽奖')) {
                continue;
            }
            if (dt_item.innerText.includes('已开奖') || dt_item.innerText.includes('距离开奖还有')) {
                continue;
            }
            var result = get_bili_lottery_svr(dt_item.querySelector('.dyn-card-opus.hide-border').getAttribute('dyn-id'));
            console.log(result);
            if (result != null && result != '') {
                result = JSON.parse(result);
                var lottery_time = result.data.lottery_time;
                var now = new Date().getTime() / 1000;
                var dt_content = dt_item.querySelector('.bili-rich-text__content');
                if (now > lottery_time) {
                    dt_content.innerText += '(已开奖)';
                } else {
                    dt_content.innerText += `(距离开奖还有${((lottery_time - now) / 3600 / 24).toFixed(2)}天)`;
                }
                console.log(dt_content.innerText);
            }
        }
    };
}
function get_bili_lottery_svr(business_id) {
    var business_id = business_id,
    business_type = '1',
    csrf = getCsrf(),
    web_location = '333.1330';
    // console.log('aaaaaaaaaa');
    return get_bili(`https://api.vc.bilibili.com/lottery_svr/v1/lottery_svr/lottery_notice?business_id=${business_id}&business_type=${business_type}&csrf=${csrf}&web_location=${web_location}`);
}
/**
 * 发送请求
 * @param {api} api 
 */
function get_bili(api) {
    var r = '';
    $.ajax(api, {
        type: 'GET',
        xhrFields: {
            withCredentials: true // 携带跨域cookie  //单个设置
        },
        headers: {
            cookie: document.cookie
        },
        data: {},
        success: function(result) {
            rr = result;
            console.log(rr);
        },
        error: function(err) {
            alert(err)
        }
    });
    console.log(r);
    return r;
}
function send(api, aid, csrf) {
    $.ajax(api, {
        type: 'GET',
        xhrFields: {
            withCredentials: true // 携带跨域cookie  //单个设置
        },
        headers: {
            cookie: document.cookie
        },
        data: {},
        success: function(result) {
            console.log(result);
        },
        error: function(err) {
            alert(err)
        }
    });
}

/**
 * 创建一个浮动按钮，用于批量删除动态。
 * 该函数首先创建一个蓝色的浮动按钮，并将其定位在页面的顶部左侧。
 * 当按钮被点击时，它将寻找所有类名为'bili-dyn-list__item'的元素，这些元素代表了动态项。
 * 对于每个动态项，它尝试找到一个删除按钮，并为这个删除按钮添加一个点击事件监听器。
 * 当删除按钮被点击时，模拟一个延迟的确认操作，以模拟用户手动确认删除。
 * 这个函数旨在提高用户批量删除动态的效率，通过自动化点击确认删除的步骤。
 */
function out_del() {
    // 创建一个浮动按钮并将其附加到页面主体上
    var myButton = floatButton('外置删除', document.body);
    // 设置按钮在页面中的位置
    myButton.style.top = '100px';
    myButton.style.left = '10px';
    // 改变按钮的背景色为天蓝色
    myButton.style.backgroundColor = '#87cefa';
    // 为按钮添加点击事件监听器
    myButton.addEventListener('click', () => {
        // 查找所有类名为'bili-dyn-list__item'的元素，这些代表了动态项
        var dtArr = document.querySelectorAll('.bili-dyn-list__item');
        // 遍历每个动态项
        for (let i = 0; i < dtArr.length; i++) {
            const dt = dtArr[i];
            // 尝试找到每个动态项中的删除按钮
            var sc = dt.querySelector('.bili-dyn-more__menu__item + div');
            // 如果删除按钮不存在，则跳过当前循环
            if (sc == null) {
                continue;
            }
            // 为删除按钮添加点击事件监听器,自动确认删除监听
            sc.addEventListener('click', () => {
                // 模拟一个延迟的确认操作，通过设置定时器
                setTimeout(() => {
                    // 找到确认按钮并模拟点击事件
                    document.querySelector('.bili-modal__button.confirm').click()
                }, 100);
            });
            //尝试将删除按钮移动到动态项的第一个子元素之前
            var fdiv = dt.querySelector('.bili-dyn-item__main');
            try {
                fdiv.insertBefore(sc, fdiv.firstChild)
            } catch (error) {
                // 如果出现错误，可能是动态项已被删除，打印错误信息
                console.log('遇到源动态被删除了')
            }
        }
    })
}