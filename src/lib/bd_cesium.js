export default {
    /**
     * 加载地球
     * @param {*} val 元素id
     */
    initViewerIntnet(val) {
        viewer = new Cesium.Viewer(val, {
            animation: false, // 左下角动画控制器
            baseLayerPicker: true, // 右上角图层控制器
            fullscreenButton: false, // 右下角全屏控制器
            vrButton: false, // 右下角VR控制器
            geocoder: false, // 右上角搜索控制器
            homeButton: false, // 右上角Home控制器
            sceneModePicker: true, // 右上角平面地图球体地图控制器
            timeline: false, // 下方时间轴控制器
            navigationHelpButton: false, // 右上角导航帮助控制器
            navigationInstructionsInitiallyVisible: false, // 右上角导航帮助控制器点开效果
            shouldAnimate: true, // 是否应尝试延长仿真时间
            shadows: true, // 确定阴影是否由光源投射
            terrainProvider: Cesium.createWorldTerrain(), // 地形数据
        });
        viewer.scene.debugShowFramesPerSecond = false; // 显示帧数(FPS)
        // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 80; //控制缩放大小
        // viewer.scene.screenSpaceCameraController.maximumZoomDistance = 2000000;
        // let css3Elements = [];
        // // this.Css3Renderer(css3Elements, true);
        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        let U = undefined
        let box1, box2, box3, box4, box5, box6;
        handler.setInputAction((click) => {
            var pick = new Cesium.Cartesian2(click.position.x, click.position.y);
            if (pick) {
                // 获取点击位置坐标
                var cartesian = viewer.scene.globe.pick(viewer.camera.getPickRay(pick), viewer.scene);
                var entiti = viewer.scene.pick(click.position)
            }
            var earthPosition = viewer.camera.pickEllipsoid(click.position, viewer.scene.globe.ellipsoid);
            var cartographic = Cesium.Cartographic.fromCartesian(earthPosition, viewer.scene.globe.ellipsoid, new Cesium.Cartographic());
            var lat = Cesium.Math.toDegrees(cartographic.latitude);
            var lng = Cesium.Math.toDegrees(cartographic.longitude);
            var height = cartographic.height;
            console.log("获取的坐标点", "lng" + lng, "lat" + lat, "h" + height);
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
        //视角调试方法
        viewer.scene.camera.moveEnd.addEventListener(function(e) {
            var camera = viewer.camera;
            Cesium.Math.toDegrees(viewer.camera.heading)
            Cesium.Math.toDegrees(viewer.camera.pitch) //Cesium.Math.toDegrees作用是把弧度转换成度数
                //将笛卡尔坐标转化为经纬度坐标
            var catographic = Cesium.Cartographic.fromCartesian(camera.position);
            // 此处是经纬度，单位：度。
            var longitude = Number(Cesium.Math.toDegrees(catographic.longitude).toFixed(6));
            var latitude = Number(Cesium.Math.toDegrees(catographic.latitude).toFixed(6));
            var height = Number(catographic.height.toFixed(2));
            console.log("相机视角位置", longitude, latitude, height, camera)

        });

    },
}