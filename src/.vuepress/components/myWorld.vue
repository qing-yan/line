<template>
    <el-row :gutter="10" ref="mainData">
        <!-- 标签 -->
        <el-col :span="24">
            
            <el-tag size="small" v-for="(item, j) in tags" :key="j" style="margin: 0px 5px 5px 0px; cursor: pointer;" @click="clickTag(item)" :type="selectedTag === item ? 'success' : ''">{{item}}</el-tag>
        </el-col>
        <!-- 主体 -->
        <el-col v-for="(item, index) in readyEvents" :key="index">
            <a :href="item.url == '' ? null : item.url" target="_blank">
                <span>{{index + 1 + ". " + item.address + ' ' + item.event}}</span>
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
            events: [
                {date: '2024-5-1', address: '广东', event: '梅大高速塌方事件', url: '', tag: ['事故'], remark: '48人死亡'},
                {date: '2024-4', address: '重庆', event: '胖猫跳江自杀事件', url: '', tag: ['女权'], remark: ''},
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
           this.readyEvents = JSON.parse(JSON.stringify(this.events))
           //初始化标签
           const set = new Set()
           this.events.forEach(item => item.tag.forEach(ingr => set.add(ingr)))
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