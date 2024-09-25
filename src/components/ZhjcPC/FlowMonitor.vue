<template>
    <div class="flow_boxPC">
        <div class="f_top">
            <div :class="'t_con' + (isSe == 'one' ? ' t_select':'')" @click="selectInfo('one')">三溪水表</div>
            <div :class="'t_con' + (isSe == 'two' ? ' t_select':'')" @click="selectInfo('two')">阳新</div>
            <div :class="'t_con' + (isSe == 'three' ? ' t_select':'')" @click="selectInfo('three')">大冶</div>
            <div :class="'t_con' + (isSe == 'four' ? ' t_select':'')" @click="selectInfo('four')">超声波</div>
        </div>
        <div class="f_bottom" v-if="(isSe == 'one')">
            <div class="t_b_con">
                <div class="t_b_con_bottom">昨日(m³)</div>
                <div class="t_b_c_t_txt">3709.00</div>
                <div class="t_b_con_top"></div>
                
            </div>
            <div class="t_b_con">
                <div class="t_b_con_bottom">今日(m³)</div>
                <div class="t_b_c_t_txt">0.00</div>
                <div class="t_b_con_top"></div>
            </div>
            <div class="t_b_con">
                <div class="t_b_con_bottom">起码(m³)</div>
                <div class="t_b_c_t_txt">819491</div>
                <div class="t_b_con_top"></div>
            </div>
            <div class="t_b_con">
                <div class="t_b_con_bottom">止码(m³)</div>
                <div class="t_b_c_t_txt">820132</div>
                <div class="t_b_con_top"></div>
            </div>
        </div>
        <div class="f_bottom" v-if="(isSe == 'two')">
            <div class="t_b_con">
                <div class="t_b_con_bottom">昨日(m³)</div>
                <div class="t_b_c_t_txt">69552.00</div>
                <div class="t_b_con_top"></div>
            </div>
            <div class="t_b_con">
                <div class="t_b_con_bottom">今日(m³)</div>
                <div class="t_b_c_t_txt">31261</div>
                <div class="t_b_con_top"></div>
            </div>
            <div class="t_b_con">
                <div class="t_b_con_bottom">起码(m³)</div>
                <div class="t_b_c_t_txt">766845</div>
                <div class="t_b_con_top"></div>
            </div>
            <div class="t_b_con">
                <div class="t_b_con_bottom">止码(m³)</div>
                <div class="t_b_c_t_txt">767158</div>
                <div class="t_b_con_top"></div>
            </div>
        </div>
        <div class="f_bottom" v-if="(isSe == 'three')">
            <div class="t_b_con">
                <div class="t_b_con_bottom">昨日(m³)</div>
                <div class="t_b_c_t_txt">69552.00</div>
                <div class="t_b_con_top"></div>
            </div>
            <div class="t_b_con">
                <div class="t_b_con_bottom">今日(m³)</div>
                <div class="t_b_c_t_txt">31261</div>
                <div class="t_b_con_top"></div>
            </div>
            <div class="t_b_con">
                <div class="t_b_con_bottom">起码(m³)</div>
                <div class="t_b_c_t_txt">656296</div>
                <div class="t_b_con_top"></div>
            </div>
            <div class="t_b_con">
                <div class="t_b_con_bottom">止码(m³)</div>
                <div class="t_b_c_t_txt">656345</div>
                <div class="t_b_con_top"></div>
            </div>
        </div>
        <div class="f_bottom" v-if="(isSe == 'four')">
            <div class="t_b_con">
                <div class="t_b_con_bottom">昨日(m³)</div>
                <div class="t_b_c_t_txt">151268</div>
                <div class="t_b_con_top"></div>
            </div>
            <div class="t_b_con">
                <div class="t_b_con_bottom">今日(m³)</div>
                <div class="t_b_c_t_txt">59648</div>
                <div class="t_b_con_top"></div>
            </div>
            <div class="t_b_con">
                <div class="t_b_con_bottom">起码(m³)</div>
                <div class="t_b_c_t_txt">343198</div>
                <div class="t_b_con_top"></div>
            </div>
            <div class="t_b_con">
                <div class="t_b_con_bottom">止码(m³)</div>
                <div class="t_b_c_t_txt">343258</div>
                <div class="t_b_con_top"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isSe:'one',
            timer: null
        }
    },
    methods:{
        selectInfo(val){
            this.isSe = val;
        },
        monitorRolling(){
            let that = this;
            this.timer = setInterval(()=>{
                switch(that.isSe){
                    case "one": that.isSe = "two";
                        break;
                    case "two": that.isSe = "three";
                        break;
                    case "three": that.isSe = "four";
                        break;
                    case "four": that.isSe = "one";
                        break;
                }
            }, 3000);
        }
    },
    mounted(){
        this.monitorRolling();
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer); // 清除定时器
        }
    }
}
</script>
<style lang="less">
.flow_boxPC{
    width: 400px;
    height: 100%;
    .f_top{
        width: 100%;
        height: 75px;
        .t_con{
            float: left;
            background-image: url('../../assets/images/gqjc/flow-top-one.png');
            width: 80px;
            height: 51px;
            margin:0 10px 0 10px;

            font-family: AlibabaPuHuiTiR;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
            line-height: 20px;
            font-style: normal;
            text-align: center;
            padding-top: 10px;
            cursor: pointer;

        }
        .t_select{
            color: #FFFFFF;
            background-image: url('../../assets/images/gqjc/flow-top-two.png');
            font-weight: 500;
        }
    }
    .f_bottom{
        width: 100%;
        height: calc(100% - 60px);
        .t_b_con{
            width: 90px;
            height: 90px;
            float:left;
            margin:0 0 0 8px;
            .t_b_c_t_txt{
                width: 89px;
                height: 20px;
                font-family: Alibaba-PuHuiTi, Alibaba-PuHuiTi;
                font-weight: normal;
                font-size: 20px;
                color: #FFFFFF;
                line-height: 27px;
                text-align: center;
                font-style: normal;
            }
            .t_b_con_top{
                background-image: url('../../assets/images/gqjc/flow-bottom-Info.png');
                width: 89px;
                height: 43px;

                font-family: Alibaba-PuHuiTi, Alibaba-PuHuiTi;
                font-weight: normal;
                font-size: 20px;
                color: #FFFFFF;
                line-height: 27px;
                text-align: center;
                font-style: normal;
            }
            .t_b_con_bottom{
                font-family: AlibabaPuHuiTiR;
                font-size: 16px;
                color: #FFFFFF;
                line-height: 23px;
                text-align: center;
                font-style: normal;
                text-transform: none;
                background-image: url('../../assets/images/gqjc/flow-bottom-new.png');
                width: 85px;
                height: 23px;
                margin-bottom:26px;
            }
        }
    }
}
</style>