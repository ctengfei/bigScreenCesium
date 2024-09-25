<!--视频监控-->
<template>
  <div class="szyddVideo">
    <div class="szyddVideo-box" ref="mv1"></div>
    <div class="szyddVideo-box" ref="mv2"></div>
    <div class="szyddVideo-box" ref="mv3"></div>
    <div class="szyddVideo-box" ref="mv4"></div>
  </div>
</template>

<script>
import LivePlayer from '@liveqing/liveplayer'
import Hls from "hls.js";
import DPlayer from "dplayer";

export default {
  name: 'SzyddVideo',
  props: {},
  components: {
    LivePlayer
  },
  data() {
    return {
      scaleX: 1,
      play1: null,
      play2: null,
      play3: null,
      play4: null,
    }
  },
  watch: {},
  mounted() {
    this.scaleX = localStorage.getItem('scaleX')
    this.$api.gqjc.getZHJC_SP().then(res=>{
      if(res.success){
        const data = res.data;
        let hls1 = new Hls();
        let hls2 = new Hls();
        let hls3 = new Hls();
        let hls4 = new Hls();
        this.play1 = new DPlayer({
          container: this.$refs.mv1,
          live:true,
          video: {
            url: data[9].playUrl,
            type: 'customHls',
            customType: {
              customHls: function (video, player) {
                hls1.loadSource(video.src);
                hls1.attachMedia(video);
              },
            },
          },
        });
        this.play2 = new DPlayer({
          container: this.$refs.mv2,
          live:true,
          video: {
            url: data[10].playUrl,
            type: 'customHls',
            customType: {
              customHls: function (video, player) {
                hls2.loadSource(video.src);
                hls2.attachMedia(video);
              },
            },
          },
        })
        this.play3 = new DPlayer({
          container: this.$refs.mv3,
          live:true,
          video: {
            url: data[6].playUrl,
            type: 'customHls',
            customType: {
              customHls: function (video, player) {
                hls3.loadSource(video.src);
                hls3.attachMedia(video);
              },
            },
          },
        });
        this.play4 = new DPlayer({
          container: this.$refs.mv4,
          live:true,
          video: {
            url: data[7].playUrl,
            type: 'customHls',
            customType: {
              customHls: function (video, player) {
                hls4.loadSource(video.src);
                hls4.attachMedia(video);
              },
            },
          },
        });
        const timer = setTimeout(()=>{
          hls1.stopLoad();
          hls2.stopLoad();
          hls3.stopLoad();
          hls4.stopLoad();
          clearTimeout(timer)
        },10000)
        this.play1.on('pause', function () {
          hls1.stopLoad();
        });
        this.play1.on('play', function () {
          hls1.startLoad();
        });
        this.play2.on('pause', function () {
          hls2.stopLoad();
        });
        this.play2.on('play', function () {
          hls2.startLoad();
        });
        this.play3.on('pause', function () {
          hls3.stopLoad();
        });
        this.play3.on('play', function () {
          hls3.startLoad();
        });
        this.play4.on('pause', function () {
          hls4.stopLoad();
        });
        this.play4.on('play', function () {
          hls4.startLoad();
        });
      }
    })
  },
  methods: {
    HandlCustomButtons(val) {
      if (val == '对讲') {
        console.log('对讲')
      }
    },
  },

}
</script>

<style lang="less">
.szyddVideo {
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  overflow-y: auto;

  .szyddVideo-box {
    width: calc(calc(100% / 2) - 4px);
    height: 130px;
    margin: 0 2px;
    position: relative;
    margin-bottom: 5px;
  }

  .testImage {
    width: 180px;
    height: 120px;
    margin-right: 15px;
    position: relative;
    margin-bottom: 10px;
  }

  .video-wrapper .video-js .vjs-control-bar {
    font-size: inherit !important;
  }
}

</style>