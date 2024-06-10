// ==UserScript==
// @name         稍后再看数据统计V3
// @namespace    http://tampermonkey.net/
// @version      3
// @description  try to take over the world!
// @author       You
// @match        https://www.bilibili.com/watchlater/*
// @require      file://D:/workspace/work/tampermonkey/publicFunctions.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

var data = {};
(function() {
    'use strict';
    // Your code here...
    window.onload = () => {
        //修改footer
        modify_footer();
        //获取视频列表
        var videos = getVideos();
        var csrf = getCsrf();
        initData();
        videos.forEach(e => {
            var aid = getAV(e);
            //------------设置【前置】按钮--------
            var qz = addButton(e, '前置');
            qz.addEventListener('click', () => {
                send_add(aid, csrf);
                e.style.display = 'none'
            });
            //------------设置【BV】按钮--------
            var bv = addButton(e, 'BV');
            bv.addEventListener('click', () => {
                //获取并复制BV号
                data.bv = getBV(e);
                copy(data.bv);
            });
            //------------覆盖删除按钮事件--------
            get_video_info(e);
            var del = e.querySelector('i.btn-del.icon');
            del.onclick = () => {
                mark_up(e);
                update_up_list(null);
                //
                var span = e.querySelector('.corner');
                //处理多P视频
                if (span == null) {
                    data.dp -= 1
                } else {
                    //分离并统计分和秒
                    var arr = span.innerHTML.split(':');
                    arr.reverse();
                    //处理失效视频            
                    if (arr[0] == '已失效') {
                        data.sx -= 1
                    } else {
                        data.total_time_1 -= sum_time(arr);
                    }
                }
                data.video_count_1 -= 1;
    //
                update_videos_info();
                setTimeout(() => {
                    send_del(aid, csrf);
                }, 500);
            }
        });
        update_up_list(null);
        //数据记录
        data.video_count_1 = videos.length;
        data.video_count_0 = videos.length;
        data.total_time_0 = data.total_time_1;
        //更新信息
        update_videos_info();
    };
})();

/**
 * 修改footer
 */
function modify_footer() {
    var footer = document.querySelector('div.international-footer');
    //隐藏原有内容
    footer.querySelector('div.link-box.b-footer-wrap').style.display = 'none';
    footer.querySelector('div.partner.b-footer-wrap').style.display = 'none';
    //自定义footer
    var my_footer = document.createElement('div');
    //设置id
    my_footer.id = 'my_footer';
    my_footer.innerHTML = `
        <div id='videos_info' style='display: inline-block;'></div>
        <div id='up_list' style='display: inline-block;'></div>
    `;
    footer.appendChild(my_footer);
}
/**
 * 获取所有视频
 * @returns 视频列表
 */
function getVideos() {
    return document.querySelectorAll('.av-item.clearfix');
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
 * 获取AV号
 * @param {视频元素} video 
 * @returns AV号
 */
function getAV(video) {
    return bv2av(getBV(video));
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
 * 发送请求
 * @param {api} api 
 * @param {AV号} aid 
 * @param {csrf} csrf 
 */
function send(api, aid, csrf) {
    $.ajax(api, {
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
 * 发生添加请求
 * @param {*} aid 
 * @param {*} csrf 
 */
function send_add(aid, csrf) {
    send('https://api.bilibili.com/x/v2/history/toview/add', aid, csrf)
}
/**
 * 发生删除请求
 * @param {*} aid 
 * @param {*} csrf 
 */
function send_del(aid, csrf) {
    send('https://api.bilibili.com/x/v2/history/toview/del', aid, csrf)
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
 * 记录up主
 * @param {视频} video 
 */
function mark_up(video) {
    //获取up主，<a>标签
    var up = video.querySelector('a.user').innerText;
    //获取up主列表
    var up_list = localStorage.getItem('up_list');
    if (up_list == null) {
        up_list = '[]';
    }
    console.log(up_list);
    up_list = JSON.parse(up_list);
    //添加up主
    var up_local = up_list.find(e => e.name == up)
    if (up_local == null) {
        up_list.push({ name: up, count: 1, datatime: new Date().toLocaleDateString() });
    } else {
        //删除
        up_list.splice(up_list.indexOf(up_local), 1);
        up_local.count += 1;
        up_local.datatime = new Date().toLocaleDateString();
        up_list.push(up_local);
    }
    //更新up主列表
    localStorage.setItem('up_list', JSON.stringify(up_list));
}
/**
 * 更新footer信息
 * @param {*} up_list_div 
 * @returns 
 */
function update_up_list(up_list_div) {
    if (up_list_div == null) {
        up_list_div = document.querySelector('#up_list');
    }
    var up_list = localStorage.getItem('up_list');
    if (up_list == null) {
        return;
    };
    up_list = JSON.parse(up_list);
    //获取前10个up主，并反转排序
    var up_list_pre = up_list.slice(up_list.length - 10, up_list.length).reverse();
    var up_list_pre_str = up_list2str(up_list_pre);
    //获取后10个up主，并反转排序
    var up_list_last = up_list.slice(0, 10);
    var up_list_last_str = up_list2str(up_list_last);
    //更新footer
    up_list_div.innerHTML = `
    <div>
        <div style='display: inline-block;'>
            <span>最近更新up主列表</span>
            ${up_list_pre_str}
        </div>
        <div style='display: inline-block;'>
            <span>久未更新up主列表</span>
            ${up_list_last_str}
        </div>
    </div>
    `;
    console.log(up_list.innerHTML);
}
/**
 * 获取视频信息并储存
 * @param {*} video 
 * @returns 
 */
function get_video_info(video) {
    //时间加和
    var span = video.querySelector('.corner');
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
    data.total_time_1 += sum_time(arr);
}
/**
 * 时间加和
 */
function sum_time(arr) {
    var h = arr[2] == null ? 0 : parseInt(arr[2]) * 3600
    var m = arr[1] == null ? 0 : parseInt(arr[1]) * 60
    var s = parseInt(arr[0])
    return h + m + s
}
/**上林新桂年年发，不许平人折一枝。
 * 判断是否duoP或失效视频
 * @param {*} video 
 * @returns 
 */
function if_dp_sx(video) {
    //时间加和
    var span = video.querySelector('.corner');
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
    return arr;
}


/**
 * 更新面板信息
 */
function update_videos_info() {
    var div = document.querySelector('#videos_info');
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
    // div.innerText = `
    //     ${JSON.stringify(data)}
    // `
}


/**
 * up主列表转为字符串
 * @param {*} up_list 
 * @param {*} str 
 * @returns 
 */
function up_list2str(up_list) {
    var str = '';
    up_list.forEach(e => {
        str += `<div>${e.datatime} ${e.count} ${e.name}</div>`
    })
    return str;
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