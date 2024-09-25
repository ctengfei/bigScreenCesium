<template>
  <div class="contentRT">
    <div
      class="contentRT-tab-text"
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
.contentRT {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  height: 35px;
  min-width: 160px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .contentRT-tab-text {
    min-width: 80px;
    height: 35px;
    line-height: 35px;
    padding: 0 10px;
    flex: 1;
    cursor: pointer;
    font-size: 20px;
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
    padding: 16px 1px;
    background: linear-gradient(0deg, #207692 0%, rgba(32,118,146,0) 100%);
    position: absolute;
    right: 0;
    top: 2px;
  }
}
</style>
