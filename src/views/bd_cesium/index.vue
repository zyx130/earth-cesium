<template>
  <div class="cesium_box">
    <div id="cesium_practice"></div>
    <wx-btns />
  </div>
</template>

<script>

export default {
  props: {},
  components: {
  },
  computed: {
   
  },
  data() {
    return {
      isshow: true,
      countDown: "",
      timer: "", // 定时器
    };
  },
  
  created() {},
  mounted() {
    cesiumHelp.initViewerIntnet("cesium_practice");
  },
  methods: {
  },
  destroyed() {
    viewer = "";
    clearTimeout(this.timer);
  },
};
</script>

<style lang="scss" scoped>
.cesium_box {
  width: 100%;
  height: 100%;
  .countfont {
    width: 200px;
    text-align: center;
    position: absolute;
    top: 30%;
    left: 50%;
    margin-left: -100px;
    font-size: 100px;
    z-index: 1000;
    color: #d0cb25;
  }
  .fase {
    width: 40px;
    height: 40px;
    background: rgb(47, 202, 223);
    position: absolute;
    bottom: 40px;
    right: 100px;
    z-index: 100;
    cursor: pointer;
    border-radius: 4px;
  }
  .rotate {
    width: 40px;
    height: 40px;
    background: rgb(13, 175, 75);
    position: absolute;
    bottom: 40px;
    right: 50px;
    z-index: 100;
    cursor: pointer;
    border-radius: 4px;
  }
  #cesium_practice {
    width: 100%;
    height: 100%;
  }
}
.cesium_box /deep/ .cesium-viewer-toolbar {
  top: 40px;
  right: 30px;
  z-index: 100;
}
.cesium_box /deep/ .cesium-viewer-fullscreenContainer {
  bottom: 30px;
  right: 30px;
}
.cesium_box /deep/ .cesium-viewer-bottom {
  display: none;
}
</style>