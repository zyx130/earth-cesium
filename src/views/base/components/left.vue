<template>
  <div class="baseLeft">
    <div class="bgImg baseLeftTitle">实验项目总量: <span  class="fontClass">415565</span> </div>
    <div class="experimentZ">
      <div>
         <div id="experimentZ1"></div>
         <div class="experBody1">
          <div>完成量</div>
          <div>78412</div>
         </div>
      </div>
      <div>
         <div id="experimentZ2"></div>
         <div class="experBody2">
         <div>剩余量</div>
         <div>78412</div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import leftEart from './leftEart'
export default {
  components: {},
  props: {},
  computed: {},
  data() {
    return {};
  },
  created() {},
  mounted() {
    let dom = document.getElementById('experimentZ1')
    leftEart.experimentZ.call(this,dom,70)
    let dom2 = document.getElementById('experimentZ2')
    leftEart.experimentZ.call(this,dom2,40)
  },
  methods: {},
  destroyed() {},
};
</script>
<style lang="scss">
.baseLeft{
    position: absolute;
    top: 89px;
    left: 33px;
    width: 387px;
    height: 86%;
}
.bgImg{
  background: url('../../../assets/img/fc.png');
  background-repeat:no-repeat ;
  background-size:100% 14px ;
}
.baseLeftTitle{
  width: 90%;
  padding-top:10px;
  font-size: 22px;
  padding-left:10px ;
  letter-spacing: 3px;
}
.fontClass{
  position: relative;
        color: #2ad4fe;
        font-weight: 800;
        font-size: 28px;
        letter-spacing: 5px;
}
.experimentZ{
  width: 90%;
  display: flex;
  height: 200px;
}
.experimentZ>div{
width: 50%;
height: 100%;
position: relative;
}
#experimentZ1,#experimentZ2{
  width: 100%;
  height: 170px;
}
.experBody1,.experBody2{
  width: 100%;
  position: absolute;
  bottom: 6px;
  text-align: center;
}
</style>
