<template>
  <div class="titlepc">
    <div class="titlepc-left"><dv-decoration-3 style="width:130px;height:20px;"  :color="['#50A2D4']"/></div>
    <span class="titlepc-name">{{name}}</span>
    <div class="titlepc-right"><dv-decoration-3 style="width:130px;height:20px;"  :color="['#50A2D4']"/></div>
  </div>

</template>

<script>
export default {
name: "ContentTitle",
  props:['name'],
  data(){
  return{

  }
  },
  methods:{

  }
}
</script>

<style lang="less">
.titlepc{
  display: flex;
  flex-flow: row;
  align-items: center;
  background-image: url('../assets/images/common/contentTitleBg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  min-width: 204px;
  height: 26px;
 
  .titlepc-name{
    flex: 1;
    font-size: 16px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #3989C7;
    line-height: 69px;
    text-align: center;
    // background: linear-gradient(92deg, #306BB1 0%, #65C4D9 48.8525390625%, #3C9ED6 100%);
    background: linear-gradient(92deg, #ABCEF7 0%, #DCF9FF 48.8525390625%, #ABCEF7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .titlepc-left{
    margin-left: 20px;
    margin-right: 4px;
    width: 20px;
    height: 20px;
    overflow: hidden;
  }
  .titlepc-right{
    margin-right: 20px;
    margin-left: 4px;
    width: 20px;
    height: 20px;
    overflow: hidden;
  }

}

</style>
