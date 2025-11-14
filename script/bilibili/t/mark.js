//处理动态标记业务
function mark() {
    //添加标记动态
    var ddt = addButton('添加标记动态', '200px');
    ddt.addEventListener('click', () => {
        const inputElement = document.querySelector('.bili-rich-textarea__inner')
        inputElement.focus();
        setTimeout(() => {
            inputElement.innerText = '========================================================';
            inputElement.dispatchEvent(new Event('input', { bubbles: true }));
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


