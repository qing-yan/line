<template>
    <div>
        <el-input v-model="tableName" placeholder="表名" style="width: 100%" clearable/>
        <el-input v-model="text" type="textarea" :rows="10" placeholder="内容" style="width: 100%"/>
        <el-button type="primary" @click="decode()" style="margin-top: 5px; margin-bottom: 5px">解析</el-button>
        <el-card style="white-space: pre-line;">
            {{ result }}
        </el-card>
    </div>

</template>
<script>
import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            tableName: 'people',
            text: '',
            datas: [[]],
            result: ''
        }
    },
    methods: {
        //解析
        decode() {
            this.text = this.text.substring(0, this.text.length - 1)
            //按行切片
            let rows = this.text.split("\n")
            for (let i = 0; i < rows.length; i++) {
                //按列切片
                this.datas[i] = rows[i].split("\t")
            }
            //
            var conditionField = this.datas[0][0]
            for (let i = 1; i < this.datas.length; i++) {
                const e = this.datas[i];
                var conditionFieldValue = e[0]
                var fields = `${this.tableName}.${this.datas[0][1]} = '${e[1]}'`
                //多字段更新
                if (e.length > 2) {
                    for (let j = 2; j < e.length; j++) {
                        fields += `,${this.tableName}.${this.datas[0][j]} = '${e[j]}'`
                    }
                }
                var sql = `UPDATE ${this.tableName} SET ${fields} WHERE ${this.tableName}.${conditionField} = '${conditionFieldValue}';`
                this.result = this.result + sql + '\n'
            }
        },
        copy(id) {
            navigator.clipboard.writeText(document.querySelector(id).innerHTML).then(() => {
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