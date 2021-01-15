import RThree from './RThree'
//引入three。js
import * as THREE from 'three'
import threeData from './initData'
export default class initApp extends RThree{
  constructor(container, options) {
    super(container, options);
    this.created(container,options);
  }
  created(container,options){
    //初始化
    this.init(options);
    //加载控制器
    this.initOrbitControls();
    //加载公共纹理
    this.addTexture();
    //镜头位置
    this.camera.position.set(4.68866982402893, -10.443886467132787, 64.74636743432221);
    // this.controls.target.set(0, -70, 150);
    // this.setRaycaster();
    //加载地图数据
    this.loadMapData();
    //渲染
    this.render();
    //加载点位数据
    this.loadThreeData()
  }
  //加载点位数据
  loadThreeData(){
    let scale={
      yingTexture:[5, 4, 1],
      quTexture:[3, 1.8, 1],
      zpTexture:[5, 2.5, 1]
    }
    //数据点位循环
    threeData.point.forEach(val=>{
      //创建精灵图
      var material = new THREE.SpriteMaterial({
        map: this[val.img]
      });
      var spriteTL = new THREE.Sprite(material);
      spriteTL.scale.set(...scale[val.img]);
      //位置转换
      let {x,y,z}=this.lgltxyz(val.position);
      spriteTL.position.set(x,y,z+1)
      this.scene.add(spriteTL);
    });
    //中心点为营 的 流动线
    let yingPoint=threeData.point[0].position;
    let obj=this.lgltxyz(yingPoint);
    let arr=[]
    threeData.quLine.forEach(val=>{
      let {x,y,z}=this.lgltxyz(val);
     let a =[
        [obj.x,obj.y,obj.z+1],
        [x,y,z+1]
      ];
      arr.push(a)
    });
    this.addRoadLine(arr)

    //飞线
    let flyArr=[];
    threeData.flyLine.forEach(val=>{
      let obj1=this.lgltxyz(val[0])
      let obj2=this.lgltxyz(val[1])
      let obj={
          from: new THREE.Vector3(obj1.x, obj1.y, obj1.z+1),
          to: new THREE.Vector3(obj2.x, obj2.y, obj2.z+1)
        }
        flyArr.push(obj) 
    });
    this.addFlyLine(flyArr);
    
  }
}