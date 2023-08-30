<template>
    <el-button :type="mode === 'huji' ? 'success' : 'info'" @click="changeMode('huji')" style="margin-top: 5px; margin-bottom: 5px">户籍</el-button>
    <el-button :type="mode === 'other' ? 'success' : 'info'" @click="changeMode('other')" style="margin-top: 5px; margin-bottom: 5px">其他</el-button>
    <el-input v-model="excelData" :rows="10" type="textarea" placeholder=""/>
    <el-button type="primary" @click="decode" style="margin-top: 5px; margin-bottom: 5px">解析并复制</el-button>
    <el-card>{{ result }}</el-card>
</template>
<script>
import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            excelData: '',
            result: '',
            hujiSql: 'INSERT INTO \`people\` (\`town\`, \`village\`, \`old_village\`, \`group\`, \`house_num\`, \`house_master_relation\`, \`name\`, \`id_cade\`, \`gender\`, \`nation\`) VALUES ',
            otherSql: 'INSERT INTO `table` (cols) VALUES ',
            currentSql: '',
            mode: 'huji'//模式
        }
    },
    created () {
        this.changeMode('huji')
    },
    methods: {
        //解析
        decode() {
            //去除末尾的换行符
            if (this.excelData[this.excelData.length - 1] === "\n") {
                this.excelData = this.excelData.substring(0, this.excelData.length - 1)
            }
            //按行切片为数组
            let rows = this.excelData.split("\n")
            let valu = ''
            for(var i = 0; i < rows.length; i++){
                let cols = rows[i].split("\t")//继续切片为二维数组
                cols[6] = '\\\'' + cols[6]
                //组装语句
                valu += `('${cols[0]}','${cols[1]}','${cols[2]}','${cols[3]}','${cols[4]}','${cols[5]}','${cols[6]}','${cols[7]}','${cols[8]}','${cols[9]}')` + ','
            }
            valu = valu.substring(0, valu.length - 1)
            this.result = this.currentSql + valu
            this.copy()
        },
        copy() {
            navigator.clipboard.writeText(this.result).then(() => {
                ElMessage({
                    message: '复制成功',
                    type: 'success',
                })
            });
        },
        changeMode(mode){
            this.mode = mode
            if (mode === 'huji') {
                this.currentSql = this.hujiSql
            } else if (mode === 'other') {
                this.currentSql = this.otherSql
            }
        }
    }
}
</script>
<style scoped>

</style>