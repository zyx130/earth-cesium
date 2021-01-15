<template>
  <div id="experiment">
       <div class="cesiumBtn">
      <div class="btn">
        <div
          :class="isactive == 1 ? 'btnActivebg' : 'btnbg'"
          @click="Activebtn(1)"
        >
          三维态势
        </div>
      </div>
      <div class="btn">
        <div
          :class="isactive == 2 ? 'btnActivebg' : 'btnbg'"
          @click="Activebtn(2)"
        >
          三维态势
        </div>
      </div>
      <div class="btn">
        <div
          :class="isactive == 3 ? 'btnActivebg' : 'btnbg'"
          @click="Activebtn(3)"
        >
          三维态势
        </div>
      </div>
      <div class="btn">
        <div
          :class="isactive == 4 ? 'btnActivebg' : 'btnbg'"
          @click="Activebtn(4)"
        >
          三维态势
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
     isactive:0
    }
  },
  created() {},
  mounted() {
   
  },
  methods: {
    Activebtn(index){
      this.isactive=index
    }
  },
  destroyed() {
    viewer = "";
    clearTimeout(this.timer);
  },
};
</script>
<style lang='scss' scoped>
#experiment {

    .cesiumBtn {
    width: 120px;
    height: 200px;
    position: fixed;
    left: 20px;
    top: 100px;
    .btn {
      width: 120px;
      height: 40px;
      margin: 10px 0;
      background: url("~@/assets/home/leftMenu.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
      .btnbg {
        width: 100%;
        height: 100%;
        background: url("~@/assets/home/leftMenubg.png") no-repeat;
        background-size: 100% 100%;
      }
      .btnActivebg {
        background: url("~@/assets/home/leftMenuActivebg.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
