<template>
  <div class="base" id="base">
    <left/>
    <right/>
  </div>
</template>

<script>
import left from './components/left'
import right from './components/right'
import initThree from './initThree'
export default {
  components: {
    left,
    right
  },
  data() {
    return {
      app:''
    };
  },
  created(){
   
  },
  mounted(){
   let dom=document.getElementById('base')
   this.app=new initThree(dom,{
   })
  },
  destroyed(){
   this.app.destroy(this.app.frameId)
  }
}
</script>
<style >
.base{
  width: 100%;
  height: 100%;
  background: #000;
      background-size: 100% 97%;
    background-position-y: 95%;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
}
#provinceInfo {
      position: absolute;
      z-index: 2;
      background: white;
      padding: 10px;
      visibility: hidden;
      color: #000;
    }
</style>
