<template>
    <el-input v-model="pre" :rows="10" type="" placeholder="前" style="width: 50%"/>
    <el-input v-model="suf" :rows="10" type="" placeholder="后" style="width: 50%"/>
    <div>
        <span>1. 不包含：</span>
        <span>(?&lt;={{ pre }}).*(?={{ suf }})</span>
    </div>
    <div>
        <span>2. 包含：</span>
        <span>{{ pre }}.*{{ suf }}</span>
    </div>
    <div>
        <span>3. 含左不含右：</span>
        <span>{{ pre }}.*(?={{ suf }})</span>
    </div>
    <div>
        <span>4. 含右不含左：</span>
        <span>(?&lt;={{ pre }}).*{{ suf }}</span>
    </div>
</template>
<script>
export default {
    data() {
        return {
            pre: '',
            suf: '',
        }
    },
    methods: {
        //解析
        decode() {
           

        },
        copy() {
        }
    }
}
</script>
<style scoped>

</style>