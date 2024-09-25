<template>
  <div class="headerMenu" :style="`width:${boxwidth}px;`">
    <div class="headerMenu-item" v-for="(menu,index) in menuList" :key="index" :class="meauIndex == menu.path?'menuCheck':''" @click="menuChange(menu)"
          :style="`font-size:${fontSize}px;width:${width}px;height:${height}px;`">
        <!-- <span class="item-name"></span> -->
        {{menu.text}}
    </div>
  </div>

</template>

<script>
import { number } from 'echarts';
export default {
name: "HeaderMenu",
  props:{
    "menuList":{
      type:Array,
      default:[]
    },
    "meauIndex":{
      type:String,
      default:"/gqjc"
    },
    "fontSize":{
      type:Number,
      default:30
    },
    "width":{
      type:Number,
      default:279
    },
    "boxwidth":{
      type:Number,
      default:876
    },
    "height":{
      type:Number,
      default:62
    },
  },
  data(){
  return{
  }
  },
  watch:{
    
  },
  methods:{
    menuChange(item){
      let that = this;
      that.$emit('menuChange',item)
      
    },
  }
}
</script>

<style lang="less">
.headerMenu{
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  width: 876px;

  .headerMenu-item{
    width: 279px;
    height: 62px;
    // line-height: 62px;
    background-image: url('../assets/images/home/menuBg.png');
    text-align: center;
    font-size: 30px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #87D2E4;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: 100% 100%;
  }
  .menuCheck{
    background-image: url('../assets/images/home/menuBg-checked.png');
    color: #ffffff;
  }
  
}

</style>
