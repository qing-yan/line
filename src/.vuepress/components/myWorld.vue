<template>
    <el-row :gutter="10" ref="mainData">
        <!-- 标签 -->
        <el-col :span="24">
            
            <el-tag size="small" v-for="(item, j) in tags" :key="j" style="margin: 0px 5px 5px 0px; cursor: pointer;" @click="clickTag(item)" :type="selectedTag === item ? 'success' : ''">{{item}}</el-tag>
        </el-col>
        <!-- 主体 -->
        <el-col v-for="(item, index) in readyEvents" :key="index">
            <span>{{index + 1 + ". " + item.date + ' ' + item.address + ' '}}</span>
            <a v-if="item.url != ''" :href="item.url" target="_blank">
                <span>{{item.event}}</span>
            </a>
            <span v-else>{{item.event}}</span>
            <span>：{{ item.remark }}</span>
            <el-tag size="small" v-for="(item, j) in item.tag" :key="j" style="margin: 0px 5px 5px 0px; cursor: pointer;" @click="clickTag(item)" :type="selectedTag === item ? 'success' : ''">{{item}}</el-tag>
        </el-col>
    </el-row>
</template> 
<script>
export default {
    data() {
        return {
            events: [
                {date: '2024', event: '', address: '', url: '', tag: [''], remark: ''},
                {date: '2024', event: '琼瑶去世', address: '', url: '', tag: [''], remark: ''},
                {date: '2024', event: '阿里血槽事件', address: '', url: '', tag: [''], remark: ''},
                {date: '2024', event: '姜萍事件', address: '', url: '', tag: [''], remark: ''},
                {date: '2024', event: '特朗普当选', address: '', url: '', tag: [''], remark: ''},
                {date: '2024', event: '云浩止耕事件', address: '内蒙古', url: '', tag: [''], remark: ''},
                {date: '2024', event: '淀粉肠事件', address: '', url: '', tag: [''], remark: ''},
                {date: '2024', event: '油罐车混装食用油事件', address: '', url: '', tag: [''], remark: ''},
                {date: '2024-09-00', address: '网络', event: '三只羊月饼', url: '', tag: ['网红'], remark: ''},
                {date: '2024-0-0', address: '', event: '松哥打假良品铺子事件', url: '', tag: ['社会'], remark: ''},
                {date: '2024-0-0', address: '', event: '松哥打假良品铺子事件', url: '', tag: ['社会'], remark: ''},
                {date: '2024-0-0', address: '', event: '京东请杨笠事件', url: '', tag: ['社会'], remark: ''},
                {date: '2024-09-0', address: '网络', event: '三只羊月饼', url: '', tag: ['网红'], remark: ''},
                {date: '2024-0-0', address: '', event: '骑行碾压事件', url: '', tag: ['社会'], remark: ''},
                {date: '2024-0-0', address: '', event: '民警救轻生女子牺牲', url: 'https://www.bilibili.com/video/BV1d2421d7ud', tag: ['社会'], remark: ''},
                {date: '2024-0-0', address: '', event: '九鼎大厦火灾', url: '', tag: ['事故'], remark: ''},
                {date: '2024-0-0', address: '', event: '崂山路虎女', url: '', tag: ['社会'], remark: ''},
                {date: '2024-06-09', address: '成都', event: '女子被女住户当保安面杀害', url: 'https://www.bilibili.com/video/BV1xi421i748', tag: ['女权'], remark: '需结合其他事件看[我们没要你救](https://www.bilibili.com/video/BV1Su4m1M7fr)'},
                {date: '2024-05-03', address: '河南', event: '河南大学大礼堂失火', url: 'https://www.bilibili.com/video/BV1GJ4m1n7ej', tag: ['事故'], remark: '全国文保'},
                {date: '2024-05-01', address: '广东', event: '梅大高速塌方事件', url: '', tag: ['事故'], remark: '48人死亡'},
                {date: '2024-04-27', address: '江西', event: '王婆相亲觉醒姐事件', url: '', tag: ['女权'], remark: ''},
                {date: '2024-04-11', address: '重庆', event: '胖猫跳江自杀事件', url: '', tag: ['女权'], remark: ''},
                {date: '2024-04-00', address: '中国', event: '猫一杯秦朗法国丢作业事件', url: '', tag: ['网红'], remark: ''},
                {date: '2024-03-28', address: '江西', event: '提灯定损事件', url: '', tag: ['社会'], remark: ''},
                {date: '2023-12-11', address: '死亡', event: '周海媚去世', url: '', tag: ['死亡'], remark: ''},
                {date: '2023-10-07', address: '世界', event: '巴以冲突', url: '', tag: ['战争'], remark: ''},
                {date: '2023-08-24', address: '日本', event: '日本福岛核污水排海', url: '', tag: ['其他'], remark: ''},
                {date: '2023-06-11', address: '成都', event: '成都地铁污蔑偷拍事件', url: 'https://www.bilibili.com/video/BV17t421K7G1', tag: ['女权'], remark: ''},
                {date: '2023-06-07', address: '广州', event: '川大学生张薇污蔑偷拍事件', url: '', tag: ['女权'], remark: ''},
                {date: '2023-03-29', address: '无锡', event: '女童母亲诉蛋糕店老板猥亵事件', url: 'https://www.bilibili.com/video/BV18s421K7kS', tag: ['女权'], remark: ''},
                {date: '2022-12-07', address: '中国', event: '新冠结束', url: '', tag: ['天灾'], remark: ''},
                {date: '2022-07-08', address: '日本', event: '首相安倍晋三被枪击身亡', url: 'https://www.bilibili.com/video/BV1s94y1X7jH', tag: ['政治'], remark: ''},
                {date: '2022-02-24', address: '世界', event: '俄乌战争', url: '', tag: ['战争'], remark: ''},
                {date: '2022-02-00', address: '北京', event: '谷爱凌', url: 'https://www.bilibili.com/video/BV1Nr421g7ht', tag: ['社会'], remark: '北京冬奥会'},
                {date: '2021-08-31', address: '西安', event: '地铁保安拖拽女子下车事件', url: '', tag: ['女权'], remark: '此事很好地告诉我们保安没有执法权，回旋镖在2024年6月9日'},
                {date: '2020-11-00', address: '理塘', event: '丁真', url: '', tag: ['社会'], remark: ''},
                {date: '2019-12-18', address: '武汉', event: '新冠', url: '', tag: ['天灾'], remark: '李文亮医生'},
                {date: '2018-06-23', address: '中国', event: '天临元年', url: 'https://www.bilibili.com/video/BV1oC411J7sW', tag: ['事故', '世界'], remark: ''},
                {date: '2018-06-23', address: '泰国', event: '洞穴救援事件', url: 'https://www.bilibili.com/video/BV1oC411J7sW', tag: ['事故', '世界'], remark: ''},
                {date: '2017-07-04', address: '中国', event: '贾跃亭下周回国', url: '', tag: ['社会'], remark: ''},
                {date: '2016-04-12', address: '网络', event: '魏则西事件', url: '', tag: ['事故'], remark: ''},
                {date: '2011-07-23', address: '温州', event: '动车事故', url: '', tag: ['事故'], remark: ''},
				{date: '2011-03-11', address: '日本', event: '日本福岛海啸导致核电站事故', url: '', tag: ['事故'], remark: ''},
                {date: '2010-09-27', address: '网络', event: '3Q大战', url: '', tag: ['社会'], remark: ''},
                {date: '2008-05-12', address: '四川', event: '汶川地震', url: '', tag: ['天灾'], remark: ''},
            ],
            readyEvents: [],
            tags: [],
            selectedTag: '',
        
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.readyEvents = this.events
            // this.readyEvents = JSON.parse(JSON.stringify(this.events))
            //初始化标签
            const set = new Set()
            this.events.forEach(item => item.tag.forEach(ingr => {
                set.add(ingr)
            }))
            this.tags = Array.from(set).sort()
        },
        //点击标签时实现选择/取消选择
        clickTag(tag) {
            //确定新的标签，如果之前已经选中，则取消选中，否则选中，同时更新
            if (this.selectedTag === tag) {
                this.selectedTag = ''
                this.readyEvents = this.events
            } else {
                this.selectedTag = tag
                const temp = []
                //根据标签筛选
                this.events.forEach(item => {
                    if (item.tag.indexOf(tag) !== -1) {
                        temp.push(item)
                    }
                })
                this.readyEvents = temp
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