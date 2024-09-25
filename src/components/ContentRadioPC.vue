<template>
  <div class="contentRPC">
    <div
      class="contentRPC-raido-item"
      v-for="(item, index) in radioList"
      :key="index"
      @click="menuChange(item)"
    >
      <span
        class="item-title"
        :class="item.id == radioIndex ? 'radioCheck' : ''"
        >{{ item.name }}</span>
      <img class="dizuo" :src="item.id == radioIndex ? dizuoCheckedUrl : dizuoUrl" />
      <img
        class="icon"
        :src="item.id == radioIndex ? item.checkBgUrl : item.bgUrl"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentRadio",
  props: {
    radioList: {
      type: Array,
      default: [],
    },
    radioIndex: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      dizuoUrl:require("../assets/images/fxxs/radio-dizuo.png"),
      dizuoCheckedUrl:require("../assets/images/fxxs/radio-dizuo-checked.png")
    };
  },
  watch: {},
  methods: {
    menuChange(item) {
      let that = this;
      that.$emit("radioChange", item);
    },
  },
};
</script>

<style lang="less">
.contentRPC {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-around;
  min-width: 358px;
  height: 52px;
  .contentRPC-raido-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    flex: 1;
    cursor: pointer;
    .item-title {
      font-size: 14px;
      font-weight: normal;
      color: #88BAFF;
      font-family: Adobe Heiti Std;
    }
    .radioCheck {
      color: #C4F2FF;
    }
    .icon {
      margin-top: 6px;
      margin-bottom: 4px;
      z-index: 2;
      width: 22px;
      height: 22px;
    }
    .dizuo {
      position: absolute;
      bottom: -10px;
      z-index: 1;
      width: 42px;
      height: 24px;
    }
  }
}
</style>
