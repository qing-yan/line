<template>
    <el-row>
        <el-col :span="24">
            <h2>身份证号合法性校验</h2>
            <el-input v-model="id_cards" :rows="10" type="textarea" placeholder=""/>
            <el-button type="primary" @click="decode()">校验</el-button>
            <el-card>{{ result }}</el-card>
        </el-col>
    </el-row>
</template>
<script>
import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            id_cards: '',
            result: '',
        }
    },
    methods: {
        //解析
        decode() {
            this.result = '';
            this.id_cards.split('\n').forEach(id_card => {
                this.result += this.check_id_card(id_card);
            })
        },
        copy(data) {
            navigator.clipboard.writeText(data).then(() => {
                ElMessage({
                    message: '复制成功',
                    type: 'success',
                })
            });
        },
        check_id_card(id_card) {
            if (id_card.length != 18) {
                this.$message.error('身份证长度不合法')
                return;
            }
            let c1 = id_card[0] * 7;
            let c2 = id_card[1] * 9;
            let c3 = id_card[2] * 10;
            let c4 = id_card[3] * 5;
            let c5 = id_card[4] * 8;
            let c6 = id_card[5] * 4;
            let c7 = id_card[6] * 2;
            let c8 = id_card[7] * 1;
            let c9 = id_card[8] * 6;
            let c10 = id_card[9] * 3;
            let c11 = id_card[10] * 7;
            let c12 = id_card[11] * 9;
            let c13 = id_card[12] * 10;
            let c14 = id_card[13] * 5;
            let c15 = id_card[14] * 8;
            let c16 = id_card[15] * 4;
            let c17 = id_card[16] * 2;
            let sum = c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8 + c9 + c10 + c11 + c12 + c13 + c14 + c15 + c16 + c17;
            let y = sum % 11; // 余数
            let yz = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
            if (id_card[17] != yz[y]) {
                return `${id_card} `
            }
            return ``
        }
    }
}
</script>
<style scoped>

</style>