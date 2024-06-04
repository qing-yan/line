// ==UserScript==
// @name         稍后再看数据统计
// @namespace    http://tampermonkey.net/
// @version      2
// @description  try to take over the world!
// @author       You
// @match        https://www.bilibili.com/watchlater/*
// @require      file://D:/workspace/work/tampermonkey/publicFunctions.js
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
    ftdhms = '',
    ftdtime = 0;
var data = {};
(function() {
    'use strict';
    // Your code here...
    window.onload = () => {
        func1();
        func2();
    };
})();
/**
 * 时长信息统计
 */
function func2() {
    //添加面板
    var div = addDiv(document);
    initData();
    //每秒统计一次
    setInterval(() => {
        var videos = getVideos();
        //如果数量不变则返回
        if (data.video_count_1 == videos.length) {
            return
        }
        //重置部分数据
        data.total_time_1 = 0;
        data.dp = 0;
        data.sx = 0;
        //是否首次执行
        var first = data.video_count_0 == 0;
        //数据统计
        videos.forEach(video => {
            statistical(video)
        });
        //数据记录
        data.video_count_1 = videos.length;
        if (first) {
            data.video_count_0 = data.video_count_1;
            data.total_time_0 = data.total_time_1;
        }
        //更新信息
        setHtml(div);


    }, 1000)
}
/**
 * 更新面板信息
 * @param {数据容器} div 
 */
function setHtml(div) {
    var watched_time = data.total_time_0 - data.total_time_1;
    var watched_per = (watched_time / data.total_time_0 * 100).toFixed(2);
    div.innerText = `总计时长${time2date(data.total_time_0)}(${data.total_time_0}秒)
    剩余时长${time2date(data.total_time_1)}(${data.total_time_1}秒)(${100 - watched_per}%)
    观看时长${time2date(watched_time)}(${watched_time}秒)(${watched_per}%)
    多P视频${data.dp}
    失效视频${data.sx}
    平均时长${time2date(parseInt(data.total_time_1 / (data.video_count_1 - data.dp - data.sx)))}
    https://www.bilibili.com/video/${data.bv}
    `;
}
/**
 * 统计函数
 * @param {Element} e - 要统计的元素
 */
function statistical(e) {
    var span = e.querySelector('.corner');
    //处理多P视频
    if (span == null) {
        data.dp += 1
        return
    }
    //分离并统计分和秒
    var arr = span.innerHTML.split(':');
    //翻转数组
    arr.reverse();
    //处理失效视频            
    if (arr[0] == '已失效') {
        data.sx += 1
        return
    }
    //累加
    var h = arr[2] == null ? 0 : parseInt(arr[2]) * 3600
    var m = arr[1] == null ? 0 : parseInt(arr[1]) * 60
    var s = parseInt(arr[0])
    data.total_time_1 += h + m + s
};
/**
 * 为每一条视频添加操作按钮
 */
function func1() {
    var videos = getVideos();
    videos.forEach(e => {
        //------------设置【前置】按钮--------
        var qz = addButton(e, '前置');
        qz.addEventListener('click', () => {
                send(getAV(e), getCsrf());
                e.style.display = 'none'
            })
            //------------设置【BV】按钮--------
        var bv = addButton(e, 'BV');
        bv.addEventListener('click', () => {
            //获取并复制BV号
            data.bv = getBV(e);
            copy(data.bv);
        });
    })
}
/**
 * 初始化数据
 */
function initData() {
    data = {
        total_time_0: 0, //初始化时总时长，即网页加载时的总时长，单位秒
        total_time_1: 0, //实时总时长
        video_count_0: 0, //初始化时视频数量
        video_count_1: 0, //实时视频数量
        dp: 0, //多P视频数量
        sx: 0, //失效视频数量
        bv: '', //BV号
    };
}
/**
 * 发送请求
 * @param {AV号} aid 
 * @param {csrf} csrf 
 */
function send(aid, csrf) {
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
}
/**
 * 从cookie中获取csrf
 * @returns csrf
 */
function getCsrf() {
    var reg = /(?<=bili_jct=).*(?=; s)/;
    var csrf = reg.exec(document.cookie)[0];
    return csrf.substring(0, 32);
}
/**
 * 获取所有视频
 * @returns 视频列表
 */
function getVideos() {
    return document.querySelectorAll('.av-item.clearfix');
}
/**
 * 添加按钮
 * @param {视频元素} video 
 * @param {按钮文本} innerHTML 
 * @returns 返回按钮
 */
function addButton(video, innerHTML) {
    var b = document.createElement('button');
    b.innerHTML = innerHTML;
    b.setAttribute('style', 'margin-left: 40px')
    video.querySelector('.state').appendChild(b);
    return b;
}
/**
 * 获取BV号
 * @param {视频元素} video 
 * @returns BV号
 */
function getBV(video) {
    //获取视频链接
    var href = video.querySelector('.t').getAttribute('href')
        //获取bvid
    return href.substring(href.length - 12);
}
/**
 * 获取AV号
 * @param {视频元素} video 
 * @returns AV号
 */
function getAV(video) {
    return bv2av(getBV);
}
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

function time2date(time) {
    var h = parseInt(time / 3600)
    var m = parseInt(time / 60 % 60)
    var s = time % 60
    return `${h}时${m}分${s}秒`
}