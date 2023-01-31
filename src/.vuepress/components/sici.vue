<template>
    <canvas id="canvas">
        <el-card v-html="sici[0].content"></el-card>

    </canvas>
</template>
<script>
export default {
    data() {
        return {
            sici: [
                { dynasty: '唐', auther: '杜甫', title: '江南逢李龟年', content: '岐王宅里寻常见，崔九堂前几度闻<br>正是江南好风景，落花时节又逢君' }
            ]
        }
    },
    created() {
        const width = document.getElementById("canvas").width = screen.availWidth;
        const height = document.getElementById("canvas").height = screen.availHeight;
        // 获取 canvas 的绘图上下文
        const ctx = document.getElementById("canvas").getContext("2d");
    },
    methods: {
        decode() {
            
        },
    }
}
</script>
<style scoped>


</style>