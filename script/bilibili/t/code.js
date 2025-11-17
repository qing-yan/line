function start() {
    //等待页面加载完毕
    window.onload = function () {
        //打印标记
        console.log('B站动态列表稍后再看按钮扩大并自动加入脚本已加载');
        mark();
        var button = addButton('稍后再看', '500px')
        //获取up主黑名单
        let black_list = getData();
        //添加监听功能
        button.addEventListener('click', () => {
            //获取动态列表
            var dyn_list = document.querySelectorAll('.bili-dyn-list__item');
            //分流处理
            for (let index = 0; index < dyn_list.length; index++) {
                const dyn = dyn_list[index];
                //删除直播动态
                if (is_live(dyn)) {
                    dyn.remove();
                }
                if (is_black(dyn, black_list)) {
                    black(dyn);
                } else {
                    white(dyn);
                }
            }
        });
    };
}
/**
 * 判断动态是否为直播动态
 * @param {Element} element - 动态列表项元素
 * @returns {boolean} - 如果是直播动态则返回true，否则返回false
 */
function is_live(element) {
    var dyn_live = element.querySelector('.bili-dyn-time.fs-small');
    if (dyn_live != null) {
        if (dyn_live.innerText === '直播了' | dyn_live.innerText === '预约的直播') {
            return true;
        }
    }
    return false;
}
/**
 * 判断up主是否在黑名单中
 * @param {string} upname - up主名称
 * @param {Array<string>} black_list - 黑名单数组
 * @returns {boolean} - 如果up主在黑名单中则返回true，否则返回false
 */
function is_black(dyn, black_list) {
    var upname_div = dyn.querySelector('div.bili-dyn-title');
    if (upname_div == null) {
        //懒加载原因可能为空，所以跳过
        return false;
    }
    //获取up主名字
    var upname = upname_div.innerText;
    if (black_list.includes(upname)) {
        return true;
    }
    return false;
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