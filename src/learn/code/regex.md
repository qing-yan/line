---
title: 常用正则表达式
date: 2023-10-12
category:
 - 代码
---
[在线正则地址](https://c.runoob.com/front-end/854/)

1. 匹配{}中间的内容，并且包含{}本身：\{.*\}
2. 匹配{}中间的内容，不包含{}本身：(?<={).*(?=})
3. 匹配{}中间的内容，含左不含右：{.*(?=})
4. 匹配{}中间的内容，含右不含左：(?<=\{).*\}
5. 匹配中文（单字）：[\u4e00-\u9fa5]
6. 匹配中文（多字）：[\u4e00-\u9fa5]+


参考文档：  
[^]:[正则表达式位置匹配——匹配两个特殊符号中间的内容](https://jerrymei.cn/regular-expression-position/)