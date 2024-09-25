<template>
  <div class="rainMap">
    <div class="rainMap-item">
        <div class="rainMap-item-map">
            <dv-decoration-10 class="line1" style="height:3px;" :color="['rgba(202, 244, 255, 0.5)','rgba(202, 244, 255, 0.5)']"/>
            <dv-decoration-10 class="line2" style="height:3px;" :color="['rgba(202, 244, 255, 0.5)','rgba(202, 244, 255, 0.5)']" />
            <div class="mapbox"></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "rainMap",
  props: {},
  components: {},
  data() {
    return {};
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="less">
.rainMap {
  width: calc(~"100% - 80px");
  height: 195px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .rainMap-item{
    flex: 1;
    display: flex;
    flex-direction: column;
    
    .rainMap-item-map{
        width: 540px;
        height: 173px;
        background: rgba(147, 232, 255, 0.05);
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
         .line1{
            position: absolute;
            top: -3px;
        }
        .line2{
            position: absolute;
            bottom: -3px;
        }
        .mapbox{
            width: 516px;
            height: 160px;
            border: 1px solid rgba(147, 232, 255, 0.5);
        }

    }
  }
}
</style>