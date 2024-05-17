<template>
    <el-row :gutter="10" ref="mainData">
        <!-- 标签 -->
        <el-col :span="24">
            
            <el-tag size="small" style="margin: 0px 5px 5px 0px; cursor: pointer;" @click="clickTag('推荐')" :type="selectedTag === '推荐' ? 'success' : ''">推荐</el-tag>
            <el-tag size="small" v-for="(item, j) in tags" :key="j" style="margin: 0px 5px 5px 0px; cursor: pointer;" @click="clickTag(item)" :type="selectedTag === item ? 'success' : ''">{{item}}</el-tag>
        </el-col>
        <!-- 主体 -->
        <el-col v-for="(item, index) in readyMenu" :key="index">
            <a :href="urlPre + item.url" target="_blank">
                <span>{{index + 1 + ". " + item.name}}</span>
                <el-badge v-if="item.recommend" value="荐"></el-badge>
            </a>
            <span>：{{ item.remark }}</span>
        </el-col>
    </el-row>
</template> 
<script>
export default {
    data() {
        return {
            urlPre: 'https://www.bilibili.com/video/',
            menu: [
                /*

                */
                {name: '诡计-床', url: 'BV13W4y1J7KC', tags: ['卧室', '床'], remark: ''},
                {name: '诡计-床垫', url: 'BV1sY411C7Wi', tags: ['卧室', '床垫'], remark: ''},
                {name: '诡计-床垫', url: 'BV1q34y1g7vy', tags: ['卧室', '床垫'], remark: '软硬测试'},
                {name: '住范-四件套', url: 'BV1LZ4y1A7Zq', tags: ['卧室'], remark: ''},
                {name: '住范-床垫', url: 'BV1rt4y19782', tags: ['卧室', '床垫'], remark: ''},
                {name: '住范-枕头', url: 'BV1x64y167Xe', tags: ['卧室', '枕头'], remark: ''},
                {name: '住范-床', url: 'BV19P411S7C9', tags: ['卧室', '床'], remark: ''},

                {name: '学长-净水器、前置过滤器', url: 'BV1j14y1c7HK', tags: ['厨房', '电器'], remark: ''},
                {name: '学长-即热净水器、前置过滤器', url: 'BV1fd4y167wX', tags: ['厨房', '电器'], remark: ''},
                {name: '老罗-洗碗机', url: 'BV1uK421Y7Jg', tags: ['厨房', '电器'], remark: ''},
                {name: '阳仔-水电', url: 'BV14P4y1H7Tj', tags: ['厨房', '水电'], remark: '水电布局'},
                {name: '阳仔-洗碗机', url: 'BV16Y411e7J6', tags: ['厨房', '电器'], remark: ''},
                {name: '阳仔-净水器', url: 'BV1j34y1L7h2', tags: ['厨房', '电器'], remark: ''},
                {name: '阳仔-净水器', url: 'BV1r5411S7Gm', tags: ['厨房', '电器'], remark: '前置过滤器'},
                {name: '诡计-净水器', url: 'BV1Jc411G7BP', tags: ['厨房', '电器'], remark: '全方案'},
                {name: '住范-微蒸烤一体机', url: 'BV1zQ4y1s7Zf', tags: ['厨房', '电器'], remark: ''},
                {name: '住范-洗碗机', url: 'BV1EU4y1n7bj', tags: ['厨房', '电器'], remark: ''},
                {name: '住范-橱柜', url: 'BV1MC4y1A74X', tags: ['厨房', '橱柜'], remark: '橱柜设计'},
                
                {name: '褚工-管道', url: 'BV1Pb421b7jK', tags: ['卫生间', ], remark: '反臭等'},
                {name: '学长-马桶', url: 'BV17e41197ib', tags: ['卫生间', '马桶'], remark: '智能马桶'},
                {name: '诡计-马桶', url: 'BV1jW4y177rw', tags: ['卫生间', '马桶'], remark: ''},
                {name: '住范-浴霸', url: 'BV1Lp4y1N7ah', tags: ['卫生间'], remark: '浴霸安装'},
                {name: '住范-地漏', url: 'BV1ys4y187ek', tags: ['卫生间'], remark: ''},
                {name: '住范-卫生间', url: 'BV16A4y1D7Ap', tags: ['卫生间'], remark: ''},
                {name: '住范-卫生间', url: 'BV1W34y1X7bJ', tags: ['卫生间'], remark: '干湿分离'},
                {name: '住范-卫生间', url: 'BV14K411M7u2', tags: ['卫生间'], remark: '防臭'},
                {name: '阳仔-卫生间', url: 'BV1sQ4y1a72x', tags: ['卫生间'], remark: '回填'},
                {name: '阳仔-防水', url: 'BV14P4y1F75A', tags: ['卫生间', '防水'], remark: '工艺'},
                {name: '阳仔-马桶', url: 'BV1vL4y1V7bP', tags: ['卫生间', '马桶'], remark: '马桶移位防堵'},
                {name: '阳仔-卫生间', url: 'BV1Ua411h7F6', tags: ['卫生间', '水电'], remark: ''},
                
                {name: '褚工-水电', url: 'BV1RJ4m1N7bk', tags: ['水电'], remark: ''},
                {name: '住范-水电', url: 'BV1mY4y1s7mv', tags: ['水电'], remark: ''},
                {name: '褚工-水电', url: 'BV1L1421S78c', tags: ['水电', '厨房', '卫生间', '防水'], remark: '八爪鱼布线，厕所自动补水'},
                {name: '阳仔-水电', url: 'BV1PL411F7n5', tags: ['水电'], remark: '水管'},
                {name: '阳仔-水电', url: 'BV1xt4y1A7b2', tags: ['水电'], remark: '水电验收'},
                {name: '阳仔-水电', url: 'BV1sf4y1A7YN', tags: ['水电'], remark: '水电验收'},
                {name: '阳仔-水电', url: 'BV1Y14y1t7Bk', tags: ['水电'], remark: '水电验收'},
                {name: '阳仔-水电', url: 'BV1YB4y1X77o', tags: ['水电'], remark: '水电验收'},
                {name: '阳仔-水电', url: 'BV1Ge4y1D73p', tags: ['水电'], remark: '水电放样注意事项'},
                {name: '王雷-水电', url: 'BV1DF411d7sz', tags: ['水电', '网购'], remark: '开关插座（德力西、施耐德、公牛等）、卫浴、五金、灯具、窗帘、家电'},

                {name: '阳仔-乳胶漆', url: 'BV17G4y1f7gC', tags: ['乳胶漆'], remark: ''},
                {name: '阳仔-乳胶漆', url: 'BV1cG411j7bZ', tags: ['乳胶漆'], remark: ''},
                {name: '砖哥-乳胶漆', url: 'BV1ew411S7Fp', tags: ['乳胶漆'], remark: '乳胶漆选择'},

                {name: '阳仔-建材', url: 'BV1h8411u7mt', tags: ['建材', '板材'], remark: '衣柜防拉直器变形'},
                {name: '砖哥-建材', url: 'BV1tc411P7bQ', tags: ['建材', '板材'], remark: '板材选择'},
                {name: '住范-环保', url: 'BV1K54y157tH', tags: ['建材', '板材', '甲醛'], remark: ''},
                {name: '住范-甲醛', url: 'BV1K54y157tH', tags: ['建材', '甲醛'], remark: ''},
                {name: '住范-建材', url: 'BV14J411V762', tags: ['建材', '瓷砖', '板材', '厨房', '卫生间'], remark: '门、洁具'},
                {name: '住范-建材', url: 'BV1fe4y117fZ', tags: ['建材', '乳胶漆', '瓷砖', '灯具'], remark: ''},
                {name: '住范-岩板', url: 'BV1K54y157tH', tags: ['建材', '岩板'], remark: ''},
                {name: '住范-微水泥', url: 'BV1K54y157tH', tags: ['建材', '微水泥'], remark: ''},
                {name: '住范-定制家具', url: 'BV1m5411m7Gq', tags: ['建材', '板材'], remark: ''},
                
                {name: '住范-窗帘', url: 'BV1CA411A7RL', tags: ['窗户', '窗帘'], remark: ''},
                {name: '阳仔-窗帘', url: 'BV128411j7rq', tags: ['窗户', '窗帘'], remark: ''},
                {name: '阳仔-窗户', url: 'BV128411j7rq', tags: ['窗户', '阳台'], remark: ''},
                
                {name: '阳仔-墙', url: 'BV1AU4y1N7UG', tags: ['墙'], remark: '砌墙、过门梁'},
                {name: '砖哥-踢脚线', url: 'BV19N411M7iz', tags: ['踢脚线'], remark: ''},
                {name: '阳仔-全屋WIFI', url: 'BV16d4y147d2', tags: ['全屋WIFI'], remark: ''},
                
                {name: '阳仔-瓷砖', url: 'BV1AP4y1T73M', tags: ['瓷砖'], remark: '瓷砖验收'},
                {name: '砖哥-瓷砖', url: 'BV1fH4y1X7q9', tags: ['瓷砖'], remark: '瓷砖空鼓掉落'},
                {name: '住范-瓷砖', url: 'BV1Wu411U7UY', tags: ['瓷砖'], remark: ''},
                {name: '住范-美缝', url: 'BV1kJ4m1b7dX', tags: ['美缝'], remark: '聚脲'},
                {name: '住范-美缝', url: 'BV1zh41127Ct', tags: ['美缝'], remark: '美缝颜色'},
                {name: '住范-美缝', url: 'BV1Jv411z72E', tags: ['美缝'], remark: '美缝测评'},
                {name: '褚工-聚脲', url: 'BV1Jv411z72E', tags: ['美缝'], remark: '聚脲'},

                {name: '住范-设计师', url: 'BV1hb4y1b7Vw', tags: ['装修公司'], remark: ''},
                {name: '住范-全屋定制', url: 'BV1qk4y1v7EE', tags: ['装修公司'], remark: ''},
                {name: '住范-装修公司', url: 'BV1nQ4y1Q7FX', tags: ['装修公司'], remark: ''},
                {name: '住范-装修公司', url: 'BV14J411V7XB', tags: ['装修公司', '报价单'], remark: ''},
                {name: '诡计-装修公司', url: 'BV1d341147wz?t=595', tags: ['装修公司'], remark: '装修公司避坑'},
                {name: '诡计-装修公司', url: 'BV1Tq4y1m7cu', tags: ['装修公司', '设计师'], remark: ''},
                {name: '诡计-全都有', url: 'BV1NT4y1S7JL', tags: ['装修公司', '电器', '水电', '卫生间', '瓷砖', '美缝'], remark: '空调、窗户等等'},
                {name: '砖哥-装修公司', url: 'BV1tN41137Bx', tags: ['装修公司', '合同'], remark: ''},
                {name: '砖哥-装修公司', url: 'BV11B4y1f7zT', tags: ['装修公司', '报价单'], remark: '拆解报价单'},
                {name: '砖哥-装修公司', url: 'BV1fC411g7ic', tags: ['装修公司'], remark: '拆解报价单'},
                
                {name: '阳仔-插座预留', url: '', tags: ['电器'], remark: 'https://i0.hdslb.com/bfs/note/e62c77e927c2a76318937e8d7db4b778a004b8cf.png@1048w_!web-dynamic.webp'},
                {name: '学长-2023冰箱', url: 'BV15F4m1M7Fi', tags: ['电器'], remark: ''},
                {name: '学长-空调', url: 'BV1bw411F7df', tags: ['电器'], remark: ''},
                {name: '学长-2023空调', url: 'BV12s4y1z7Ri', tags: ['电器'], remark: ''},
                {name: '学长-海尔洗衣机', url: 'BV18u4y1f7Jp', tags: ['电器'], remark: ''},
                {name: '学长-冰箱、洗衣机', url: 'BV1Qw411G77t', tags: ['电器'], remark: ''},
                {name: '学长-冰箱', url: 'BV1Pc411M7TD', tags: ['电器'], remark: ''},
                {name: '学长-冰箱', url: 'BV1QQ4y1L7EG', tags: ['电器'], remark: ''},
                {name: '学长-冰箱', url: 'BV1RC411h7mA', tags: ['电器'], remark: ''},
                {name: '学长-洗碗机、净水器', url: 'BV1M94y1g76z', tags: ['电器'], remark: ''},
                {name: '学长-洗碗机', url: 'BV1q94y1L72r', tags: ['电器'], remark: ''},
                {name: '学长-洗碗机', url: 'BV1S84y1X7vB', tags: ['电器'], remark: ''},
                {name: '学长-扫地机器人', url: 'BV1WM411d7yL', tags: ['电器'], remark: ''},
                {name: '学长-电器尺寸预留', url: 'BV1CJ4m1G7VJ', tags: ['电器'], remark: ''},
                {name: '学长-23年洗衣机排行', url: 'BV1dZ4y1J76R', tags: ['电器'], remark: ''},
                {name: '学长-热水器、油烟机', url: 'BV1E64y1E75z', tags: ['电器'], remark: ''},
                {name: '学长-热水器', url: 'BV1QQ4y1L7EG', tags: ['电器'], remark: ''},
                {name: '学长-蒸烤箱', url: 'BV1Vu4y137ag', tags: ['电器'], remark: ''},
                {name: '诡计-电视', url: 'BV1N14y1Z7o9', tags: ['电器'], remark: ''},
                {name: '诡计-热水器', url: 'BV1YV4y167ZM', tags: ['电器'], remark: ''},
                {name: '诡计-智能家居', url: 'BV1Nh4y1Y7fi', tags: ['电器'], remark: ''},
                {name: '诡计-智能筒灯', url: 'BV1dP41167ip', tags: ['电器'], remark: ''},
                {name: '诡计-中央空调', url: 'BV1Ue411J7Sv', tags: ['电器'], remark: ''},
                {name: '诡计-扫地机器人', url: 'BV1vC4y127U4', tags: ['电器'], remark: `1、头发清理、缠绕问题；2、自动集尘；`},
                {name: '诡计-扫地机器人', url: 'BV1bg4y1T7b7', tags: ['电器'], remark: ''},
                {name: '住范-烘干机', url: 'BV1gy4y1g7zz', tags: ['电器'], remark: ''},
                {name: '住范-智能照明', url: 'BV1YD4y1V7e3', tags: ['电器', '灯具'], remark: ''},
                {name: '住范-空调', url: 'BV1YD4y1V7e3', tags: ['电器', '空调'], remark: '空调遮丑'},

                {name: '老罗-预留尺寸', url: 'BV1VZ421J77L', tags: ['其他'], remark: ''},
                {name: '住范-适老化', url: 'BV1794y1773H', tags: ['其他'], remark: '适老化改造'},
                {name: '住范-户型', url: 'BV1Wk4y1R7wx', tags: ['其他'], remark: ''},
                {name: '住范-户型', url: 'BV1Lf4y1U7JC', tags: ['其他'], remark: ''},
                {name: '住范-其他', url: 'BV1bJ411V71T', tags: ['其他', '装修流程', '水电', '防水', '厨房', '卫生间'], remark: '卫生间、厨房电上水下，腻子，电源极性检测器'},
                {name: '砖哥-其他', url: 'BV12G411Z7NM', tags: ['其他', '水电', '防水', '卫生间', '踢脚线', '乳胶漆'], remark: '黄墙绿地、实景放样、地面开槽、衣柜后防水、卫生间拉毛、隐藏踢脚线、儿童漆'},
                {name: '砖哥-其他', url: 'BV1Lh4y1C7Bx', tags: ['其他', '装修流程', '水电', '美缝'], remark: `1.装修形式
                ->2.部分提前购买家电->3.拆改->4.下水管隔音棉->5.量尺寸出设计图->6.封阳台->7.中央空调等->8.水电改造
                ->9.地暖->10.防水->11.瓦工瓷砖->12.木工柜子等->13.衣柜橱柜门->14.油漆工腻子乳胶漆->15.美缝->16.灯具等
                ->17.木地板->18.全屋定制->19.门踢脚线->20.开荒保洁->21.软装家具`},
                {name: '诡计-适老化', url: 'BV1YP411o7dP', tags: ['其他'], remark: '适老化改造'},
                {name: '诡计-软装', url: 'BV1xF411u7yK', tags: ['其他', '电器', '卧室', ], remark: '全屋定制、成品家具、室内门、踢脚线、地板、窗帘、床垫、家用电器'},
                {name: '诡计-其他', url: 'BV1yF41147hT', tags: ['其他'], remark: '验房等准备工作'},
                
                
                {name: '罗兰朵-我请你来做事，你来给我做主', url: 'BV16K411o7qm', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-新风', url: 'BV1HG411G7pP', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-极简专治强迫症', url: 'BV1UP41157jD', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-一把年纪学劈叉', url: 'BV1Qd4y1P75u', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-入住才知道，它啥毛病', url: 'BV11T411L7rt', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-橱柜、洗碗机', url: 'BV1EB4y1r7s5', tags: ['罗兰朵'], remark: '方太洗碗机广告'},
                {name: '罗兰朵-万恶之源极简风', url: 'BV1ut4y1V7S3', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-当小猫失去蹲厕', url: 'BV1Br4y1j7NE', tags: ['罗兰朵'], remark: '洗地机广告'},
                {name: '罗兰朵-浴室柜', url: 'BV1JF411K78d', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-交完钱就会喊不应', url: 'BV1cf4y1Z7KK', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-窗帘', url: 'BV18t4y1a7tL', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-美缝', url: 'BV1W34y1W7nq', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-那些专属于别墅的装修坑', url: 'BV1Xr4y1x7JM', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-嘘！我爱做家务', url: 'BV1o94y1U7jz', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-净水器', url: 'BV1mF411V7Q3', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-或许是开工没挑日子', url: 'BV1v94y1U7mN', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-开荒保洁', url: 'BV1wF41177Gh', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-我的老公是黑洞', url: 'BV1wR4y1A7e2', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-花园', url: 'BV153411K7C4', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-断桥窗老板的三鞠躬', url: 'BV1Q541127Fj', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-装修的终点是接纳', url: 'BV1wY4y1v7XK', tags: ['罗兰朵'], remark: '厨房台面高度=身高/2 + 5，洗碗机要求至少85'},
                {name: '罗兰朵-岩板台面', url: 'BV1V3411T73W', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-无框门', url: 'BV193411H7i9', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-装修是一场庞大的连锁反应', url: 'BV1z94y1o79J', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-阳台栏杆', url: 'BV1yT4y1i7S8', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-升降衣架', url: 'BV1kY4y1s7Pn', tags: ['罗兰朵'], remark: ''},
                {name: '罗兰朵-中介', url: 'BV1yU4y1d7JZ', tags: ['罗兰朵'], remark: ''},
            ],
            readyMenu: [],
            tags: [],
            selectedTag: '',
        
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
           this.readyMenu = JSON.parse(JSON.stringify(this.menu))
           //初始化食材标签
           const set = new Set()
           this.menu.forEach(item => item.tags.forEach(ingr => set.add(ingr)))
           this.tags = Array.from(set).sort()
        },
        //点击标签时实现选择/取消选择
        clickTag(tag) {
            //选择推荐标签
            if (tag === '推荐') {
                //如果之前已经选中，则取消选中，否则选中，同时更新菜单
                if (this.selectedTag === '推荐') {
                    this.selectedTag = ''
                    this.readyMenu = this.menu
                } else {
                    this.selectedTag = '推荐'
                    this.readyMenu = this.menu.filter(item => item.recommend)
                }
                return
            }
            //确定新的标签，如果之前已经选中，则取消选中，否则选中，同时更新菜单
            if (this.selectedTag === tag) {
                this.selectedTag = ''
                this.readyMenu = this.menu
            } else {
                this.selectedTag = tag
                const temp = []
                //根据标签筛选菜单
                this.menu.forEach(item => {
                    if (item.tags.indexOf(tag) !== -1) {
                        temp.push(item)
                    }
                })
                this.readyMenu = temp
            }
        },
    }
}
</script>
<style scoped>
/* 解决布局混乱的问题 */
.el-row{
    display:flex;
    flex-wrap: wrap;
}
</style>