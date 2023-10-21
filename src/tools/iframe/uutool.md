---
title: UU在线工具
date: 2023-10-17
category:
 - 工具
---

<div>
    <el-button type="primary" @click="this.current = this.numSum" plain>数值求和</el-button>
    <el-button type="primary" @click="this.current = this.idPhoto" plain>证件照换色</el-button>
    <el-button type="primary" @click="this.current = this.idCard" plain>身份证校验</el-button>
</div>
<a :href=current target='_blank'>源网站</a>
<iframe :src=current width="100%" height="566px"  allowfullscreen="true" frameborder="1" scrolling="Yes" leftmargin="0" topmargin="0"/>

<script>
export default {
  data() {
        return {
            numSum: 'https://uutool.cn/num-sum/',
            idPhoto: 'https://uutool.cn/id-photo/',
            idCard: 'https://uutool.cn/id-card/',
            current: 'https://uutool.cn/num-sum/',
        }
    },
    methods: {
    },
};
</script>