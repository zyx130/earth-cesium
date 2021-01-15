<template>
  <div class="home">
    <headers class="homeHeader" />
    <div class="bgBottom">
      <div class="Bottom_nav">
        <div class="navbtn" @click="isactiveBtn(1)">
          <img src="~@/assets/home/situation.png" alt="" />
          <p>总体态势</p>
        </div>
        <div class="navbtn" @click="isactiveBtn(2)">
          <img src="~@/assets/home/text.png" alt="" />
          <p>测量信息</p>
        </div>
        <div class="navbtn" @click="isactiveBtn(3)">
          <img src="~@/assets/home/meteorological.png" alt="" />
          <p>气象信息</p>
        </div>
        <div class="navbtn" @click="isactiveBtn(4)">
          <img src="~@/assets/home/text1.png" alt="" />
          <p>文档信息</p>
        </div>
      </div>
    </div>
    <div class="bgLeft"></div>
    <div class="bgRight"></div>
    <router-view />
  </div>
</template>

<script>
import headers from "../components/home/headers";
export default {
  name: "Home",
  data() {
    return {
      //选中按钮
      isactive: 0,
    };
  },
  components: {
    headers,
  },
  created() {},
  mounted() {},
  methods: {
    isactiveBtn(index) {
      switch (index) {
        case 1:
          console.log("态势");
          break;
        case 2:
          console.log("测量");
          break;
        case 3:
          console.log("气象");
          break;
        case 4:
          console.log("文档");
          break;
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.home {
  width: 100%;
  height: 100%;

}
.homeHeader {
  position: absolute;
  top: 0;
  z-index: 4;
}
.bgBottom {
  position: absolute;
  bottom: 0;
  z-index: 3;
  height: 80px;
  width: 100%;
  background: url("../assets/home/nav.png") no-repeat;
  background-size: 100% 100%;
  .Bottom_nav {
    width: 500px;
    height: 65px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: absolute;
    left: 37%;
    bottom: 5px;
    .navbtn {
      width: 70px;
      height: 65px;
      text-align: center;
      cursor: pointer;
      img {
        width: 40px;
        height: 40px;
      }
    }
  }
}
.bgLeft {
  position: absolute;
  left: 0;
  z-index: 3;
  height: 97%;
  width: 30px;
  background: url("../assets/img/bgL.png");
  background-size: 100% 100%;
}
.bgRight {
  position: absolute;
  right: 0;
  top: 0px;
  z-index: 1;
  height: 100%;
  width: 26px;
  background: url("../assets/img/bgR.png");
  background-size: 100% 100%;
}
</style>
