import{aP as h,F as p,P as v,Q as f,ae as n,a8 as _,ac as d,ad as x,Y as g,c as y,u as D}from"./framework-270ea3de.js";import{E as m}from"./app-ac168047.js";const T={data(){return{jsonData:"",result:""}},methods:{decode(){navigator.clipboard.readText().then(c=>{this.jsonData=c;try{var e=JSON.parse(this.jsonData).res,t="\\'"+e[0].choice_value}catch{m.error("解析错误");return}t=t.replace("\\","");var i=e[2].choice_value,a=e[6].choice_value,r=e[7].choice_value,o=e[11].choice_value;o.includes("重复件")||(o="");var s=e[13].choice_value.replace(/\r\n/g,"").replace(/\n/g,""),l=e[16].choice_value.split(" ")[0],u=e[17].choice_value,$=`INSERT INTO \`12345台账\` (\`受理号\`, \`来电人姓名\`, \`来电人电话\`, \`来电人地址\`, \`主要问题\`, \`限办日期\`,\`备注\`) 
                VALUES ('${t}', '${i}', '${a}', '${r}', '${s}', '${l}', '${u}')`;this.result=$,this.result=`${t}	${i}	${a}	${r}	${s}		${l}	${o}`,this.copy()})},copy(){navigator.clipboard.writeText(this.result).then(()=>{m({message:"复制成功",type:"success"})})}}};function V(c,e,t,i,a,r){const o=p("el-input"),s=p("el-button"),l=p("el-card");return v(),f(g,null,[n(o,{modelValue:a.jsonData,"onUpdate:modelValue":e[0]||(e[0]=u=>a.jsonData=u),rows:10,type:"textarea",placeholder:""},null,8,["modelValue"]),n(s,{type:"primary",onClick:r.decode,style:{"margin-top":"5px","margin-bottom":"5px"}},{default:_(()=>[d("解析并复制")]),_:1},8,["onClick"]),n(l,null,{default:_(()=>[d(x(a.result),1)]),_:1})],64)}const b=h(T,[["render",V],["__file","t123.vue"]]),j=y({__name:"t123.html",setup(c){return(e,t)=>(v(),f("div",null,[n(D(b))]))}}),N=h(j,[["__file","t123.html.vue"]]);export{N as default};
