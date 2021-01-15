<template>
  <div class="header_container">
    <div class="headerimg">
      <div class="header_center">
        <span>北京时间:{{ dateJ }} {{ timeJ }}</span>
        <span>试验时间: 2020-12-25 </span>
      </div>
      <div class="header_title">某某某某某某某某系统</div>
      <div class="header_weidu">
        <div class="h_bq">
          <span>天气:&nbsp;</span>
          <span>晴</span>
        </div>
        <div class="h_bq">
          <span>气温:&nbsp;</span>
          <span>-7°</span>
        </div>
        <div class="h_bq">
          <span>风向:&nbsp;</span>
          <span>西北</span>
        </div>
      </div>
    </div>

    
    <div class="renw">
      <p>任务代号：ACHGRUDISOJV</p>
      <p>试验项目名称：ACHGRUDISOJV</p>
    </div>
    <!-- <div id="cesiumContainer">
    </div> -->
    <!-- <div class="header_left"><img src="../../assets/img/title.png" /></div>
   
    <div class="header_right">
      <div @click="selectWeather(0)">
        <img v-if="weather == 0" src="../../assets/img/qingY.png" alt="" />
        <img v-else src="../../assets/img/qingB.png" alt="" />
      </div>
      <div @click="selectWeather(1)">
        <img v-if="weather == 1" src="../../assets/img/fengY.png" alt="" />
        <img v-else src="../../assets/img/fengB.png" alt="" />
      </div>
      <div @click="selectWeather(2)">
        <img v-if="weather == 2" src="../../assets/img/yuY.png" alt="" />
        <img v-else src="../../assets/img/yuB.png" alt="" />
      </div>
      <div @click="selectWeather(3)">
        <img v-if="weather == 3" src="../../assets/img/yunY.png" alt="" />
        <img v-else src="../../assets/img/yunB.png" alt="" />
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
     
      // 天气
      weather: 0,
      // 气温
      temperature: "西北风28°C",
      // 日期
      dateJ: "",
      // 时间
      timeJ: "",
      // 第几周
      weekJ: "",
      // 周几
      weekJz: "",
    };
  },
  created() {},
  mounted() {
    setInterval(() => {
      this.init();
    }, 1000);
  },
  methods: {
    init() {
      let dateTime = this.$gf.formatDate(new Date()).split(" ");
      this.dateJ = dateTime[0];
      this.timeJ = dateTime[1];
      this.weekJ = this.$gf.getWeekOfYear();
      this.weekJz = this.$gf.getCurrentDate();
    },
    selectWeather(val) {
      this.weather = val;
      this.$store.commit("set_weather", val);
    },
   
  },
};
</script>
<style lang="scss" scoped>
.header_container {
  width: 100%;
  height: 78px;
  font-family: "FZCYJ";
  .headerimg {
    width: 100%;
    height: 80px;
    background: url("~@/assets/home/header.png") no-repeat;
    background-size: 100% 100%;
    position: relative;

    .header_center {
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 2px;
      left: 39%;
      position: absolute;
      top: 5px;
      left: 40px;
      span:nth-child(2) {
        margin-left: 70px;
        color: #dfd71c;
      }
    }
    .header_title {
      width: 400px;
      height: 60px;
      font-size: 38px;
      font-weight: 800;
      color: #fff;
      font-family: "FZCYJ";
      position: absolute;
      left: 39.5%;
      top: 15px;
      text-align: center;
    }
    .header_weidu {
      width: 500px;
      height: 25px;
      display: flex;
      justify-content: space-evenly;
      position: absolute;
      right: 15px;
      top: 5px;
      .h_bq {
        width: 30%;
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        span {
          margin-right: 3px;
        }
      }
    }
  }
  .renw{
    width:80%;
    margin: 0 auto;
    height: 50px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size:30px;
    color: #dfd71c;
    font-weight: 800;
    font-family: emoji;
  }
  // .header_left {
  //   margin-left: 10px;
  //   img {
  //     width: 429px;
  //     height: 78px;
  //   }
  // }
  //
  //   span:first-child {
  //     display: inline-block;
  //     width: 400px;
  //   }
  //   span:last-child {
  //     color: #27ccfc;
  //     margin-left: 70px;
  //   }
  //   img {
  //     margin: -2px 10px;
  //   }
  // }
  // .header_right {
  //   width: 250px;
  //   height: 34px;
  //   padding: 0 5px;
  //   position: absolute;
  //   right: 10px;
  //   top: 15px;
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   img {
  //     cursor: pointer;
  //   }
  // }
}
</style>
