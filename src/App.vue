<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
 
<style>
.dplayer-live-badge{
  display: none;
}
  body,html,#app {
    width: 100%;
    height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size:8px;
    font-family: Microsoft YaHei;
    font-weight:400;
    color: #FFFFFF;
    margin: 0;
  }
  ul{
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
  }
  p{
    margin: 0;
    margin-block-start: 0em;
    margin-block-end: 0em;
  }
  
  
 /****el-input */
 .el-input__inner{
  border: 2px solid #207692 !important;
  background-color: transparent !important;
  color: #E4F2FE !important;
  border-radius: 0px !important;
 }
 .el-input__inner::placeholder {
  color: rgba(78, 162, 187, 0.5) !important;
}
</style>
