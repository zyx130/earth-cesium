<template>
  <div class="cesium_box">
    <div id="cesium_practice"></div>
    <div class="fase" @click="fase"></div>
    <div class="rotate" @click="rotate"></div>
    <div class="ys-absolute-container" id="map" style="overflow: hidden"></div>
    <div class="countfont" v-show="isshow">{{ countDown }}</div>
    <wx-btns />
  </div>
</template>

<script>
import cesiumHelp from "@/lib/cesiumHelp.js";
import common from "@/lib/common.js";
import trajectory from "@/mock/trajectory.js";
import btns from "@/views/leftBtn/index.vue";
export default {
  props: {},
  components: {
    "wx-btns": btns,
  },
  computed: {
    weather() {
      return this.$store.state.weather;
    },
    GET_SET_Landing() {
      return this.$store.state.Landing;
    },
    GET_cameraview(){
      return this.$store.state.cameraState
    } 
  },
  data() {
    return {
      isshow: true,
      countDown: "",
      timer: "", // 定时器
      viewshijiao: {
        lat: 122.457578,
        lon: 45.765227,
        h: 9175.13,
      },
      // 位置信息
      positionCenter: {
        lat: 122.64827728271483,
        lon: 45.9427944694844,
      },
      // 炮车信息
      positionCenter1: {
        lat: 122.64654173639484,
        lon: 45.82933938896586,
        h: 265,
      },
      //房子坐标
      fangzi: {
        lat: 122.65274047851562,
        lon: 45.810028431131345,
        h: 200,
      },
      //摄像头坐标
      shexiang: {
        lat: 122.62664794921874,
        lon: 45.81540082150529,
        h: 200,
      },
      //摄像头2坐标
      shexiang2: {
        lat: 122.67780303955078,
        lon: 45.82018634537424,
      },
      //风向标坐标
      fengxiang: {
        lat: 122.6348876953125,
        lon: 45.81205071008615,
      }, 
      //雷达
      leida:{
        lat:122.67106995536976,
        lon:45.81749399942593,
        h:200
      },
      leidache:{
        lat:122.67780303955078,
        lon:45.83536435161731,
        h:200
      },
      //轨迹线的4个点 同时还是炮车的位置
      pos1Position: {
        lat: 122.64654173639484,
        lon: 45.82933938896586,
      },
      pos2Position: {
        lat: 122.64654173639484,
        lon: 45.913421859301565,
      },
      pos3Position: {
        lat: 122.64654173639484,
        lon: 45.86228122137575,
      },
      pos4Position: {
        lat: 122.64654173639484,
        lon: 45.9427944694844,
      },
    };
  },
  
  created() {},
  mounted() {
    cesiumHelp.initViewerIntnet("cesium_practice");
    this.timer = setTimeout(() => {
      cesiumHelp.rotate(
        this.viewshijiao,
        0.9979659015047186,
        -0.4428335243327317,
        0.0031254875916166824
      );
    }, 3000);
    cesiumHelp.wall(common.wall);
    cesiumHelp.land(this.positionCenter1)
    cesiumHelp.bomb(this.pos4Position);
    cesiumHelp.line();
    // cesiumHelp.blowUp(this.positionCenter, 0);
    // cesiumHelp.Misslied(
    //   this.pos1Position,
    //   this.pos2Position,
    //   this.pos3Position,
    //   this.pos4Position,
    //   trajectory
    // );
    //加载炮车

    cesiumHelp.addFengjiModel2(
      this.positionCenter1,
      "./static/model/炮车.gltf",
      {id:"box1",name:"炮车"},
      0.2,
      3.1
    );
    //房子
    cesiumHelp.addFengjiModel2(
      this.fangzi,
      "./static/model/fangzi.gltf",
       {id:"box2",name:"大楼"},
      1.0,
      3.1
    );
    //摄像头
    cesiumHelp.addFengjiModel2(
      this.shexiang,
      "./static/model/摄像机组.gltf",
      {id:"box3",name:"摄像机1号"},
      1.0,
      3.1
    );
    //摄像头
    cesiumHelp.addFengjiModel2(
      this.shexiang2,
      "./static/model/摄像机组.gltf",
       {id:"box4",name:"摄像机2号"},
      1.0,
      3.1
    );
    //风向标
    cesiumHelp.addFengjiModel2(
      this.fengxiang,
      "./static/model/风向.gltf",
       {id:"box5",name:"风向标"},
      1.0,
      3.1
    );
     //雷达
    cesiumHelp.addFengjiModel2(
      this.leida,
      "./static/model/雷达.gltf",
       {id:"box6",name:"雷达"},
      1.0,
      2.0
    );
     //雷达
    cesiumHelp.addFengjiModel2(
      this.leidache,
      "./static/model/雷达车.gltf",
       {id:"box7",name:"雷达车"},
      0.5,
      0.5
    );
  },
  watch: {
    weather(newV, oldV) {
      viewer.scene.postProcessStages.removeAll(); // 移除天气
      let weatherData = "";
      if (newV == 0) {
        weatherData = "";
      } else if (newV == 1) {
        weatherData = cesiumHelp.getFog_fs();
      } else if (newV == 2) {
        weatherData = cesiumHelp.getRain_fs();
      } else if (newV == 3) {
        weatherData = cesiumHelp.getSnow_fs();
      }
      if (weatherData) {
        let snow = new Cesium.PostProcessStage({
          name: "czm_snow",
          fragmentShader: weatherData,
        });
        viewer.scene.postProcessStages.add(snow);
      }
    },
    GET_SET_Landing(newv, oldV) {
      if (newv) {
        cesiumHelp.shuang(this.pos4Position);
      }
    },
    GET_cameraview(newv,oldV){
        switch(newv){
          case "平飞区":
           console.log("平飞区")
          break;
          case "降落区":
            console.log("降落区")
          break;
        }
    }
  },
  methods: {
    timerDowd() {
      this.isshow=true
      if (this.isshow) {
        this.countDown = 3;
        let gettmer = setInterval(() => {
          if (this.countDown < 2) {
            this.countDown = "发射";
            setTimeout(()=>{
              this.isshow = false;
            clearInterval(gettmer);
            //漫游视觉
            cesiumHelp.rotate(
              {
                lon: 45.820022,
                lat: 122.637869,
                h: 395.68,
              },
              0.5755180849018497,
              -0.0453597011175193,
              0.0018294439248682792
            );
            //发射
            cesiumHelp.Misslied(
              this.pos1Position,
              this.pos2Position,
              this.pos3Position,
              this.pos4Position,
              trajectory
            );
           },900)
          } else {
            this.countDown -= 1;
          }
        }, 1000);
      }
    },
    fase() {
      this.timerDowd();
    },
    rotate(){
      cesiumHelp.rotate(
        this.viewshijiao,
        0.9979659015047186,
        -0.4428335243327317,
        0.0031254875916166824
      );
    }
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