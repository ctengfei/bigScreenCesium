<template>
  <div class="contentRTpc">
    <div
      class="contentRTpc-tab-text"
      v-for="(item, index) in tabList"
      :key="index"
      @click="menuChange(item)"
      :class="item.id == tabIndex ? 'textCheck' : ''"
      ><span>{{ item.name }}</span><span v-if="index < tabList.length-1" class="splitLine"></span></div>
  </div>
</template>

<script>
export default {
  name: "contentRTab",
  props: {
    tabList: {
      type: Array,
      default: [],
    },
    tabIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  watch: {},
  methods: {
    menuChange(item) {
      let that = this;
      that.$emit("rowTabChange", item);
    },
  },
};
</script>

<style lang="less">
.contentRTpc {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  height: 22px;
  min-width: 160px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .contentRTpc-tab-text {
    min-width: 70px;
    height: 22px;
    line-height: 22px;
    // padding: 0 5px;
    flex: 1;
    cursor: pointer;
    font-size: 14px;
    font-weight: normal;
    color: #4ea2bb;
    text-align: center;
    position: relative;
    
  }
  .textCheck {
    color: #FFFFFF;
    background: linear-gradient(0deg, #207692 0%, rgba(32,118,146,0) 100%);
  }
  .splitLine{
    display: block;
    padding: 10px 1px;
    background: linear-gradient(0deg, #207692 0%, rgba(32,118,146,0) 100%);
    position: absolute;
    right: 0;
    top: 1px;
  }
}
</style>
