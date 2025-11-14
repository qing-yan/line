//处理黑名单业务
function black(dyn) {
    //获取动态文本内容
    text = dyn.querySelector('.bili-dyn-item__body').innerText
    if (!text.includes('奖')) { // 若文本不包含"奖"字
        dyn.remove(); // 删除当前动态
        return false;
    }
    return true;
}