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
                    var r = JSON.parse(this.jsonData).data.data
                    // var num = '\\\'' + r[0].choice_value
                } catch (error) {
                    //TODO 解析框内内容
                    ElMessage.error('解析错误')
                    return
                }
                var list = new Array()
                r.forEach(element => {
                    var name = element.realName//姓名
                    var sex = element.sex//性别
                    var birthday = element.birthday//出生日期
                    var height = element.height//身高
                    var weight = element.weight//体重
                    var idsNo = element.idsNo//身份证号
                    var nation = element.nation//民族
                    var marriageStatus = element.marriageStatus//婚姻状况
                    var educationLevel = element.educationLevel//学历
                    var job = element.job//工作
                    var birthplaceAddress = element.birthplaceAddress//户籍地
                    var linkPhone = element.linkPhone//电话号码
                    var liveAddress = element.liveAddress//居住地
                    var cateTypeText = element.cateTypeText//人员状态
                    var level = element.level//风险等级
                    var linkSgName = element.linkSgName//社工
                    var linkMjName = element.linkMjName//民警
                    var code = element.code//三色码
                    var temp = `${name}\t${sex}\t${birthday}\t${height}\t${weight}\t${idsNo}\t${nation}\t${marriageStatus}\t${educationLevel}\t${job}\t${birthplaceAddress}\t${linkPhone}\t${liveAddress}\t${cateTypeText}\t${level}\t${linkSgName}\t${linkMjName}\t${code}`
                    list.push(temp)
                });
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