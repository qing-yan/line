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
            <el-tag size="small" v-for="(item, j) in item.tag" :key="j" style="margin: 0px 5px 5px 0px; cursor: pointer;" @click="clickTag(item)" :type="selectedTag === item ? 'success' : ''">{{item}}</el-tag>
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
                {name: '双椒蒸排骨', url: 'BV17J4m1g7NV', tag: ['排骨'], recommend: false, remark: ''},
                {name: '蒸肉丸', url: 'BV1Zm421P7qD', tag: ['猪肉', '萝卜'], recommend: false, remark: '需要木薯粉'},
                {name: '红烧肘子', url: 'BV1mi421U7Av', tag: ['猪肉', ], recommend: false, remark: ''},
                {name: '炸豆腐、快乐红薯、烤馒头、烤排骨、吐司虾滑、牛肉干', url: 'BV15C411n7vE', tag: ['豆腐', '排骨', '空气炸锅', ], recommend: false, remark: ''},
                {name: '蒸鸡蛋', url: 'BV1Xx4y1z7Sj', tag: ['鸡蛋'], recommend: false, remark: ''},
                {name: '醋炒蛋', url: 'BV14A4m1c7Gs', tag: ['鸡蛋'], recommend: false, remark: ''},
                {name: '番茄炖牛肉', url: 'BV1LE421u7Lr', tag: ['牛肉', '土豆', '番茄', '胡萝卜'], recommend: false, remark: ''},
                {name: '泡菜', url: 'BV1vv411173X', tag: ['泡菜'], recommend: false, remark: ''},
                {name: '泡菜', url: 'BV1B8411Z71Q', tag: ['泡菜'], recommend: false, remark: ''},
                {name: '泡鸡爪', url: 'BV1Lj421R72J', tag: ['鸡爪'], recommend: false, remark: ''},
                {name: '土豆炖牛肉', url: 'BV1Ej42197Bg', tag: ['牛肉', '土豆'], recommend: false, remark: ''},
                {name: '梅菜扣肉、炸鸡腿', url: 'BV1Hx421Q71Y', tag: ['猪肉', '鸡肉'], recommend: false, remark: '五花肉、鸡腿，用空气炸锅制作'},
                {name: '缠肘花', url: 'BV1AF4m157KB', tag: ['猪肉'], recommend: false, remark: '猪肘'},
                {name: '柠檬鸡爪', url: 'BV1WC411h73g', tag: ['鸡爪'], recommend: false, remark: ''},
                {name: '手撕鸡', url: 'BV1CP411k7gx', tag: ['鸡肉'], recommend: false, remark: ''},
                {name: '酱汁黄瓜', url: 'BV14z421R7rZ', tag: ['黄瓜'], recommend: false, remark: ''},
                {name: '番茄清炖牛肉', url: 'BV192421A78c', tag: ['牛肉', '番茄', '胡萝卜'], recommend: false, remark: '猪肉、排骨、鸡肉等也可这样做'},
                {name: '胭脂萝卜', url: 'BV1n2421M7xm', tag: ['萝卜'], recommend: false, remark: '洗澡泡菜'},
                {name: '皮蛋香菜抄手', url: 'BV1QD42177zZ', tag: ['猪肉', '皮蛋', '香菜'], recommend: false, remark: ''},
                {name: '小炒鸡、香辣花甲', url: 'BV1sy421i7wM', tag: ['鸡肉', '花甲'], recommend: false, remark: ''},
                {name: '泡菜', url: 'BV1sS421N7eS', tag: [], recommend: false, remark: '洗澡泡菜'},
                {name: '炝炒莲白', url: 'BV1Qx4y1r7F5', tag: ['莲白'], recommend: false, remark: ''},
                {name: '老汤卤肉', url: 'BV1kF4m1M7P3', tag: ['卤菜'], recommend: false, remark: '主要讲卤水复用技巧'},
                {name: '乱炖', url: 'BV13F4m1M7Y1', tag: ['白菜', '豆腐', '猪肉', '火腿', '香菇', '胡萝卜'], recommend: false, remark: ''},
                {name: '盘龙茄子', url: 'BV1k642137yh', tag: ['茄子'], recommend: false, remark: ''},
                {name: '粉蒸羊肉', url: 'BV1qy421a7wt', tag: ['羊肉'], recommend: false, remark: ''},
                {name: '椒麻鸡', url: 'BV1Y6421g73p', tag: ['鸡肉'], recommend: false, remark: ''},
                {name: '风味茄子', url: 'BV1Xy421a7Gn', tag: ['茄子'], recommend: false, remark: ''},
                {name: '辣卤', url: 'BV1jC4y1e7TK', tag: ['卤菜'], recommend: false, remark: ''},
                {name: '洋芋擦擦', url: 'BV1DZ4y1J7wQ', tag: ['土豆', '猪肉'], recommend: false, remark: '需要面粉，洋葱，辣椒'},
                {name: '白卤肘子', url: 'BV1Te411J7uz', tag: ['猪肘'], recommend: false, remark: ''},
                {name: '炸肉丸', url: 'BV1Je411J7z8', tag: ['猪肉'], recommend: false, remark: ''},
                {name: '包子', url: 'BV1t5411i73R', tag: ['面粉'], recommend: false, remark: ''},
                {name: '卤牛肉', url: 'BV1YT4y1h7kf', tag: ['牛肉'], recommend: false, remark: '香砂3g，桂皮4g，小茴香8g，干姜5g，白芷4g，花椒4g，荜拨3g，草果1个，肉蔻3个，丁香1g，山楂3g'},
                {name: '馒头', url: 'BV1CQ4y1j7or', tag: ['面粉'], recommend: true, remark: '需要酵母菌'},
                {name: '酸菜白肉', url: 'BV1MK4y1z7fw', tag: ['猪肉', '酸菜'], remark: '新鲜猪五花水煮后切片与酸菜一起煮'},
                {name: '国宴小笼牛肉', url: 'BV1Ce411v7z5', tag: ['牛肉'], remark: '粉蒸牛肉，需要荷叶'},
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
           this.menu.forEach(item => item.tag.forEach(ingr => set.add(ingr)))
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
                    if (item.tag.indexOf(tag) !== -1) {
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