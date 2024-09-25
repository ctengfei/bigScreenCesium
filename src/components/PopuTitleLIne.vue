<template>
  <div class="popuTitleLine" :style="`border-top-color:${color[0]};border-bottom-color:${color[1]}`">
    <div class="popuTitleLine-left" :style="`background-color:${color[1]};`"></div><div class="popuTitleLine-right" :style="`background-color:${color[1]};`"></div>
    
  </div>

</template>

<script>
export default {
name: "ContentBox",
  props:{
    'color':{
      type:Array,
      default:['#52F3F6','rgba(82, 243, 246, 0.2)']
  },
  },
  data(){
  return{

  }
  },
  methods:{

  }
}
</script>

<style lang="less">
.popuTitleLine{
  display: flex;
  flex-flow: row;
  position: relative;
  border-top: 3px solid;
  border-bottom: 1px solid;
  .popuTitleLine-left{
    position: absolute;
    left: 0;
    top:-3px;
    width: 8%;
    height: 3px;
  }
   .popuTitleLine-right{
    position: absolute;
    right: 0;
    top:-3px;
    width: 8%;
     height: 3px;
  }
}

</style>
