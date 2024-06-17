import{aP as x,F as u,P as m,a7 as s,a8 as l,ab as i,ae as y,ac as _,Q as d,Y as p,an as B,ad as g,S as V,c as M,u as w}from"./framework-270ea3de.js";const z={data(){return{urlPre:"https://www.bilibili.com/video/",menu:[{name:"蒸肉丸",url:"BV1Zm421P7qD",tag:["猪肉","萝卜"],recommend:!1,remark:"需要木薯粉"},{name:"红烧肘子",url:"BV1mi421U7Av",tag:["猪肉"],recommend:!1,remark:""},{name:"炸豆腐、快乐红薯、烤馒头、烤排骨、吐司虾滑、牛肉干",url:"BV15C411n7vE",tag:["豆腐","排骨","空气炸锅"],recommend:!1,remark:""},{name:"蒸鸡蛋",url:"BV1Xx4y1z7Sj",tag:["鸡蛋"],recommend:!1,remark:""},{name:"醋炒蛋",url:"BV14A4m1c7Gs",tag:["鸡蛋"],recommend:!1,remark:""},{name:"番茄炖牛肉",url:"BV1LE421u7Lr",tag:["牛肉","土豆","番茄","胡萝卜"],recommend:!1,remark:""},{name:"泡菜",url:"BV1vv411173X",tag:["泡菜"],recommend:!1,remark:""},{name:"泡菜",url:"BV1B8411Z71Q",tag:["泡菜"],recommend:!1,remark:""},{name:"泡鸡爪",url:"BV1Lj421R72J",tag:["鸡爪"],recommend:!1,remark:""},{name:"土豆炖牛肉",url:"BV1Ej42197Bg",tag:["牛肉","土豆"],recommend:!1,remark:""},{name:"梅菜扣肉、炸鸡腿",url:"BV1Hx421Q71Y",tag:["猪肉","鸡肉"],recommend:!1,remark:"五花肉、鸡腿，用空气炸锅制作"},{name:"缠肘花",url:"BV1AF4m157KB",tag:["猪肉"],recommend:!1,remark:"猪肘"},{name:"柠檬鸡爪",url:"BV1WC411h73g",tag:["鸡爪"],recommend:!1,remark:""},{name:"手撕鸡",url:"BV1CP411k7gx",tag:["鸡肉"],recommend:!1,remark:""},{name:"酱汁黄瓜",url:"BV14z421R7rZ",tag:["黄瓜"],recommend:!1,remark:""},{name:"番茄清炖牛肉",url:"BV192421A78c",tag:["牛肉","番茄","胡萝卜"],recommend:!1,remark:"猪肉、排骨、鸡肉等也可这样做"},{name:"胭脂萝卜",url:"BV1n2421M7xm",tag:["萝卜"],recommend:!1,remark:"洗澡泡菜"},{name:"皮蛋香菜抄手",url:"BV1QD42177zZ",tag:["猪肉","皮蛋","香菜"],recommend:!1,remark:""},{name:"小炒鸡、香辣花甲",url:"BV1sy421i7wM",tag:["鸡肉","花甲"],recommend:!1,remark:""},{name:"泡菜",url:"BV1sS421N7eS",tag:[],recommend:!1,remark:"洗澡泡菜"},{name:"炝炒莲白",url:"BV1Qx4y1r7F5",tag:["莲白"],recommend:!1,remark:""},{name:"老汤卤肉",url:"BV1kF4m1M7P3",tag:["卤菜"],recommend:!1,remark:"主要讲卤水复用技巧"},{name:"乱炖",url:"BV13F4m1M7Y1",tag:["白菜","豆腐","猪肉","火腿","香菇","胡萝卜"],recommend:!1,remark:""},{name:"盘龙茄子",url:"BV1k642137yh",tag:["茄子"],recommend:!1,remark:""},{name:"粉蒸羊肉",url:"BV1qy421a7wt",tag:["羊肉"],recommend:!1,remark:""},{name:"椒麻鸡",url:"BV1Y6421g73p",tag:["鸡肉"],recommend:!1,remark:""},{name:"风味茄子",url:"BV1Xy421a7Gn",tag:["茄子"],recommend:!1,remark:""},{name:"辣卤",url:"BV1jC4y1e7TK",tag:["卤菜"],recommend:!1,remark:""},{name:"洋芋擦擦",url:"BV1DZ4y1J7wQ",tag:["土豆","猪肉"],recommend:!1,remark:"需要面粉，洋葱，辣椒"},{name:"白卤肘子",url:"BV1Te411J7uz",tag:["猪肘"],recommend:!1,remark:""},{name:"炸肉丸",url:"BV1Je411J7z8",tag:["猪肉"],recommend:!1,remark:""},{name:"包子",url:"BV1t5411i73R",tag:["面粉"],recommend:!1,remark:""},{name:"卤牛肉",url:"BV1YT4y1h7kf",tag:["牛肉"],recommend:!1,remark:"香砂3g，桂皮4g，小茴香8g，干姜5g，白芷4g，花椒4g，荜拨3g，草果1个，肉蔻3个，丁香1g，山楂3g"},{name:"馒头",url:"BV1CQ4y1j7or",tag:["面粉"],recommend:!0,remark:"需要酵母菌"},{name:"酸菜白肉",url:"BV1MK4y1z7fw",tag:["猪肉","酸菜"],remark:"新鲜猪五花水煮后切片与酸菜一起煮"},{name:"国宴小笼牛肉",url:"BV1Ce411v7z5",tag:["牛肉"],remark:"粉蒸牛肉，需要荷叶"}],readyMenu:[],tags:[],selectedTag:""}},created(){this.init()},methods:{init(){this.readyMenu=JSON.parse(JSON.stringify(this.menu));const r=new Set;this.menu.forEach(e=>e.tag.forEach(n=>r.add(n))),this.tags=Array.from(r).sort()},clickTag(r){if(r==="推荐"){this.selectedTag==="推荐"?(this.selectedTag="",this.readyMenu=this.menu):(this.selectedTag="推荐",this.readyMenu=this.menu.filter(e=>e.recommend));return}if(this.selectedTag===r)this.selectedTag="",this.readyMenu=this.menu;else{this.selectedTag=r;const e=[];this.menu.forEach(n=>{n.tag.indexOf(r)!==-1&&e.push(n)}),this.readyMenu=e}}}},b=["href"];function S(r,e,n,N,t,f){const k=u("el-tag"),h=u("el-col"),v=u("el-badge"),T=u("el-row");return m(),s(T,{gutter:10,ref:"mainData"},{default:l(()=>[i(" 标签 "),y(h,{span:24},{default:l(()=>[y(k,{size:"small",style:{margin:"0px 5px 5px 0px",cursor:"pointer"},onClick:e[0]||(e[0]=a=>f.clickTag("推荐")),type:t.selectedTag==="推荐"?"success":""},{default:l(()=>[_("推荐")]),_:1},8,["type"]),(m(!0),d(p,null,B(t.tags,(a,c)=>(m(),s(k,{size:"small",key:c,style:{margin:"0px 5px 5px 0px",cursor:"pointer"},onClick:o=>f.clickTag(a),type:t.selectedTag===a?"success":""},{default:l(()=>[_(g(a),1)]),_:2},1032,["onClick","type"]))),128))]),_:1}),i(" 主体 "),(m(!0),d(p,null,B(t.readyMenu,(a,c)=>(m(),s(h,{key:c},{default:l(()=>[V("a",{href:t.urlPre+a.url,target:"_blank"},[V("span",null,g(c+1+". "+a.name),1),a.recommend?(m(),s(v,{key:0,value:"荐"})):i("v-if",!0)],8,b),V("span",null,"："+g(a.remark),1),(m(!0),d(p,null,B(a.tag,(o,C)=>(m(),s(k,{size:"small",key:C,style:{margin:"0px 5px 5px 0px",cursor:"pointer"},onClick:P=>f.clickTag(o),type:t.selectedTag===o?"success":""},{default:l(()=>[_(g(o),1)]),_:2},1032,["onClick","type"]))),128))]),_:2},1024))),128))]),_:1},512)}const E=x(z,[["render",S],["__scopeId","data-v-1831ba2f"],["__file","cook.vue"]]),J=M({__name:"cook.html",setup(r){return(e,n)=>(m(),d("div",null,[y(w(E))]))}}),F=x(J,[["__file","cook.html.vue"]]);export{F as default};
