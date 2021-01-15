<template>
  <div class="container">
    <div style="width: 100%; height: 100%">
      <slot></slot>
      <video
        v-if="params.url"
        :id="`videoId` + params.location"
        class="video-js vjs-default-skin vjs-big-play-centered"
        preload="auto"
        data-setup="{}"
        style="width: 100%; height: 100%; object-fit: fill"
        flex-grid
      >
        <source :src="params.url" type="rtmp/flv" />
      </video>
    </div>
  </div>
</template>

<script>
export default {
  name: "",

  props: {
    params: Object,
  },

  components: {},

  computed: {},

  data() {
    return {
      videoObj: "",
      videoInterval: "",
      newTime: 0,
      oldTime: 0,
    };
  },

  mounted() {
    this.params.url && this.testingFlash();
    this.params.url && this.initPlayer();
    // this.params.url && this.playerTime();
    // setTimeout(()=>{
    //     this.videoObj.src('rtmp://58.200.131.2:1935/livetv/hunantv');
    //     this.videoObj.src(this.params.url);
    //     this.videoObj.play();
    // },5000)
  },
  destroyed() {
    this.params.url && this.$video(`videoId` + this.params.location).dispose();
    this.videoInterval && window.clearInterval(this.videoInterval);
  },
  watch: {},

  methods: {
    playerTime(){
      this.videoInterval=setInterval(()=>{
        this.newTime=this.videoObj.currentTime();
        if(this.newTime==this.oldTime){
          console.log('视频异常',this.params)
        }else{
          console.log('视频正常',this.params)
        }
        this.oldTime=this.newTime;
      },8000)
    },
    //初始化播放器
    initPlayer(o) {
      this.videoObj = this.$video(`videoId` + this.params.location, {
        flash: {
          swf: "./static/VideoJS.swf",
        },
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        //自动播放属性,muted:静音播放
        autoplay: true,
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",
        //封面图
        // poster:item.pic
        controlBar: {
          fullscreenToggle: true, //全屏按钮
          pictureInPictureToggle: false,
          volumePanel: true,
          progressControl: false,
          remainingTimeDisplay: false,
        },
      });
      //监听事件  防止暂定后无法继续拉流
      // this.videoObj.on("pause", () => {
      //   this.videoObj.on("play", () => {
      //     this.videoObj.load();
      //     this.videoObj.off("play");
      //   });
      // });
      // this.videoObj.on("stalled",function(){
      //     console.log("网速异常",this.params.location);
      // })
      // this.videoObj.on("loadstart",()=>{
      //     console.log("开始请求数据 ",this.params.location);
      // })
      // this.videoObj.on("progress",()=>{
      //     console.log("正在请求数据1",this.params.location);
      // })
      // this.videoObj.on("loadedmetadata",()=>{
      //     console.log("获取资源长度完成",this.params.location)
      // })
      // this.videoObj.on("canplaythrough",()=>{
      //    console.log("视频源数据加载完成",this.params.location)
      // })
      // this.videoObj.on("waiting", ()=>{
      //     console.log("等待数据",this.params.location)
      // });
      // this.videoObj.on("playing", ()=>{
      //     console.log("视频播放中",this.params.location)
      // });
      // this.videoObj.on("ended", ()=>{
      //     console.log("视频播放结束",this.params.location);
      // });
      // this.videoObj.on("error", ()=>{
      //     console.log("加载错误",this.params.location)
      // });
      //   this.videoObj.on("seeking",function(){
      //       console.log("视频跳转中");
      //   })
      //   this.videoObj.on("seeked",function(){
      //       console.log("视频跳转结束");
      //   })
      // this.videoObj.on("ratechange", ()=>{
      //       console.log("播放速率改变",this.params.location)
      //   });
      // this.videoObj.on("timeupdate",()=>{
      // console.log("播放时长改变",this.params.location);
      // 计算表最新推流的时间和现在播放器播放推流的时间
      // let differTime = this.videoObj.buffered().end(0) - this.videoObj.currentTime();
      // console.log(this.videoObj.buffered().end(0),this.videoObj.currentTime());
      // })
      //   this.videoObj.on("volumechange",function(){
      //       console.log("音量改变");
      //   })
      // this.videoObj.on("stalled",function(){
      //     console.log("网速异常",this.params.location);
      // })
      // this.videoObj.play();
      this.videoObj.muted(true); //设置默认静音模式
    },
    //检查flash插件
    testingFlash() {
      var result = this.hasUsableFlash();
      if (!result) {
        this.$alert("您未安装flash插件，或您浏览未启用flash插件！", {
          confirmButtonText: "启用",
          callback: () => {
            window.location.href = "https://get.adobe.com/cn/flashplayer/";
          },
        });
      }
    },
    hasUsableFlash() {
      var flashObj;
      if (typeof window.ActiveXObject != "undefined") {
        flashObj = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
      } else {
        flashObj = navigator.plugins["Shockwave Flash"];
      }
      return flashObj ? true : false;
    },
  },
};
</script>

<style lang='scss' scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
