<template>
    <el-row :gutter="10" ref="mainData">
        <!-- 标签 -->
        <el-col :span="24">
            
            <el-tag size="small" style="margin: 0px 5px 5px 0px; cursor: pointer;" @click="clickTag('推荐')" :type="selectedTag === '推荐' ? 'success' : ''">推荐</el-tag>
            <el-tag size="small" v-for="(item, j) in tags" :key="j" style="margin: 0px 5px 5px 0px; cursor: pointer;" @click="clickTag(item)" :type="selectedTag === item ? 'success' : ''">{{item}}</el-tag>
        </el-col>
        <!-- 主体 -->
        <el-col v-for="(item, index) in readyMenu" :key="index">
            <a :href="urlPre + item.url" target="_blank">
                <span>{{index + 1 + ". " + item.name}}</span>
                <el-badge v-if="item.recommend" value="荐"></el-badge>
            </a>
            <span>：{{ item.remark }}</span>
        </el-col>
    </el-row>
</template> 
<script>
export default {
    data() {
        return {
            urlPre: 'https://www.bilibili.com/video/',
            menu: [
                /*

                */
                {name: '炝炒莲白', url: 'BV1Qx4y1r7F5', ingredients: ['莲白'], recommend: false, remark: ''},
                {name: '老汤卤肉', url: 'BV1kF4m1M7P3', ingredients: ['卤菜'], recommend: false, remark: '主要讲卤水复用技巧'},
                {name: '乱炖', url: 'BV13F4m1M7Y1', ingredients: ['白菜', '豆腐', '猪肉', '火腿', '香菇', '胡萝卜'], recommend: false, remark: ''},
                {name: '盘龙茄子', url: 'BV1k642137yh', ingredients: ['茄子'], recommend: false, remark: ''},
                {name: '粉蒸羊肉', url: 'BV1qy421a7wt', ingredients: ['羊肉'], recommend: false, remark: ''},
                {name: '椒麻鸡', url: 'BV1Y6421g73p', ingredients: ['鸡肉'], recommend: false, remark: ''},
                {name: '风味茄子', url: 'BV1Xy421a7Gn', ingredients: ['茄子'], recommend: false, remark: ''},
                {name: '辣卤', url: 'BV1jC4y1e7TK', ingredients: ['卤菜'], recommend: false, remark: ''},
                {name: '洋芋擦擦', url: 'BV1DZ4y1J7wQ', ingredients: ['土豆', '猪肉'], recommend: false, remark: '需要面粉，洋葱，辣椒'},
                {name: '白卤肘子', url: 'BV1Te411J7uz', ingredients: ['猪肘'], recommend: false, remark: ''},
                {name: '炸肉丸', url: 'BV1Je411J7z8', ingredients: ['猪肉'], recommend: false, remark: ''},
                {name: '包子', url: 'BV1t5411i73R', ingredients: ['面粉'], recommend: false, remark: ''},
                {name: '卤牛肉', url: 'BV1YT4y1h7kf', ingredients: ['牛肉'], recommend: false, remark: '香砂3g，桂皮4g，小茴香8g，干姜5g，白芷4g，花椒4g，荜拨3g，草果1个，肉蔻3个，丁香1g，山楂3g'},
                {name: '馒头', url: 'BV1CQ4y1j7or', ingredients: ['面粉'], recommend: true, remark: '需要酵母菌'},
                {name: '酸菜白肉', url: 'BV1MK4y1z7fw', ingredients: ['猪肉', '酸菜'], remark: '新鲜猪五花水煮后切片与酸菜一起煮'},
                {name: '国宴小笼牛肉', url: 'BV1Ce411v7z5', ingredients: ['牛肉'], remark: '粉蒸牛肉，需要荷叶'},
            ],
            readyMenu: [],
            tags: [],
            selectedTag: '',
        
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
           this.readyMenu = JSON.parse(JSON.stringify(this.menu))
           //初始化食材标签
           const set = new Set()
           this.menu.forEach(item => item.ingredients.forEach(ingr => set.add(ingr)))
           this.tags = Array.from(set).sort()
        },
        //点击标签时实现选择/取消选择
        clickTag(tag) {
            //选择推荐标签
            if (tag === '推荐') {
                //如果之前已经选中，则取消选中，否则选中，同时更新菜单
                if (this.selectedTag === '推荐') {
                    this.selectedTag = ''
                    this.readyMenu = this.menu
                } else {
                    this.selectedTag = '推荐'
                    this.readyMenu = this.menu.filter(item => item.recommend)
                }
                return
            }
            //确定新的标签，如果之前已经选中，则取消选中，否则选中，同时更新菜单
            if (this.selectedTag === tag) {
                this.selectedTag = ''
                this.readyMenu = this.menu
            } else {
                this.selectedTag = tag
                const temp = []
                //根据标签筛选菜单
                this.menu.forEach(item => {
                    if (item.ingredients.indexOf(tag) !== -1) {
                        temp.push(item)
                    }
                })
                this.readyMenu = temp
            }
        },
    }
}
</script>
<style scoped>
/* 解决布局混乱的问题 */
.el-row{
    display:flex;
    flex-wrap: wrap;
}
</style>