---
title: ESJSON在线工具
date: 2023-10-21
category:
 - 工具
---

<div>
    <el-button type="primary" @click="this.current = this.numSum" plain>excel转json</el-button>
</div>
<a :href=current target='_blank'>源网站</a>
<iframe :src=current width="100%" height="566px"  allowfullscreen="true" frameborder="1" scrolling="Yes" leftmargin="0" topmargin="0"/>

<script>
export default {
  data() {
        return {
            excel2json: 'http://www.esjson.com/exceltojson.html',
            current: 'http://www.esjson.com/exceltojson.html',
        }
    },
    methods: {
    },
};
</script>