<template>
    <div>
        <span>组合UPDATE语句，数据格式为Excel格式</span>
        <el-input v-model="tableName" placeholder="表名" style="width: 100%" clearable/>
        <el-input v-model="text" type="textarea" :rows="10" placeholder="内容" style="width: 100%"/>
        <el-button type="primary" @click="update('clear')" style="margin-top: 5px; margin-bottom: 5px">CLEAR UPDATE</el-button>
        <el-button type="primary" @click="update('concat')" style="margin-top: 5px; margin-bottom: 5px">CONCAT UPDATE</el-button>
        <el-button type="primary" @click="select()" style="margin-top: 5px; margin-bottom: 5px">SELECT</el-button>
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
        update(type) {
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
                if (type == 'clear') {
                    fields = `${this.tableName}.${this.datas[0][1]} = '${e[1]}'`
                } else {
                    fields = `${this.tableName}.${this.datas[0][1]} = CONCAT(${this.tableName}.${this.datas[0][1]}, '${e[1]}')`
                }
                //多字段更新
                if (e.length > 2) {
                    for (let j = 2; j < e.length; j++) {
                        if (type == 'clear') {
                            fields += `,${this.tableName}.${this.datas[0][j]} = '${e[j]}'`
                        } else {
                            fields += `,${this.tableName}.${this.datas[0][j]} = CONCAT(${this.tableName}.${this.datas[0][j]}, '${e[j]}')`
                        }
                    }
                }
                var sql = `UPDATE ${this.tableName} SET ${fields} WHERE ${this.tableName}.${conditionField} = '${conditionFieldValue}';`
                this.result = this.result + sql + '\n'
            }
            this.copy(this.result)
        },
        select() {
            this.result = '\'' + this.text.replaceAll('\n', '\',\'') + '\''
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