<template>
    <el-input v-model="idcards" :rows="10" type="textarea" placeholder=""/>
    <el-button type="primary" @click="decode(0)" style="margin-top: 5px; margin-bottom: 5px">提取出生年份</el-button>
    <el-button type="primary" @click="decode(1)" style="margin-top: 5px; margin-bottom: 5px">提取出生年月日</el-button>
    <el-button type="primary" @click="decode(2)" style="margin-top: 5px; margin-bottom: 5px">提取性别</el-button>
    <el-button type="primary" @click="decode(3)" style="margin-top: 5px; margin-bottom: 5px">计算年龄</el-button>
    <el-card>{{ result }}</el-card>
</template>
<script>
import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            idcards: '',
            result: '',
        }
    },
    methods: {
        //解析
        decode(flag) {
            this.result = ''
            var idcardList = this.idcards.split('\n')
            idcardList.forEach(e => {
                if (flag === 0) {
                    var year = e.substring(6, 10)
                    this.result = this.result + year + '\n'
                } else if (flag === 1) {
                    var day = e.substring(6,14)
                    this.result = this.result + day + '\n'
                } else if (flag === 2) {
                    var gender = e.substring(16,17) % 2 == 0 ? '女' : '男'
                    this.result = this.result + gender + '\n'
                } else if (flag === 3) {
                    var age = new Date().getFullYear() - Number(e.substring(6, 10))
                    this.result = this.result + age + '\n'
                } 
            });
            this.copy(this.result)
        },
        copy(data) {
            navigator.clipboard.writeText(data).then(() => {
                ElMessage({
                    message: '复制成功',
                    type: 'success',
                })
            });
        }
    }
}
</script>
<style scoped>

</style>