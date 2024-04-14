// ==UserScript==
// @name         稍后再看数据统计
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
//执行次数统计
var zhixingshu = 0;
var ftd = 0,
    ftdhms = '';
(function() {
    'use strict';
    window.onload = () => {
        var div = addDiv(document);
        //每5秒打印
        setInterval(() => {
            totalDuration = 0, duoP = 0, shixiao = 0;
            var items = document.querySelectorAll('.av-item.clearfix');
            //如果数量不变则返回
            if (items.length == count) {
                return
            }
            count = items.length;
            items.forEach(e => {
                //------------设置【前置】按钮--------
                addQZ(e);
                //---------------统计时长----------
                statistical(e);
            });
            //更新面板信息
            setHtml(div);
            //更新时长比例
            items.forEach(e => {
                var span = e.querySelector('.corner');
                //处理多P视频
                if (span == null) {
                    return
                }
                //分离并统计分和秒
                var arr = span.innerHTML.split(':');
                //翻转数组
                arr.reverse();
                //处理失效视频            
                if (arr[0] == '已失效') {
                    return
                }
                //累加
                var h = arr[2] == null ? 0 : parseInt(arr[2]) * 3600
                var m = arr[1] == null ? 0 : parseInt(arr[1]) * 60
                var s = parseInt(arr[0])
                s = h + m + s;
                //
                var t = e.querySelector('.t').innerHTML;
                if (zhixingshu != 0) {
                    //截取5位之后的内容
                    t = t.substring(5, t.length)
                }
                e.querySelector('.t').innerHTML = (s / totalDuration * 100).toFixed(2) + '%' + t;
            })
            zhixingshu += 1;
        }, 1000)
    };
    // Your code here...
})();
/**
 * 创建顶层浮动面板
 * @param {Object} document - 文档对象
 * @returns {Object} - 创建的浮动面板
 */
function addDiv(document) {
    //创建顶层浮动面板
    var div = document.createElement('div');
    //设置样式，位于网页左侧居中
    div.style.position = 'fixed';
    //底部距离
    div.style.bottom = '100px';
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
    //获取上次储存的总时长
    var ltd = localStorage.getItem('totalDuration');
    if (zhixingshu == 0) {
        ftd = totalDuration
        ltd = totalDuration
    }
    localStorage.setItem('totalDuration', totalDuration);
    //计算剩余百分比
    var percent = (totalDuration / ftd * 100).toFixed(2);
    //计算减少百分比
    var percent2 = ((ltd - totalDuration) / ftd * 100).toFixed(2);
    //设置文本内容
    var h = parseInt(totalDuration / 3600)
    var minute = parseInt(totalDuration / 60 % 60)
    var second = totalDuration % 60
    var totalDuration2 = parseInt(totalDuration / 1.5)
    var h2 = parseInt(totalDuration2 / 3600)
    var minute2 = parseInt(totalDuration2 / 60 % 60)
    var second2 = totalDuration2 % 60
    var countTemp = count - shixiao - duoP
    var pj = parseInt(totalDuration / countTemp)
    var ljz = pj - countTemp;
    if (zhixingshu == 0) {
        ftdhms = `${h}小时${minute}分钟${second}秒`
    }
    div.innerText = `总时长${ftdhms}
    剩余总时长${h}小时${minute}分钟${second}秒
    预计需${h2}小时${minute2}分钟${second2}秒
    多P视频${duoP}个
    已失效${shixiao}个
    ${countTemp}个视频平均时长${parseInt(pj / 60 % 60)}分${pj % 60}秒
    临界值${parseInt(ljz / 60 % 60)}分${ljz % 60}秒
    减少${percent2}%，剩余${percent}%`;
}
/**
 * 统计函数
 * @param {Element} e - 要统计的元素
 */
function statistical(e) {
    var span = e.querySelector('.corner');
    //处理多P视频
    if (span == null) {
        duoP += 1
        return
    }
    //分离并统计分和秒
    var arr = span.innerHTML.split(':');
    //翻转数组
    arr.reverse();
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
};
/**
 * bv号转av号
 * 代码来自：https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/misc/bvid_desc.md
 * @param {bv号} bvid 
 * @returns 
 */
function bv2av(bvid) {
    const XOR_CODE = BigInt(23442827791579);
    const MASK_CODE = BigInt(2251799813685247);
    const BASE = BigInt(58);
    const data = 'FcwAPNKTMug3GV5Lj7EJnHpWsx4tb8haYeviqBz6rkCy12mUSDQX9RdoZf';
    const bvidArr = Array.from(bvid);
    [bvidArr[3], bvidArr[9]] = [bvidArr[9], bvidArr[3]];
    [bvidArr[4], bvidArr[7]] = [bvidArr[7], bvidArr[4]];
    bvidArr.splice(0, 3);
    const tmp = bvidArr.reduce((pre, bvidChar) => pre * BASE + BigInt(data.indexOf(bvidChar)), BigInt(0));
    return Number((tmp & MASK_CODE) ^ XOR_CODE);
}
/**
 * 添加前置按钮
 * @param {视频元素} e 
 */
function addQZ(e) {
    if (zhixingshu == 0) {
        //重置储存的总时长
        localStorage.setItem('totalDuration', 0);
        //------------设置【前置】按钮--------
        var qz = document.createElement('button');
        qz.innerHTML = '前置'
        qz.setAttribute('style', 'margin-left: 40px')
        e.querySelector('.state').appendChild(qz)
        qz.addEventListener('click', () => {
            //获取bvid并转为aid
            var href = e.querySelector('.t').getAttribute('href')
            var bvid = href.substring(href.length - 12);
            var aid = bv2av(bvid);
            //从cookie中获取csrf
            var reg = /(?<=bili_jct=).*(?=; s)/
            var csrf = reg.exec(document.cookie)[0];
            csrf = csrf.substring(0, 32);
            //发送请求
            $.ajax('https://api.bilibili.com/x/v2/history/toview/add', {
                type: 'POST',
                xhrFields: {
                    withCredentials: true // 携带跨域cookie  //单个设置
                },
                headers: {
                    cookie: document.cookie
                },
                data: { aid: aid, jsonp: 'jsonp', csrf: csrf },
                success: function(result) {
                    console.log(result);
                },
                error: function(err) {
                    alert(err)
                }
            });
            e.style.display = 'none'
        });
    }
}