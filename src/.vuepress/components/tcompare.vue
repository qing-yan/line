<template>
    <el-input v-model="leftMsg" :rows="10" type="textarea" placeholder="" style="width: 50%"/>
    <el-input v-model="rightMsg" :rows="10" type="textarea" placeholder="" style="width: 50%"/>
    <el-button @click="decode">解析并复制</el-button>
    <el-card >
        <h5>相同部分</h5>
        <div>{{ commonMsg }}</div>
    </el-card>
    <el-card >
        <h5>左侧独有</h5>
        <div>{{ leftAlone }}</div>
    </el-card>
    <el-card >
        <h5>右侧独有</h5>
        <div>{{ rightAlone }}</div>
    </el-card>
</template>
<script>
export default {
    data() {
        return {
            leftMsg: '',
            rightMsg: '',
            commonMsg: '',
            leftAlone: '',
            rightAlone: '',
        }
    },
    methods: {
        //解析
        decode() {
            this.leftMsg = this.leftMsg.replaceAll(' ', '')
            this.rightMsg = this.rightMsg.replaceAll(' ', '')
            var l = this.leftMsg.split('\n')
            var r = this.rightMsg.replace(' ', '').split('\n')
            this.commonMsg = l.filter(e => r.indexOf(e) > -1)
            this.leftAlone = l.filter(e => r.indexOf(e) == -1)
            this.rightAlone = r.filter(e => l.indexOf(e) == -1)

        },
        copy() {
        }
    }
}
</script>
<style scoped>

</style>