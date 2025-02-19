<template>
    <div>
        INSERT INTO <span>{{ table_name }}</span> ( <span>{{ cols }}</span> ) VALUES 
    </div>
    <div>
        <el-input v-model="table_name" placeholder="表名"></el-input> 
    </div>
    <div>
        <el-input v-model="cols" placeholder="字段名，用逗号分隔"></el-input>
    </div>
    <div>
        <el-input type="textarea" :rows="10" v-model="excelData" placeholder="excel数据"></el-input>
    </div>

    <el-button type="primary" @click="decode" style="margin-top: 5px; margin-bottom: 5px">解析并复制</el-button>
    <el-card>{{ result }}</el-card>
</template>
<script>
import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            table_name: '',
            cols: '',
            excelData: '',
            result: '',
        }
    },
    created () {
        
    },
    methods: {
        //解析
        decode() {
            //去除末尾的换行符
            if (this.excelData[this.excelData.length - 1] === "\n") {
                this.excelData = this.excelData.substring(0, this.excelData.length - 1)
            }
            //在每行
            this.excelData = this.excelData.replace(/^/gm, "('").replace(/$/gm, "'),").replaceAll('\t', "','")
            this.result = `INSERT INTO ${this.table_name} (${this.cols}) VALUES ${this.excelData}`
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
        
    }
}
</script>
<style scoped>

</style>