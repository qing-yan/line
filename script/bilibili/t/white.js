//处理非黑名单up动态
function white(dyn) {
    //获取bili-dyn-card-video，即视频组件
    var video = dyn.querySelector('.bili-dyn-card-video');
    //如果为空则不是视频动态，不为空才是
    if (video == null) {
        return false;
    }
    var but = video.querySelector('.bili-dyn-card-video__mark:not(.active)')
    if (but == null) {
        return false;
    }
    if (dyn.querySelector('.bili-dyn-content__orig:not(.reference)')) {
        but.click();
        //隐藏动态
        dyn.style.display = 'none';
        return true;
    }
    return false;
}
