// ==UserScript==
// @name         猫国建设者作弊脚本
// @namespace    http://tampermonkey.net/
// @version      2024-03-10
// @description  try to take over the world!
// @author       You
// @match        https://likexia.gitee.io/cat-zh/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gitee.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //等待页面加载
    window.onload = () => {
        createTopButton();


    };
    // Your code here...
})();

/**
 * 创建顶层按钮
 */
function createTopButton() {
    var topButton = document.createElement("button");
    /**
     * - `temporalFlux`: 时间流量，表示某种时间流动的资源。
- `relic`: 遗迹，可能是指某个历史时期遗留下来的珍贵物品或技术。
- `antimatter`: 反物质，一种具有强大能量的物质，通常用于能源和核能研究。
- `catnip`: 猫薄荷，一种植物，可能与游戏角色有关。
- `mint`: 薄荷，一种植物，可能与游戏角色有关。
- `wood`: 木材，一种常见的建筑材料。
- `minerals`: 矿物，可能是指游戏中的矿石资源。
- `coal`: 煤炭，一种燃料资源。
- `iron`: 铁，一种金属资源。
- `gold`: 黄金，一种贵重的金属资源。
- `science`: 科学，可能是指游戏中的科技资源。
- `culture`: 文化，可能是指游戏中的文化资源。
- `faith`: 信仰，可能是指游戏中的信仰资源。
- `furs`: 毛皮，一种动物资源。
- `ivory`: 象牙，一种珍贵的动物资源。
- `spice`: 香料，一种用于烹饪的调味料。
- `unicorns`: 独角兽，一种传说中的神奇生物。
- `paragon`: 圣殿，可能是指游戏中的神圣建筑。
- `beam`: 光束，一种强大的能量源。
- `slab`: 石板，一种常见的建筑材料。
- `plate`: 板片，一种常见的建筑材料。
- `steel`: 钢铁，一种常见的金属材料。
- `scaffold`: 脚手架，一种用于搭建建筑的工具。
- `parchment`: 羊皮纸，一种用于书写的纸张。
- `manuscript`: 手稿，一种记录文字的文件。
- `compedium`: 百科全书，一种收集知识的书籍。
- `blueprint`: 蓝图，一种设计图纸。
- `tears`: 眼泪，一种情感表达的方式。
- `starchart`: 星图，一种显示天空中星星位置的图表。
- `titanium`: 钛，一种高强度的合金材料。
- `oil`: 石油，一种常见的能源资源。
- `uranium`: 铀，一种放射性元素，常用于核能研究。
- `alloy`: 合金，一种混合了两种或多种金属的材料。
- `rocket`: 火箭，一种用于发射的装置。
- `unobtainium`: 难得素，一种无法通过正常途径获得的稀有物品。
- `timeCrystal`: 时间水晶，一种可以影响时间的神秘物体。
- `kerosene`: 煤油
- `void` : 虚空
- `relic`: 遗物
- `paragon`: 领导力
     */
    topButton.innerHTML = "一键999999999";
    topButton.style.position = "fixed";
    topButton.style.top = "10px";
    topButton.style.left = "10px";
    topButton.style.zIndex = "9999";
    topButton.addEventListener("click", function() {

        var e = gamePage.resPool
        e.get("catnip").value = 999999999
        e.get("wood").value = 999999999
        e.get("minerals").value = 999999999
        e.get("coal").value = 999999999
        e.get("iron").value = 999999999
        e.get("gold").value = 999999999
        e.get("science").value = 999999999
        e.get("culture").value = 999999999
        e.get("faith").value = 999999999
        e.get("furs").value = 999999999
        e.get("ivory").value = 999999999
        e.get("spice").value = 999999999
        e.get("unicorns").value = 999999999
        e.get("blueprint").value = 999999999
        e.get("tears").value = 999999999
        e.get("starchart").value = 999999999
        e.get("titanium").value = 999999999
        e.get("unobtainium").value = 999999999
        e.get("uranium").value = 999999999
        e.get("relic").value = 999999999
        e.get("oil").value = 999999999
    })
    document.body.appendChild(topButton);

}