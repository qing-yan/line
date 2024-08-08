// ==UserScript==
// @name         一键稍后再看
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://t.bilibili.com/*
// @require      file://D:/workspace/work/tampermonkey/blackUpList.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //等待页面加载完毕
    window.onload = function() {
        //打印标记
        console.log('B站动态列表稍后再看按钮扩大并自动加入脚本已加载');
        //屏蔽部分动态
        deleteDT();
        //获取上次添加时间
        var lastAddTime = new Date(Number(localStorage.getItem('lastAddTime')));
        if (lastAddTime != null) {
            addButton(`上次添加时间${lastAddTime.toLocaleString()}
            约${((new Date().getTime() - lastAddTime.getTime()) / 1000 / 3600).toFixed(1)}小时前`, '100px')
        }
        var button = addButton('稍后再看', '500px')
        var num = 0;
        //添加监听功能
        button.addEventListener('click', function() {
            //获取所有bili-dyn-list__item，即动态列表
            var dynList = document.querySelectorAll('.bili-dyn-list__item');
            dynList.forEach((dyn) => {
                //获取bili-dyn-card-video，即视频组件
                var dynVideo = dyn.querySelector('.bili-dyn-card-video');
                //如果为空则不是视频动态，不为空才是
                if (dynVideo != null) {
                    var but = dynVideo.querySelector('.bili-dyn-card-video__mark:not(.active)')
                    if (but != null) {
                        if (dyn.querySelector('.bili-dyn-content__orig:not(.reference)')) {
                            but.click();
                            //隐藏动态
                            dyn.style.display = 'none';
                            num += 1
                        }
                    }
                }
                // }
            });

            button.innerText = `稍后再看+${num}`;
            //本地储存添时间
            localStorage.setItem('lastAddTime', new Date().getTime());
        });
    };
})();

function deleteDT() {
    var ddt = addButton('删除冗余动态', '200px');
    ddt.addEventListener('click', function() {
        //获取up主黑名单
        var black_upname = getData();
        //获取动态列表
        var dynList = document.querySelectorAll('.bili-dyn-list__item');
        var count_zb = 0;
        var count_bu = 0;
        for (let index = 0; index < dynList.length; index++) {
            const element = dynList[index];
            //删除直播动态
            var dyn_zhi_bo = element.querySelector('.bili-dyn-time.fs-small');
            if (dyn_zhi_bo != null) {
                if (dyn_zhi_bo.innerText === '直播了' | dyn_zhi_bo.innerText === '预约的直播') {
                    count_zb += 1;
                    element.remove();
                    continue;
                }
            }
            //删除黑名单UP视频动态
            var upname_div = element.querySelector('div.bili-dyn-title');
            if (upname_div == null) {
                //懒加载原因可能为空，所以跳过
                continue;
            }
            //获取up主名字
            var upname = upname_div.innerText;
            //如果up主在黑名单中
            if (black_upname.indexOf(upname) != -1) {
                //如果是视频动态
                if (element.querySelector('.bili-dyn-item__desc').innerText.indexOf('投稿了视频') != -1) {
                    count_bu += 1;
                    //删除动态
                    element.remove();
                }
            }
        }
        console.log(`屏蔽直播动态${count_zb}条，屏蔽黑名单UP主视频动态${count_bu}条`);
    })
}

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
/**
 */
function addDiv(text) {
    //在网页最上层创建按钮
    var my_div = document.createElement('div');
    //设置按钮的文本内容
    my_div.innerText = text;
    //设置按钮的样式，位于网页左侧居中
    my_div.style.position = 'fixed';
    my_div.style.top = '65px';
    my_div.style.right = '10px';
    my_div.style.zIndex = '9999';
    //背景色天蓝色
    my_div.style.backgroundColor = '#87cefa';
    //修改border
    my_div.style.borderRadius = '5px';
    my_div.style.border = '1px solid #ccc';
    my_div.style.padding = '10px';
    my_div.style.fontSize = '16px';
    my_div.style.cursor = 'pointer';
    //将按钮添加到网页中
    document.body.appendChild(my_div);
    return my_div;
}