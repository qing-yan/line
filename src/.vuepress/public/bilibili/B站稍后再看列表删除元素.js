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

//总时长，单位秒
var totalDuration = 0;
//视频数量
var count = 0;
//多P视频
var duoP = 0;
//已失效
var shixiao = 0;
(function() {
    'use strict';
    window.onload = () => {
            //首次标记
            var first = true
            var div = addDiv(document);
            //每5秒打印
            setInterval(() => {
                totalDuration = 0;
                duoP = 0;
                shixiao = 0;
                var items = document.querySelectorAll('.av-item.clearfix')
                count = items.length;
                for (let i = 0; i < items.length; i++) {
                    const e = items[i];
                    //删除按钮
                    if (first) {
                        var bb = document.createElement('button')
                        bb.innerHTML = '隐藏'
                        bb.setAttribute('style', 'margin-left: 40px')
                        e.querySelector('.state').appendChild(bb)
                        bb.addEventListener('click', () => {
                            e.style.display = 'none'
                        })
                        if (i == items.length - 1) {
                            first = false

                        }
                    }

                    //---------------统计时长----------
                    statistical(e)
                        //大舅妈200 二舅妈200 幺姨200 三姨200 四姨200 伯伯伯妈400
                }
                setHtml(div)
            }, 5000)
        }
        // Your code here...
})();
/**
 * 创建顶层浮动面板
 * @param {Object} document - 文档对象
 * @returns {Object} - 创建的浮动面板
 */
function addDiv(document) {
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
    //将面板添加到网页中
    document.body.appendChild(div)
    return div
}

function setHtml(div) {
    //设置文本内容
    const h = parseInt(totalDuration / 3600)
    const minute = parseInt(totalDuration / 60 % 60)
    const second = totalDuration % 60
    const totalDuration2 = parseInt(totalDuration / 1.5)
    const h2 = parseInt(totalDuration2 / 3600)
    const minute2 = parseInt(totalDuration2 / 60 % 60)
    const second2 = totalDuration2 % 60
    const countTemp = count - shixiao - duoP
    const pj = parseInt(totalDuration / countTemp)
    div.innerText = `总时长${h}小时${minute}分钟${second}秒
    预计需${h2}小时${minute2}分钟${second2}秒
    多P视频${duoP}个
    已失效${shixiao}个
    ${countTemp}个视频平均时长${parseInt(pj / 60 % 60)}分${pj % 60}秒
    `;
}
/**
 * 统计函数
 * @param {Element} e - 要统计的元素
 */
function statistical(e) {
    var span = e.querySelector('.corner')
        //处理多P视频
    if (span == null) {
        duoP += 1
        return
    }
    //分离并统计分和秒
    var arr = span.innerHTML.split(':')
        //翻转数组
    arr.reverse()
        //处理失效视频            
    if (arr[0] == '已失效') {
        shixiao += 1
        return
    }
    //累加
    var h = arr[2] == null ? 0 : parseInt(arr[2]) * 3600
    var m = arr[1] == null ? 0 : parseInt(arr[1]) * 60
    var s = parseInt(arr[0])
    totalDuration += h + m + s
}