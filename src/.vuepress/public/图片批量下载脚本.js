// ==UserScript==
// @name         图片批量下载脚本
// @namespace    http://tampermonkey.net/
// @version      2024-06-28
// @description  try to take over the world!
// @author       You
// @match        https://bbs.nga.cn/read.php?tid=40679021
// @require      file://D:/workspace/work/tampermonkey/publicFunctions.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nga.cn
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    var my_button = floatButton("下载图片", document.body);
    my_button.addEventListener("click", function(){
        var img_list = document.querySelectorAll('table.forumbox.postbox span.postcontent.ubbcode img');
        var src_list = [];
        for (let index = 0; index < img_list.length; index++) {
            const img = img_list[index];
            if (img.src.includes("//img4") && img.src.includes("/smile/")) {
                console.log(img.src);
                continue;
            }
            if (img.src.includes("http")){
                src_list.push(img.src);
            }
        }
        
        console.log(src_list);
            
    })
})();

function downloadIamge(src, imgName){
    let image = new Image();
    image.src = src;
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = function() {
        let c = document.createElement("canvas");
        c.width = image.width;
        c.height = image.height;
        c.getContext("2d").drawImage(image, 0, 0, image.width, image.height);
        let a = document.createElement("a"); 
        a.download = imgName;
        a.href = c.toDataURL("image/png");
        a.click();
    }
}