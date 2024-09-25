<template>
  <div class="title">
    <div class="title-left"><dv-decoration-3 style="width:130px;height:20px;"  :color="['#50A2D4']"/></div>
    <span class="title-name">{{name}}</span>
    <div class="title-right"><dv-decoration-3 style="width:130px;height:20px;"  :color="['#50A2D4']"/></div>
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
.title{
  display: flex;
  flex-flow: row;
  align-items: center;
  background-image: url('../assets/images/common/contentTitleBg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  min-width: 285px;
  height: 34px;
  z-index: 2;
 
  .title-name{
    flex: 1;
    font-size: 20px;
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
  .title-left{
    margin-left: 25px;
    margin-right: 4px;
    width: 30px;
    height: 20px;
    overflow: hidden;
  }
  .title-right{
    margin-right: 25px;
    margin-left: 4px;
    width: 30px;
    height: 20px;
    overflow: hidden;
  }

}

</style>
