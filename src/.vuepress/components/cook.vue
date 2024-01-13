<template>
    <el-row :gutter="10" ref="mainData">
        <!-- 标签 -->
        <el-col :span="24">
            <el-tag size="small" v-for="(item, j) in tags" :key="j" style="margin: 0px 5px 5px 0px; cursor: pointer;" @click="clickTag(item)" :type="selectedTag === item ? 'success' : ''">{{item}}</el-tag>
        </el-col>
        <!-- 主体 -->
        <el-col v-for="(item, index) in readyMenu" :key="index">
            <a :href="urlPre + item.url" target="_blank">
                <span>{{index + 1 + ". " + item.name}}</span>
            </a>
        </el-col>
    </el-row>
</template> 
<script>
export default {
    data() {
        return {
            urlPre: 'https://www.bilibili.com/video/',
            menu: [
                {name: '国宴小笼牛肉', url: 'BV1Ce411v7z5', ingredients: ['牛肉']},
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
            //确定新的标签
            if (this.selectedTag === tag) {
                this.selectedTag = ''
            } else {
                this.selectedTag = tag
            }
            //根据标签筛选内容
            if (this.selectedTag === '') {
                this.readyMenu = this.menu
            } else {
                const temp = []
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