<template>
  <div class="contentT" :class="tabIndex == 1 ? 'tabR' : ''">
    <span
      class="contentT-tab-text"
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
.contentT {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;

  height: 35px;
  min-width: 160px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-image: url("../assets/images/fxxs/tab-l.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .contentT-tab-text {
    min-width: 90px;
    height: 35px;
    line-height: 35px;
    display: block;
    padding: 0 15px;
    cursor: pointer;
    font-size: 20px;
    font-weight: normal;
    color: #4ea2bb;
    text-align: center;
  }
  .textCheck {
    color: #e4f2fe;
  }
  .contentT-tab {
    height: 35px;
    min-width: 160px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-image: url("../assets/images/fxxs/tab-l.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
.tabR {
  background-image: url("../assets/images/fxxs/tab-r.png") !important;
}
</style>
