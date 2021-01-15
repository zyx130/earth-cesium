//引入three。js
import * as THREE from 'three'
//后期处理 物体周围发光
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
//旋转控件
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//各种加载器
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
export default class threeApp {
  constructor(container, options) {
    //共享参数
    //dom节点
    this.dom = container;
    //场景
    this.scene = '';
    //相机
    this.camera = '';
    //渲染器
    this.renderer = '';
    //控制器
    this.controls = '';
    //动画
    this.frameId = '';
    //鼠标事件
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    //摩卡什么转换 用于转换坐标
    this.projection = d3.geoMercator().center([104.0, 37.5]).scale(80).translate([0, 0]);
  }
  //初始化
  init(options) {
    this.provinceInfo = document.getElementById('provinceInfo');
    // 创建场景
    this.scene = new THREE.Scene();
    //创建相机
    this.camera = new THREE.PerspectiveCamera(75, this.dom.clientWidth / this.dom.clientHeight, 0.1, 10000);

    this.camera.lookAt(0, 0, 0);
    //创建渲染器
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    //设置渲染区域尺寸
    this.renderer.setSize(this.dom.clientWidth, this.dom.clientHeight);
    //设置背景颜色
    if (options.clearColor) this.renderer.setClearColor(options.clearColor);
    // 辅助
    if (options.axes) this.scene.add(new THREE.AxesHelper(100));// 坐标轴辅助红x 绿y 蓝z
    if (options.gridHelper) this.scene.add(new THREE.GridHelper(1000, 10));// 网格参考线
    //将渲染器 添加到 dom中
    this.dom.appendChild(this.renderer.domElement);
    //尺寸变化 从新渲染
    window.addEventListener('resize', () => this.onWindowResize(this.dom));
    //背景
    // let skyTexture = (new THREE.CubeTextureLoader).setPath("./static/img/").load("bg2.png");
    // this.scene.background = skyTexture;
    var skyTexture = (new THREE.CubeTextureLoader) //环境贴图
        .setPath("./static/R/sky/")
        .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
        this.scene.background = skyTexture;
    //平行光  可应用阴影
    // var directionalLight = new THREE.DirectionalLight("#fff"); //模拟远处类似太阳的光源
    // directionalLight.position.set(300, 300, 300).normalize();
    // this.scene.add(directionalLight);
    //环境光 环境光会均匀的照亮场景中的所有物体。
    var ambientLight = new THREE.AmbientLight("#fff");
    this.scene.add(ambientLight);
  }
  //跟随屏幕变化
  onWindowResize(container) {
    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }
  //控制器
  initOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true // 使动画循环使用时阻尼或自转 意思是否有惯性
    // controls.dampingFactor = 0.25; // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
    this.controls.enableZoom = true // 是否可以缩放
    // this.controls.autoRotate = true // 开启自转
    this.controls.autoRotateSpeed = 0.3 //自传速度
    this.controls.enablePan = false // 是否开启右键拖拽
  }
  //创建模型
  model(w, h, t, x, y, z) {
    var geometry = new THREE.BoxGeometry(w, h, t); //创建一个立方体几何对象Geometry
    var material = new THREE.MeshLambertMaterial({
      color: 0x0000ff
    });
    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    mesh.position.set(x, y, z)
    this.scene.add(mesh); //网格模型添加到场景中;
    return mesh
  };
  //贝塞尔曲线 等 公共 纹理
  addTexture() {
    //用于流动线
    this.spriteLightTexture = new THREE.TextureLoader().load("./static/R/red_line.png")
    this.spriteLightTexture.wrapS = this.spriteLightTexture.wrapT = THREE.RepeatWrapping;
    this.spriteLightTexture.repeat.set(1, 1);
    this.spriteLightTexture.needsUpdate = !0;

    this.spriteLightTexture2 = new THREE.TextureLoader().load("./static/R/green_line.png")
    this.spriteLightTexture2.wrapS = this.spriteLightTexture2.wrapT = THREE.RepeatWrapping;
    this.spriteLightTexture2.repeat.set(1, 1);
    this.spriteLightTexture2.needsUpdate = !0;

    //用于精灵图 
    this.yingTexture = new THREE.TextureLoader().load("./static/img/ying.png")
    this.quTexture = new THREE.TextureLoader().load("./static/img/qu.png")
    this.zpTexture = new THREE.TextureLoader().load("./static/img/zp.png")

  }
  //添加 贝塞尔 飞线效果
  addFlyLine(arr) {
    !this.spriteLightTexture && this.addTexture();
    arr.forEach((e) => {
      //计算出中间点
      var r = e.from.clone().add(e.to.clone()).divideScalar(2);
      //自定义中间点的高度
      console.log(e.from.distanceTo(e.to),456)
      r.y = -2;
      //创建贝塞尔曲线
      var t = new THREE.QuadraticBezierCurve3(e.from, r, e.to),
        o = t.getPoints(5), //将贝塞尔曲线转换为多个点
        a = [];
      o.forEach(function (e) {
        return a.push([e.x, e.y, e.z])
      });
      //创建纹理
      var n = new THREE.MeshBasicMaterial({ map: this.spriteLightTexture2, side: THREE.BackSide, transparent: !0 }),
        i = this.createAnimateLine({ type: "pipe", pointList: a, material: n, number: 80, radius: 0.15 });
      this.scene.add(i)
    })
  }
  //添加 平顺 直线曲线 效果
  addRoadLine(arr) {
    !this.spriteLightTexture && this.addTexture();
    arr.forEach(
      (e, r) => {
        var t = new THREE.MeshBasicMaterial({ map: this.spriteLightTexture, side: THREE.BackSide, transparent: !0 }),
          o = this.createAnimateLine({ type: "pipe", pointList: e, material: t, number: 4, radius: 0.15 }); //制作飞线
        this.scene.add(o)
      }
    )
  }
  //通用函数
  createAnimateLine(option) {
    let curve
    if (option.kind === 'sphere') { // 由两点之间连线成贝塞尔曲线
      const sphereHeightPointsArgs = option.sphereHeightPointsArgs
      const pointList = app.getSphereHeightPoints(...sphereHeightPointsArgs) // v0,v3,n1,n2,p0
      curve = new THREE.CubicBezierCurve3(sphereHeightPointsArgs[0], pointList[0], pointList[1], sphereHeightPointsArgs[1])
    } else { // 由多个点数组构成的曲线 通常用于道路
      const l = []
      option.pointList.forEach(e => l.push(new THREE.Vector3(e[0], e[1], e[2])))
      curve = new THREE.CatmullRomCurve3(l) // 曲线路径
    }
    if (option.type === 'pipe') { // 使用管道线
      // 管道体
      const tubeGeometry = new THREE.TubeGeometry(curve, option.number || 50, option.radius || 1, option.radialSegments)
      return new THREE.Mesh(tubeGeometry, option.material)
    } else { // 使用 meshLine
      if (!MeshLine || !MeshLineMaterial) console.error('you need import MeshLine & MeshLineMaterial!')
      else {
        const geo = new THREE.Geometry()
        geo.vertices = curve.getPoints(option.number || 50)
        const meshLine = new MeshLine()
        meshLine.setGeometry(geo)
        return new THREE.Mesh(meshLine.geometry, option.material)
      }
    }
  }
  //渲染 动画
  render() {
    this.renderer.render(this.scene, this.camera);
    this.frameId = requestAnimationFrame(() => {
      this.render();
      //改变贴图位置实现特效
      this.spriteLightTexture && (this.spriteLightTexture.offset.x -= .01);
      this.spriteLightTexture2 && (this.spriteLightTexture2.offset.x -= .01);
      //控制器
      // console.log(this.camera.position,'相机')
      // console.log(this.controls.target)
      // this.animate();
      this.controls.update();
    });
  }
  //四种加载器
  loadFbx(url, fn) {
    var loader = new FBXLoader(); //创建一个FBX加载器
    loader.load(url, (obj) => {
      fn(obj)
    })
  }
  loadDea(path, fn) {
    let loader = new ColladaLoader();
    loader.load(path, (collada) => {
      var avatar = collada.scene.children[0];
      fn(avatar)
    });
  }
  loadGltf(path, fn) {
    var loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      fn(gltf.scene)
    }, undefined, function (e) {
      console.error(e);
    });
  }
  loadObj(path, mtl, obj, fn) {
    let self = this
    new MTLLoader()
      .setPath(path)
      .load(mtl, (materials) => {
        materials.preload();
        new OBJLoader()
          .setMaterials(materials)
          .setPath(path)
          .load(obj,
            (object) => {
              fn(object)
            });
      });
  }
  //销毁
  destroy(frameId) {
    if (frameId) cancelAnimationFrame(frameId) //销毁requestAnimationFrame
    this.renderer.forceContextLoss() //销毁context
    this.scene.dispose()
    this.controls.dispose()
    this.renderer = null
    this.scene = null
    this.camera = null
  }
  //事件
  setRaycaster() {
    this.eventOffset = {};
    var _this = this;

    function onMouseMove(event) {

      // calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components

      _this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      _this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      _this.eventOffset.x = event.clientX;
      _this.eventOffset.y = event.clientY;
      this.provinceInfo.style.left = _this.eventOffset.x + 2 + 'px';
      this.provinceInfo.style.top = _this.eventOffset.y + 2 + 'px';
    }

    window.addEventListener('mousemove', onMouseMove, false);

  }
  createText(text, position) {
    var shapes = this.font.generateShapes(text, 1);

    var geometry = new THREE.ShapeBufferGeometry(shapes);

    var material = new THREE.MeshBasicMaterial();

    var textMesh = new THREE.Mesh(geometry, material);
    textMesh.position.set(position.x, position.y, position.z);

    this.scene.add(textMesh);
  }
  //加载地图数据
  loadMapData() {
    let _this = this;
    // 加载json文件
    let loader = new THREE.FileLoader();
    loader.load('./static/R/china.json', function (data) {
      let jsonData = JSON.parse(data);
      _this.initMap(jsonData);
    });
  }
  initMap(chinaJson) {
    // 建一个空对象存放对象
    this.map = new THREE.Object3D();

    let _this = this;

    // 墨卡托投影转换


    chinaJson.features.forEach(elem => {
      // 定一个省份3D对象
      const province = new THREE.Object3D();
      // 每个的 坐标 数组
      const coordinates = elem.geometry.coordinates;
      // 循环坐标数组
      coordinates.forEach(multiPolygon => {

        multiPolygon.forEach(polygon => {
          const shape = new THREE.Shape();
          const lineMaterial = new THREE.LineBasicMaterial({
            color: '#24effe'
          });
          const lineGeometry = new THREE.Geometry();

          for (let i = 0; i < polygon.length; i++) {
            const [x, y] = this.projection(polygon[i]);
            if (i === 0) {
              shape.moveTo(x, -y);
            }
            shape.lineTo(x, -y);
            lineGeometry.vertices.push(new THREE.Vector3(x, -y, 4.01));
          }

          const extrudeSettings = {
            depth: 4,
            bevelEnabled: false
          };

          const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
          const material = new THREE.MeshBasicMaterial({
            color: '#02A1E2',
            transparent: true,
            opacity: 0.1
          });
          const material1 = new THREE.MeshBasicMaterial({
            color: '#3480C4',
            transparent: true,
            opacity: 0.5
          });
          /* const material = new THREE.MeshBasicMaterial({ color: '#dedede', transparent: false, opacity: 0.6 });
          const material1 = new THREE.MeshBasicMaterial({ color: '#dedede', transparent: false, opacity: 0.5 }); */
          const mesh = new THREE.Mesh(geometry, [material, material1]);
          const line = new THREE.Line(lineGeometry, lineMaterial);
          province.add(mesh);
          province.add(line)

        })

      })

      // 将geo的属性放到省份模型中
      province.properties = elem.properties;
      if (elem.properties.contorid) {
        const [x, y] = this.projection(elem.properties.contorid);
        province.properties._centroid = [x, y];
      }

      _this.map.add(province);

    })

    this.scene.add(this.map);
  }
  animate() {
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // calculate objects intersecting the picking ray
    var intersects = this.raycaster.intersectObjects(this.scene.children, true);
    if (this.activeInstersect && this.activeInstersect.length > 0) { // 将上一次选中的恢复颜色
      this.activeInstersect.forEach(element => {
        element.object.material[0].color.set('#02A1E2');
        element.object.material[1].color.set('#3480C4');
      });
    }

    this.activeInstersect = []; // 设置为空

    for (var i = 0; i < intersects.length; i++) {
      if (intersects[i].object.material && intersects[i].object.material.length === 2) {
        this.activeInstersect.push(intersects[i]);
        intersects[i].object.material[0].color.set(0xff0000);
        intersects[i].object.material[1].color.set(0xff0000);
        break; // 只取第一个
      }
    }
    this.createProvinceInfo();
  }
  createProvinceInfo() { // 显示省份的信息      
    if (this.activeInstersect.length !== 0 && this.activeInstersect[0].object.parent.properties.name) {
      var properties = this.activeInstersect[0].object.parent.properties;

      this.provinceInfo.textContent = properties.name;

      this.provinceInfo.style.visibility = 'visible';
    } else {
      this.provinceInfo.style.visibility = 'hidden';
    }


  }
  // 经纬度 转 xyz
  lgltxyz(arr) {
    const [x, y] = this.projection(arr);
    return { x: x, y: -y, z: 4.01 }
  }
  //画虚线
  xuLine() {
    // var lineGeometry = new THREE.Geometry();//生成几何体
    // lineGeometry.vertices.push(new THREE.Vector3(0, 10, 5));//线段的两个顶点
    // lineGeometry.vertices.push(new THREE.Vector3(4, -5, 5));
    // lineGeometry.vertices.push(new THREE.Vector3(0, -10, 5));


    // var line = new THREE.Line(lineGeometry, new THREE.LineDashedMaterial({
    //     color: '#fc5531',//线段的颜色
    //     dashSize: 0.5,//短划线的大小
    //     gapSize: 0.5//短划线之间的距离
    // }));
    // line.computeLineDistances();//不可或缺的，若无，则线段不能显示为虚线
    // this.scene.add(line);
  }
}