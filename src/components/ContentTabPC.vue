<template>
  <div class="contentTPC" :class="tabIndex == 1 ? 'tabR' : ''">
    <span
      class="contentTPC-tab-text"
      v-for="(item, index) in tabList"
      :key="index"
      @click="menuChange(item)"
      :class="item.id == tabIndex ? 'textCheck' : ''"
      >{{ item.name }}</span
    >
  </div>
</template>

<script>
export default {
  name: "ContentTab",
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
      that.$emit("tabChange", item);
    },
  },
};
</script>

<style lang="less">
.contentTPC {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  height: 23px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-image: url("../assets/images/fxxs/tab-l.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .contentTPC-tab-text {
    min-width: 65px;
    height: 23px;
    line-height: 23px;
    display: block;
    padding: 0 5px;
    cursor: pointer;
    font-size: 12px;
    font-weight: normal;
    color: #4ea2bb;
    text-align: center;
  }
  .textCheck {
    color: #e4f2fe;
  }
  // .contentT-tab {
  //   height: 23px;
  //   min-width: 65px;
  //   display: flex;
  //   flex-direction: row;
  //   align-items: center;
  //   background-image: url("../assets/images/fxxs/tab-l.png");
  //   background-size: 100% 100%;
  //   background-repeat: no-repeat;
  // }
}
.tabR {
  background-image: url("../assets/images/fxxs/tab-r.png") !important;
}
</style>
