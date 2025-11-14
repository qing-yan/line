let black_upname_str = JSON.parse(localStorage.getItem('black_upname'));
let black_up_div = document.createElement('div');
function start() {
    //等待页面加载完毕
    window.onload = function () {
        //打印标记
        console.log('B站动态列表稍后再看按钮扩大并自动加入脚本已加载');
        //添加标记动态
        add_tag();
        var button = addButton('稍后再看', '500px')
        //添加监听功能
        button.addEventListener('click', () => {
            // 调用删除函数，可能用于清理或重置某些状态
            delete_func(button);
            // 设置一个定时器，等待500毫秒后执行添加函数
            // 这里可能需要一点时间间隔以确保某些操作完成或状态更新
            setTimeout(() => {
                // 调用添加函数，传入button作为参数
                // 此操作可能是在状态重置或界面更新后，重新启用或显示某个按钮
                add_func(button);

            }, 500);
        });

        updateBlackUpList();
        createBlackUpDiv(black_upname_str);
    };
}
function add_func(button) {
    var num = 0;
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
    });
    button.innerText = `稍后再看+${num}`;
};
async function delete_func(button) {
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
        //
        var upname_div = element.querySelector('div.bili-dyn-title');
        if (upname_div == null) {
            //懒加载原因可能为空，所以跳过
            continue;
        }
        //获取up主名字
        var upname = upname_div.innerText;
        //如果up主在黑名单中
        if (black_upname.indexOf(upname) != -1) {
            //获取动态时间描述等，如果是视频动态或动态视频
            let text = element.querySelector('.bili-dyn-item__desc').innerText
            // 1. 提取关键词到数组（语义化命名，便于后续维护）
            const videoPublishKeywords = ['投稿了视频', '发布了动态视频'];
            // 2. 用some()简化“任意关键词匹配”逻辑（比多个indexOf更直观）
            const isVideoPublishText = videoPublishKeywords.some(keyword => text.includes(keyword));
            // 3. 条件判断（逻辑清晰，注释说明业务目的）
            if (isVideoPublishText) {
                count_bu += 1; // 累加“视频发布类动态”计数
                element.remove(); // 删除该视频发布动态元素
            }
            //获取动态内容
            text = element.querySelector('.bili-dyn-item__body').innerText
            //检查是否为抽奖动态
            if (!text.includes('奖')) { // 若文本不包含"奖"字
                element.remove(); // 删除当前动态元素
            } else {
                //增加记录抽奖
                let bili_dyn_action = element.querySelector('.bili-dyn-action.forward');//获取转发按钮
                console.log(`获取到${upname}动态的转发按钮`);
                //获取奖字及附近的内容
                let prizeText = text.split('奖')[1].trim(); // 提取"奖"后的内容并去首尾空格
                console.log(`${upname}动态内容:奖${prizeText}`);
                if (bili_dyn_action != null) {
                    let yi_dian = JSON.parse(sessionStorage.getItem('yi_dian'));
                    if (yi_dian == null) {
                        yi_dian = [];
                    }
                    if (yi_dian.indexOf(upname) == -1) {
                        //点击转发按钮，打开转发窗口
                        bili_dyn_action.click();
                    }
                    yi_dian.push(upname)
                    sessionStorage.setItem('yi_dian', JSON.stringify(yi_dian));
                    await new Promise((resolve, reject) => {
                        setTimeout(() => {
                            let publish_btn = element.querySelector('.bili-dyn-forward-publishing__action__btn');
                            if (publish_btn != null) {
                                // 保存需要在事件处理程序中使用的值
                                const btnText = publish_btn.innerText;
                                const userName = upname;
                                publish_btn.addEventListener('click', () => {
                                    console.log(`已参与并记录【${userName}】的抽奖`);
                                    updateBlackUpCountTime(userName);
                                });
                            }
                            resolve();
                        }, 500);
                    })

                }
            }
        }
    }
    button.innerText += `-${count_zb}-${count_bu}`;
};

/**
 * 添加标记动态功能
 * 创建一个"添加标记动态"的按钮，点击后自动在动态发布框中插入分隔符并发布
 */
function add_tag() {
    var ddt = addButton('添加标记动态', '200px');
    ddt.addEventListener('click', () => {
        console.log('添加标记动态');
        const inputElement = document.querySelector('.bili-rich-textarea__inner')
        inputElement.focus();
        // 检查事件冒泡和捕获
        inputElement.addEventListener('input', (event) => {
            console.log('Input event triggered:', event);
        });
        setTimeout(() => {
            const characters = '========================================================'
            inputElement.innerText = characters;
            inputElement.dispatchEvent(new Event('input', { bubbles: true }));
            console.log(inputElement.innerText + '222')
        }, 500);
        setTimeout(() => {
            document.querySelector('.bili-dyn-publishing__action.launcher').click();
        }, 500);
        setTimeout(() => {
            //隐藏按钮
            ddt.style.display = 'none';
        }, 500);
    });
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
//将黑名单内容存储或更新到localStorage中
function updateBlackUpList() {
    //将黑名单内容存储到localStorage中
    let black_upname = getData();
    //检查localStorage是否存储了黑名单内容
    if (!black_upname_str || black_upname_str.length == 0) {
        //修改为name,count,time格式
        black_upname = black_upname.map(name => ({ name, count: 0, time: 0 }));
        localStorage.setItem('black_upname', JSON.stringify(black_upname));
        console.log(`updateBlackUpList:已初始化黑名单，函数已返回`);
        return;
    }

    //检查是否有更新的黑名单内容
    if (black_upname.length == black_upname_str.length) {
        console.log(`updateBlackUpList:黑名单内容无变化，函数已返回`);
        return;
    }
    //更新黑名单内容
    black_upname.forEach(item => {
        // 在已存储的黑名单中查找同名的up主
        let index = black_upname_str.findIndex(up => up.name == item);
        if (index == -1) {
            // 如果未找到，将其添加到黑名单中
            black_upname_str.push({ name: item, count: 0, time: 0 });
        }
    });
    localStorage.setItem('black_upname', JSON.stringify(black_upname_str));

}
//更新黑名单内容中的count和time
function updateBlackUpCountTime(upname) {
    //更新黑名单内容中的count和time
    black_upname_str.forEach(item => {
        if (item.name == upname) {
            item.count += 1;
            item.time = new Date().toLocaleDateString();
        }
    });
    localStorage.setItem('black_upname', JSON.stringify(black_upname_str));
    black_up_div.innerText = black_upname_str.map(item => `${item.name} ${item.count} ${item.time}`).join('\n');
}
//创建一个div，用于显示黑名单内容
function createBlackUpDiv() {
    //排序，按time倒序排序
    black_upname_str.sort((a, b) => new Date(b.time) - new Date(a.time));
    //设置div的文本内容，name,count,time
    black_up_div.innerText = black_upname_str.map(item => `${item.name} ${item.count} ${item.time}`).join('\n');
    //设置div的样式，位于网页右侧居中
    black_up_div.style.position = 'fixed';
    black_up_div.style.top = '50px';
    black_up_div.style.right = '10px';
    black_up_div.style.zIndex = '9999';
    //修改border
    black_up_div.style.borderRadius = '5px';
    black_up_div.style.border = '1px solid #ccc';
    black_up_div.style.padding = '10px';
    black_up_div.style.fontSize = '16px';
    black_up_div.style.cursor = 'pointer';
    //添加滚动条
    black_up_div.style.overflowY = 'auto';
    //将div添加到网页中
    document.body.appendChild(black_up_div);
}