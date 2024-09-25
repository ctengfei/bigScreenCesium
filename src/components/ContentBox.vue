<template>
  <div class="contentBox" :style="`width:${width};height:${height}`">
    <img class="common letTop" :style="`width:${angleWidth};height:${angleHeight}`" src="../assets/images/common/left-top.png"/>
    <img class="common letBottom" :style="`width:${angleWidth};height:${angleHeight}`" src="../assets/images/common/left-bottom.png"/>
    <img class="common rightTop" :style="`width:${angleWidth};height:${angleHeight}`" src="../assets/images/common/right-top.png"/>
    <img class="common rightBottom" :style="`width:${angleWidth};height:${angleHeight}`" src="../assets/images/common/right-bottom.png"/>
    <slot></slot>
  </div>

</template>

<script>
export default {
name: "ContentBox",
  props:{
    'width':{
      type:String,
      default:'100px'
  },
  'height':{
     type:String,
      default:'100px'
  },
  'angleWidth':{
     type:String,
      default:'40px'
  },
  'angleHeight':{
     type:String,
      default:'40px'
  }},
  data(){
  return{

  }
  },
  methods:{

  }
}
</script>

<style lang="less">
.contentBox{
  display: flex;
  flex-flow: row;
  align-items: center;
  background: rgba(9,34,57,0.65);
  position: relative;
  .common{
    width: 40px;
    height: 40px;
    position: absolute;
  }
  .letTop{
    left: -2px;
    top: -2px;
  }
  .letBottom{
    left: -2px;
    bottom: -2px;
  }
  .rightTop{
    right: -2px;
    top: -2px;
  }
  .rightBottom{
    right: -2px;
    bottom: -2px;
  }
}

</style>
