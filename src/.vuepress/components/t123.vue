<template>
    <el-input v-model="jsonData" :rows="10" type="textarea" placeholder=""/>
    <el-button type="primary" @click="decode" style="margin-top: 5px; margin-bottom: 5px">解析并复制</el-button>
    <el-card>{{ result }}</el-card>
</template>
<script>
import { ElMessage } from 'element-plus'
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
            navigator.clipboard.readText().then(text => {
                this.jsonData = text
                try {
                    var r = JSON.parse(this.jsonData).res
                    var num = '\\\'' + r[0].choice_value
                } catch (error) {
                    //TODO 解析框内内容
                    ElMessage.error('解析错误')
                    return
                }
                num = num.replace('\\', '')
                var name = r[2].choice_value
                var phone = r[6].choice_value
                var address = r[7].choice_value
                var theme = r[11].choice_value //主题
                //如果不含关键字，则设为空
                if(!theme.includes('重复件')) {
                    theme = ''
                }
                var issue = r[13].choice_value.replace(/\r\n/g, '').replace(/\n/g, '')
                var deadline = r[16].choice_value.split(' ')[0]
                var remark = r[17].choice_value
                //TODO 全部显示
                //sql部分
                var sql = `INSERT INTO \`12345台账\` (\`受理号\`, \`来电人姓名\`, \`来电人电话\`, \`来电人地址\`, \`主要问题\`, \`限办日期\`,\`备注\`) 
                VALUES ('${num}', '${name}', '${phone}', '${address}', '${issue}', '${deadline}', '${remark}')`
                this.result = sql
                //INSERT INTO `12345台账` (`受理号`, `来电人姓名`, `推测来电人`, `来电人电话`, `来电人地址`, `主要问题`, `限办日期`,`备注`) VALUES ('20221028000129', '先生', NULL, '19112960700 ', '蓬溪县金桥镇高坪社区', '事件：。', '2022-11-02', NULL)
                //excel部分
                this.result = `${num}\t${name}\t${phone}\t${address}\t${issue}\t\t${deadline}\t${theme}`
                this.copy()
            })
        },
        copy() {
            navigator.clipboard.writeText(this.result).then(() => {
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