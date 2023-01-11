<template>
    <el-input v-model="jsonData" :rows="2" type="textarea" placeholder=""/>
    <el-button type="primary" @click="decode">解析</el-button>
    <el-card>{{ result }}</el-card>
</template>
<script>
// import { is } from '@babel/types'

export default {
    data() {
        return {
            jsonData: '',
            result: '',
        }
    },
    methods: {
        //解析
        decode() {
            var r = JSON.parse(this.jsonData).res
            var num = r[0].choice_value
            var name = r[2].choice_value
            var phone = r[6].choice_value
            var address = r[7].choice_value
            var issue = r[12].choice_value
            var deadline = r[15].choice_value
            var remark = r[16].choice_value
            // var sql = 'INSERT INTO `12345台账` (`受理号`, `来电人姓名`, `推测来电人`, `来电人电话`, `来电人地址`, `主要问题`, `限办日期`,`备注`)' +
            // 'VALUES (\'num\', \'name\', \'phone\', \'address\', \'issue\', \'deadline\', \'remark\')'
            var sql = `INSERT INTO \`12345台账\` (\`受理号\`, \`来电人姓名\`, \`来电人电话\`, \`来电人地址\`, \`主要问题\`, \`限办日期\`,\`备注\`) 
            VALUES ('${num}', '${name}', '${phone}', '${address}', '${issue}', '${deadline}', '${remark}')`
            this.result = sql
            //INSERT INTO `12345台账` (`受理号`, `来电人姓名`, `推测来电人`, `来电人电话`, `来电人地址`, `主要问题`, `限办日期`,`备注`) VALUES ('20221028000129', '先生', NULL, '19112960700 ', '蓬溪县金桥镇高坪社区', '事件：。', '2022-11-02', NULL)

        }
    }
}
</script>
<style scoped>

</style>