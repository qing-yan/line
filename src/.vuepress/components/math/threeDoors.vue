<!-- 三门问题 -->
<template>
    <div>
        <!-- 设置三扇门 -->
        <el-button v-for="(door, index) in doors" :key="index" 
        :type="choiced == index ? 'success' : 'primary'" 
        @click="choiceDoor(index)">{{ opened == index ? '羊' : '门' }}</el-button>
        <!-- 记录信息面板 -->
        <el-card style="margin-top: 10px;">
            {{ msg }}
        </el-card>
    </div>
</template>
<script>
import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            doors: [0, 0, 0],
            prizeDoor: null, //奖励门索引
            choiced: null, //选择的门
            opened: null, //被打开的门
            msg: '', //记录信息
        }
    },
    methods: {
        init() {
            // 随机一扇门有奖励
            this.prizeDoor = Math.floor(Math.random() * 3)
            this.doors[this.prizeDoor] = 1
        },
        choiceDoor(index) {
            // 选择一扇门
            this.choiced = index
            this.msg = '你选择了门' + (index + 1)
            //选择打开另外一扇未中奖的门
            for (let i = 0; i < 3; i++) {
                if (i != this.choiced && i != this.prizeDoor) {
                    this.opened = i
                    this.msg += `
                    系统打开了门${i + 1}`
                    return
                }
            }

        }
    }
}
</script>
<style scoped>

</style>