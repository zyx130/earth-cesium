import Store from '@/store/index.js';
import { Popup } from '@/utils/Popup.js';
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
                if (cartesian && entiti) {
                    switch (entiti.id.id) {
                        case "box1":
                            if (box1 == U) {
                                console.log(entiti.id)
                                box1 = new Popup({
                                    viewer: viewer,
                                    geometry: cartesian,
                                    entitiName: entiti.id.entityName
                                })
                            } else {
                                box1.close()
                                box1 = U
                            }
                            break;
                        case "box2":
                            if (box2 == U) {
                                box2 = new Popup({
                                    viewer: viewer,
                                    geometry: cartesian,
                                    entitiName: entiti.id.entityName
                                })
                            } else {
                                box2.close()
                                box2 = U
                            }
                            break;
                        case "box3":
                            if (box3 == U) {
                                box3 = new Popup({
                                    viewer: viewer,
                                    geometry: cartesian,
                                    entitiName: entiti.id.entityName
                                })
                            } else {
                                box3.close()
                                box3 = U
                            }
                            break;
                        case "box4":
                            if (box4 == U) {
                                box4 = new Popup({
                                    viewer: viewer,
                                    geometry: cartesian,
                                    entitiName: entiti.id.entityName
                                })
                            } else {
                                box4.close()
                                box4 = U
                            }
                            break;
                        case "box5":
                            if (box5 == U) {
                                box5 = new Popup({
                                    viewer: viewer,
                                    geometry: cartesian,
                                    entitiName: entiti.id.entityName
                                })
                            } else {
                                box5.close()
                                box5 = U
                            }
                            break;
                        case "box6":
                            if (box6 == U) {
                                box6 = new Popup({
                                    viewer: viewer,
                                    geometry: cartesian,
                                    entitiName: entiti.id.entityName
                                })
                            } else {
                                box6.close()
                                box6 = U
                            }
                            break;
                    }
                }
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

    /**
     * 入场旋转
     * @param {*} val 位置数据
     * @param {*} cameraHeight 相机高度
     */
    rotate(val, heading, pitch, roll) {
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(
                val.lat,
                val.lon,
                val.h
            ),
            orientation: {
                heading: heading, //东西南北朝向
                pitch: pitch, //俯视仰视视觉
                roll: roll
            },
            duration: 3
        });


        // viewer.camera.setView({
        //     destination: new Cesium.Cartesian3(-1371203.1456494154, -5508700.033950869,
        //         2901802.2749172337
        //     ),
        //     orientation: {
        //         heading: Cesium.Math.toRadians(67.64973594265429),
        //         pitch: Cesium.Math.toRadians(-8.158676059409297),
        //         roll: Cesium.Math.toRadians(359.9999987450017),
        //     },
        //     maximumHeight: 100,
        // })
    },
    /**
     * 围墙
     * @param {*} val 位置信息及高度
     */
    wall(val) {
        var alp = 1;
        var num = 0;
        //绘制墙
        var wyoming = viewer.entities.add({
            name: "动态立体墙",
            wall: {
                show: true,
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(val),
                material: new Cesium.ImageMaterialProperty({
                    image: require("../assets/hong3.png"),
                    transparent: true,
                    color: new Cesium.CallbackProperty(function() {
                        if ((num % 2) === 0) {
                            alp -= 0.005;
                        } else {
                            alp += 0.005;
                        }

                        if (alp <= 0.3) {
                            num++;
                        } else if (alp >= 1) {
                            num++;
                        }
                        return Cesium.Color.WHITE.withAlpha(alp)
                            //entity的颜色透明 并不影响材质，并且 entity也会透明
                    }, false)
                })
            }
        });


    },
    /**
     * 背景色
     * @param {*} val 位置信息
     */
    land() {
        var positions = Cesium.Cartesian3.fromDegreesArray([
            122.6414966583252,
            45.94351068030587,
            122.65085220336914,
            45.94351068030587,
            122.64707565307616,
            45.830129946752635,
            122.64548778533936,
            45.830129946752635,
            122.6414966583252,
            45.94351068030587,
        ]);

        viewer.entities.add({
            // rectangle: {
            //     //Cesium.Rectangle.fromDegrees (西经,南纬,东经,北纬)
            //     coordinates: Cesium.Rectangle.fromDegrees(
            //         122.63763427734376,
            //         45.83302431524494,
            //         122.64810562133789,
            //         45.943749415190254),
            //     material: getColorRamp([1, 0.05, 0.1, 0.15, 0.37, 0.54, 1.0], true)
            // }
            name: '多边形',
            polygon: {
                hierarchy: positions,
                material: getColorRamp(),
                arcType: Cesium.ArcType.RHUMB,
                perPositionHeight: false, //允许三角形使用点的高度
            },
            clampToGround: true
        });

        function getColorRamp() {
            var ramp = document.createElement('canvas');
            ramp.width = 1;
            ramp.height = 100;
            var ctx = ramp.getContext('2d');
            // ctx.globalAlpha = 0.5
            var grd = ctx.createLinearGradient(0, 0, 0, 100);
            grd.addColorStop(1, 'rgba(54,207,75,0.2)'); //black
            grd.addColorStop(0.5, 'rgba(255,246,11,0.2) '); //黄
            grd.addColorStop(0, '	rgba(255,0,0,0.7)'); //红
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, 1, 100);
            return ramp;
        }
        // var heading = -1.57;
        // var pitch = 0
        // var roll = 0;
        // var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        // viewer.entities.add({
        //     name: '扇形',
        //     position: Cesium.Cartesian3.fromDegrees(122.64654173639484, 45.82933938896586, 270.0),
        //     orientation: Cesium.Transforms.headingPitchRollQuaternion(
        //         Cesium.Cartesian3.fromDegrees(122.64654173639484, 45.82933938896586, 270.0),
        //         hpr
        //     ),
        //     ellipsoid: {
        //         radii: new Cesium.Cartesian3(12500.0, 1000.0, 1000.0), // 扇形半径
        //         innerRadii: new Cesium.Cartesian3(1, 1, 1), // 内半径
        //         minimumClock: Cesium.Math.toRadians(-20), // 左右偏角
        //         maximumClock: Cesium.Math.toRadians(20),
        //         minimumCone: Cesium.Math.toRadians(80), // 上下偏角  可以都设置为90
        //         maximumCone: Cesium.Math.toRadians(90),
        //         material: getColorRamp(),
        //     }
        // });
    },
    /**
     * 椭圆
     * @param {*} val 位置信息
     */
    bomb(val) {
        viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(val.lat, val.lon),
            name: "Red ellipse on surface",
            ellipse: {
                semiMinorAxis: 800.0,
                semiMajorAxis: 800.0,
                height: 280,
                // Cesium.Color.FIREBRICK.withAlpha(0.7)
                material: Cesium.Color.FIREBRICK.withAlpha(0.8)
            },
        });
    },
    /**
     * 几何体
     * @param {*} val 位置信息
     */
    addBillboard(val) {
        var czml = [{
                id: "document",
                name: "CZML Geometries: Cones and Cylinders",
                version: "1.0",
            },
            {
                id: "shape2",
                position: {
                    cartographicDegrees: [
                        val.lat,
                        val.log,
                        4000.0,
                    ],
                },
                cylinder: {
                    length: 6000.0,
                    topRadius: 1000.0,
                    bottomRadius: 4000.0,
                    material: {
                        solidColor: {
                            color: {
                                rgba: [255, 0, 0, 255],
                            },
                        },
                    },
                },
            },
        ];
        var dataSourcePromise = Cesium.CzmlDataSource.load(czml);
        viewer.dataSources.add(dataSourcePromise);
        // viewer.zoomTo(dataSourcePromise);
    },
    /**
     * 雪着色器
     */
    getSnow_fs() {
        return 'uniform sampler2D colorTexture;\n' +
            'varying vec2 v_textureCoordinates;\n' +
            'float snow(vec2 uv,float scale)\n' +
            '{\n' +
            '    float time = czm_frameNumber / 60.0;\n' +
            '    float w=smoothstep(1.,0.,-uv.y*(scale/10.));if(w<.1)return 0.;\n' +
            '    uv+=time/scale;uv.y+=time*2./scale;uv.x+=sin(uv.y+time*.5)/scale;\n' +
            '    uv*=scale;vec2 s=floor(uv),f=fract(uv),p;float k=3.,d;\n' +
            '    p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;d=length(p);k=min(d,k);\n' +
            '    k=smoothstep(0.,k,sin(f.x+f.y)*0.01);\n' +
            '    return k*w;\n' +
            '}\n' +
            'void main(void){\n' +
            '     vec2 resolution = czm_viewport.zw;\n' +
            '     vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n' +
            '     vec3 finalColor=vec3(0);\n' +
            '     float c = 0.0;\n' +
            '     c+=snow(uv,30.)*.0;\n' +
            '     c+=snow(uv,20.)*.0;\n' +
            '     c+=snow(uv,15.)*.0;\n' +
            '     c+=snow(uv,10.);\n' +
            '     c+=snow(uv,8.);\n' +
            '     c+=snow(uv,6.);\n' +
            '     c+=snow(uv,5.);\n' +
            '     finalColor=(vec3(c));\n' +
            '     gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(finalColor,1), 0.3);\n' +
            '}';
    },
    /**
     * 雨着色器
     */
    getRain_fs() {
        return "uniform sampler2D colorTexture;\n\
                varying vec2 v_textureCoordinates;\n\
            \n\
                float hash(float x){\n\
                    return fract(sin(x*133.3)*13.13);\n\
            }\n\
            \n\
            void main(void){\n\
            \n\
                float time = czm_frameNumber / 60.0;\n\
            vec2 resolution = czm_viewport.zw;\n\
            \n\
            vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n\
            vec3 c=vec3(.6,.7,.8);\n\
            \n\
            float a=-.4;\n\
            float si=sin(a),co=cos(a);\n\
            uv*=mat2(co,-si,si,co);\n\
            uv*=length(uv+vec2(0,4.9));\n\
            \n\
            float v=1.-sin(hash(floor(uv.x*100.))*2.);\n\
            float b=clamp(abs(sin(20.*time*v+uv.y*(5./(2.+v))))-.95,0.,1.)*20.;\n\
            c*=v*b; \n\
            \n\
            gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(c,1), 0.3);  \n\
            }\n\
        ";
    },
    /**
     * 雾气着色器
     */
    getFog_fs() {
        return 'uniform sampler2D colorTexture;\n' +
            '  uniform sampler2D depthTexture;\n' +
            '  varying vec2 v_textureCoordinates;\n' +
            '  void main(void)\n' +
            '  {\n' +
            '      vec4 origcolor=texture2D(colorTexture, v_textureCoordinates);\n' +
            '      vec4 fogcolor=vec4(0.8,0.8,0.8,0.3);\n' +
            '      float depth = czm_readDepth(depthTexture, v_textureCoordinates);\n' +
            '      vec4 depthcolor=texture2D(depthTexture, v_textureCoordinates);\n' +
            '      float f=(depthcolor.r-0.7)/0.2;\n' +
            '      f = 0.3;\n' +
            '      gl_FragColor = mix(origcolor,fogcolor,f);\n' +
            '   }';
    },
    /**
     * 粒子爆炸效果
     * @param {*} val 位置信息
     * @param {*} particleHeight 高度
     */
    blowUp(val, particleHeight) {
        var staticPosition = Cesium.Cartesian3.fromDegrees(
            val.lat,
            val.log,
            particleHeight
        );
        var entity44 = viewer.entities.add({
            position: staticPosition,
        });

        function computeModelMatrix(entity, time) {
            var position = Cesium.Property.getValueOrUndefined(entity.position);
            let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);
            return modelMatrix;
        }

        function computeEmitterModelMatrix() {
            let hpr = Cesium.HeadingPitchRoll.fromDegrees(0, 0, 0);
            let trs = new Cesium.TranslationRotationScale();
            trs.translation = Cesium.Cartesian3.fromElements(0, 0, 500);
            trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr);
            let result = Cesium.Matrix4.fromTranslationRotationScale(trs);
            return result;
        }
        viewer.scene.primitives.add(
            new Cesium.ParticleSystem({
                image: require("@/assets/smoke.png"),
                loop: false,
                startColor: Cesium.Color.RED.withAlpha(1),
                endColor: Cesium.Color.YELLOW.withAlpha(0.3),
                startScale: 0,
                endScale: 10,
                minimumParticleLife: 1,
                maximumParticleLife: 6,
                minimumSpeed: 1,
                maximumSpeed: 4,
                imageSize: new Cesium.Cartesian2(10, 10),
                emissionRate: 4,
                particleSize: 25,
                lifetime: 3.0,
                emitter: new Cesium.CircleEmitter(5.0),
                //将粒子系统从模型转换为世界坐标的4x4变换矩阵
                modelMatrix: computeModelMatrix(entity44),
                //在粒子系统局部坐标系中变换粒子系统发射器的4x4变换矩阵
                emitterModelMatrix: computeEmitterModelMatrix(),
            })
            // Particles per second.
            //cesium内置的发射器，圆形发射器，因此参数是一个半径值
            //还有锥形发射器，new Cesium.ConeEmitter(Cesium.Math.toRadians(45.0))
            //长方形发射器，new Cesium.BoxEmitter(new Cesium.Cartesian3(1.0, 1.0, 1.0))
            //半球发射器，new Cesium.SphereEmitter(0.5)
            //将粒子系统从模型转换为世界坐标的4x4变换矩阵
            //在粒子系统局部坐标系中变换粒子系统发射器的4x4变换矩阵

        );
        //恢复粒子函数状态
        Store.commit("SET_Landing", false)
    },
    /**
     * DD发射效果
     * @param {*} pos1Position 发射位置
     * @param {*} pos2Position 平飞start位置
     * @param {*} pos3Position 平飞stop位置
     * @param {*} pos2Position 降落stop位置
     */
    Misslied(pos1Position, pos2Position, pos3Position, pos4Position, trajectory) {

        //Set the random number seed for consistent results.
        Cesium.Math.setRandomNumberSeed(3);
        //Set bounds of our simulation time
        var start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
        var stop = Cesium.JulianDate.addSeconds(start, 134, new Cesium.JulianDate());
        //Make sure viewer is at the desired time.
        viewer.clock.startTime = start.clone();
        viewer.clock.stopTime = stop.clone();
        viewer.clock.currentTime = start.clone();
        viewer.clock.clockRange = Cesium.ClockRange.CLAMPED; //Loop at the end
        viewer.clock.multiplier = 2.5;
        viewer.clock.shouldAnimate = true;

        var viewModel = {
            emissionRate: 50,
            gravity: 0,
            minimumParticleLife: 1,
            maximumParticleLife: 1,
            minimumSpeed: 5,
            maximumSpeed: 5,
            startScale: 1,
            endScale: 4,
            particleSize: 5,
        };
        Cesium.knockout.track(viewModel);

        function computeModelMatrix(entity, time) {
            return entity.computeModelMatrix(time, new Cesium.Matrix4());
        }
        var emitterModelMatrix = new Cesium.Matrix4();
        var translation = new Cesium.Cartesian3();
        var rotation = new Cesium.Quaternion();
        var hpr = new Cesium.HeadingPitchRoll();
        var trs = new Cesium.TranslationRotationScale();

        function computeEmitterModelMatrix() {
            hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, hpr);
            trs.translation = Cesium.Cartesian3.fromElements(-30.0,
                0.0,
                0.0,
                translation
            );
            trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);
            return Cesium.Matrix4.fromTranslationRotationScale(
                trs,
                emitterModelMatrix
            );
        }
        let a1 = this.addParabola22({
            d1: {
                lat: pos1Position.lat,
                lon: pos1Position.lon,
                height: 500
            },
            d2: {
                lat: pos2Position.lat,
                lon: pos2Position.lon,
                height: 0
            },
            height: 2000
        })
        let a2 = this.addParabola22({
            d1: {
                lat: pos4Position.lat,
                lon: pos4Position.lon,
                height: 0
            },
            d2: {
                lat: pos3Position.lat,
                lon: pos3Position.lon,
                height: 0
            },
            height: 2000
        })
        let arr = this.getNewRollPoint(a1, 2000)
        let b3 = [...a1, ...arr, ...a2.reverse()]
        var property = new Cesium.SampledPositionProperty();
        for (var i = 0; i < b3.length; i++) {
            var time = Cesium.JulianDate.addSeconds(
                start,
                i,
                new Cesium.JulianDate()
            );
            var position = Cesium.Cartesian3.fromDegrees(
                b3[i][1],
                b3[i][0],
                b3[i][2]
            );
            property.addSample(time, position);
        }
        var entity = viewer.entities.add({
            availability: new Cesium.TimeIntervalCollection([
                new Cesium.TimeInterval({
                    start: start,
                    stop: stop
                }),
            ]),
            model: {
                uri: "./static/model/launchvehicle.glb",
                scale: 1.0,
                minimumPixelSize: 64,
            },
            //将路径显示为以1秒增量采样的粉红色线。
            path: {
                resolution: 1,
                // MaterialProperty: 材质
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.1,
                    color: Cesium.Color.DODGERBLUE,
                }),
                width: 8,
            },
            viewFrom: new Cesium.Cartesian3(-20000.0, -10000.0, 10.0),
            position: property,
            orientation: new Cesium.VelocityOrientationProperty(property),
        });
        viewer.trackedEntity = entity;
        var scene = viewer.scene;

        function getImage() {
            var particleCanvas;
            if (!Cesium.defined(particleCanvas)) {
                particleCanvas = document.createElement("canvas");
                particleCanvas.width = 20;
                particleCanvas.height = 20;
                var context2D = particleCanvas.getContext("2d");
                context2D.beginPath();
                context2D.arc(8, 8, 8, 0, Cesium.Math.TWO_PI, true);
                context2D.closePath();
                context2D.fillStyle = "rgb(255, 255, 255)";
                context2D.fill();
            }
            return particleCanvas;
        }

        var particleSystem = scene.primitives.add(
            new Cesium.ParticleSystem({
                // image: require("../assets/smoke.png"),
                image: getImage(),
                startColor: Cesium.Color.WHITE.withAlpha(1),
                endColor: Cesium.Color.WHITE.withAlpha(0.5),
                startScale: viewModel.startScale,
                endScale: viewModel.endScale,
                minimumParticleLife: viewModel.minimumParticleLife,
                maximumParticleLife: viewModel.maximumParticleLife,
                minimumSpeed: viewModel.minimumSpeed,
                maximumSpeed: viewModel.maximumSpeed,
                imageSize: new Cesium.Cartesian2(
                    viewModel.particleSize,
                    viewModel.particleSize
                ),
                emissionRate: viewModel.emissionRate, //每秒发送粒子的数量
                bursts: [
                    // these burst will occasionally sync to create a multicolored effect
                    new Cesium.ParticleBurst({
                        time: 5.0,
                        minimum: 10,
                        maximum: 100,
                    }),
                    new Cesium.ParticleBurst({
                        time: 10.0,
                        minimum: 50,
                        maximum: 100,
                    }),
                    new Cesium.ParticleBurst({
                        time: 15.0,
                        minimum: 200,
                        maximum: 300,
                    }),
                ],
                lifetime: 0.1, //粒子系统发射粒子的时间 /秒
                emitter: new Cesium.BoxEmitter(new Cesium.Cartesian3(10.0, 1.0, 1.0)),
                emitterModelMatrix: computeEmitterModelMatrix(),
                updateCallback: applyGravity,
            })
        );
        var gravityScratch = new Cesium.Cartesian3();

        function applyGravity(p, dt) {
            // We need to compute a local up vector for each particle in geocentric space.
            // console.log(p.position, "34567890"s)
            var position = p.position;
            Cesium.Cartesian3.normalize(position, gravityScratch);
            Cesium.Cartesian3.multiplyByScalar(
                gravityScratch,
                viewModel.gravity * dt,
                gravityScratch
            );
            p.velocity = Cesium.Cartesian3.add(
                p.velocity,
                gravityScratch,
                p.velocity
            );
        }
        let Time;
        viewer.scene.preUpdate.addEventListener((scene, time) => {
            Time = parseInt(time.secondsOfDay.toString().split('.')[0]) + 1
            if (viewer.clock.stopTime.secondsOfDay == Time) {
                Store.commit("SET_Landing", true)
                viewer.scene.primitives.remove(particleSystem)
                viewer.scene.primitives.remove(entity)
                    //漫游视觉
                this.rotate({
                        lat: 122.457578,
                        lon: 45.765227,
                        h: 9175.13,
                    },
                    0.9979659015047186, -0.4428335243327317,
                    0.0031254875916166824
                );
            }
            if (Time == 72125) {
                viewer.trackedEntity = undefined;
                this.rotate({ lon: 45.947537, lat: 122.590675, h: 972.23 }, 2.03479846151742, -0.10690144937552937, 0.003018769980624114)
            }
            particleSystem.modelMatrix = computeModelMatrix(entity, time);
            // Account for any changes to the emitter model matrix.
            particleSystem.emitterModelMatrix = computeEmitterModelMatrix();
        });
    },
    /**
     * 加载模型gltf
     * @param {*} pos1Position 发射位置
     * @param {*} model 模型地址
     */
    addFengjiModel2(pos1Position, model, option, scale, Roll) {
        var position = Cesium.Cartesian3.fromDegrees(pos1Position.lat, pos1Position.lon + 0.004, pos1Position.h);
        // 设置模型方向
        var hpRoll = new Cesium.HeadingPitchRoll(Roll, 0, 0, 0);
        // 生成一个函数，该函数从以提供的原点为中心的参考帧到提供的椭圆体的固定参考帧计算4x4变换矩阵。
        var fixedFrame = Cesium.Transforms.localFrameToFixedFrameGenerator('north', 'west');
        let a = viewer.scene.primitives.add(Cesium.Model.fromGltf({
            // 资源路径
            url: model,
            //模型id
            id: {
                id: option.id,
                entityName: option.name
            },
            p: pos1Position,
            // 模型矩阵
            modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(position, hpRoll, Cesium.Ellipsoid.WGS84, fixedFrame, position),
            // 模型最小刻度
            minimumPixelSize: scale,
            // 模型标尺
            scale: scale,
            // 模型最大刻度
            maximumScale: scale,
            // rotationX: Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(90))),
            // 仅用于调试。显示模型绘制时的边界球。
            debugShowBoundingVolume: false,
            // 仅用于调试，显示魔仙绘制时的线框
            debugWireframe: false,
            clampToGround: true, //贴地
        }));
    },
    //绘制抛物线
    addParabola22(data) {
        let center = data.d1; //起始点
        let cities = data.d2; //可以为多组哦
        let points = this.parabolaEquation({ pt1: center, pt2: cities, height: data.height, num: 100 });
        let pointArr = [];
        for (let i = 0; i < points.length; i++) {
            pointArr.push([points[i][0], points[i][1], points[i][2]]);
        }
        return pointArr.slice(0, (parseInt(pointArr.length / 2) + 1));
    },
    //抛物线方程
    parabolaEquation(options, resultOut) {
        let U = undefined;
        //方程 y=-(4h/L^2)*x^2+h h:顶点高度 L：横纵间距较大者
        const h = options.height;
        const L = Math.abs(options.pt1.lon - options.pt2.lon) > Math.abs(options.pt1.lat - options.pt2.lat) ? Math.abs(options.pt1.lon - options.pt2.lon) : Math.abs(options.pt1.lat - options.pt2.lat);
        const num = options.num && options.num > 50 ? options.num : 50;
        const result = [];
        let dlt = L / num;
        if (Math.abs(options.pt1.lon - options.pt2.lon) > Math.abs(options.pt1.lat - options.pt2.lat)) { //以lon为基准
            const delLat = (options.pt2.lat - options.pt1.lat) / num;
            if (options.pt1.lon - options.pt2.lon > 0) {
                dlt = -dlt;
            }
            for (let i = 0; i < num; i++) {
                const tempH = h - Math.pow((-0.5 * L + Math.abs(dlt) * i), 2) * 4 * h / Math.pow(L, 2);
                const lon = options.pt1.lon + dlt * i;
                const lat = options.pt1.lat + delLat * i;
                result.push([lon, lat, tempH]);
            }
        } else { //以lat为基准
            let delLon = (options.pt2.lon - options.pt1.lon) / num;
            if (options.pt1.lat - options.pt2.lat > 0) {
                dlt = -dlt;
            }
            for (let i = 0; i < num; i++) {
                const tempH = h - Math.pow((-0.5 * L + Math.abs(dlt) * i), 2) * 4 * h / Math.pow(L, 2);
                const lon = options.pt1.lon + delLon * i;
                const lat = options.pt1.lat + dlt * i;
                result.push([lon, lat, tempH]);
            }
        }
        if (resultOut !== U) {
            resultOut = result;
        }
        // 落地
        result.push([options.pt2.lon, options.pt2.lat, options.pt2.height || 0])
        return result;
    },
    //生成下一个坐标点 res=list
    getNewRollPoint(a, h) {
        let b1log = a[1][0]
        let b2log = a[0][0]
        let b3log = b1log - b2log
        let b1lat = a[1][1]
        let b2lat = a[0][1]
        let b3lat = b1lat - b2lat
        let lon = a[a.length - 1][0]
        let lat = a[a.length - 1][1]
        let arr = []
        for (let i = 0; i < 35; i++) {
            arr.push([lon += b3log, lat += b3lat, h])
        }
        return arr
    },
    //双圈涟沥
    shuang(position) {
        this.addDoubleCircleRipple({
            id: ['1', '2'],
            lon: position.lat,
            lat: position.lon,
            height: 300,
            maxR: 1000,
            minR: 100, //最好为0
            deviationR: 7, //差值 差值也大 速度越快
            eachInterval: 1500, //两个圈的时间间隔
            imageUrl: require("../assets/home/red.png")
        })
    },
    /**
     *两个圆扩散纹理
     * */
    addDoubleCircleRipple(data) {
        let r1 = data.minR,
            r2 = data.minR
        let entiti2;
        let entiti1;

        function changeR1() {
            r1 = r1 + data.deviationR
            if (r1 >= data.maxR) {
                r1 = data.minR
            }
            return r1;
        }

        function changeR2() {
            r2 = r2 + data.deviationR
            if (r2 >= data.maxR) {
                r2 = data.minR
            }
            return r2
        }
        entiti1 = viewer.entities.add({
            name: "涟漪1",
            id: data.id[0],
            position: Cesium.Cartesian3.fromDegrees(data.lon, data.lat, data.height),
            ellipse: {
                semiMinorAxis: new Cesium.CallbackProperty(changeR1, false),
                semiMajorAxis: new Cesium.CallbackProperty(changeR1, false),
                height: data.height,
                material: new Cesium.ImageMaterialProperty({
                    image: data.imageUrl,
                    repeat: new Cesium.Cartesian2(1.0, 1.0),
                    transparent: true,
                    color: new Cesium.CallbackProperty(function() {
                        return Cesium.Color.WHITE.withAlpha(1 - r1 / data.maxR) //entity的颜色透明 并不影响材质，并且 entity也会透明哦
                    }, false)
                })
            }
        })
        setTimeout(() => {
            entiti2 = viewer.entities.add({
                name: "涟漪2",
                id: data.id[1],
                position: Cesium.Cartesian3.fromDegrees(data.lon, data.lat, data.height),
                ellipse: {
                    semiMinorAxis: new Cesium.CallbackProperty(changeR2, false),
                    semiMajorAxis: new Cesium.CallbackProperty(changeR2, false),
                    height: data.height,
                    material: new Cesium.ImageMaterialProperty({
                        image: data.imageUrl,
                        repeat: new Cesium.Cartesian2(1.0, 1.0),
                        transparent: true,
                        color: new Cesium.CallbackProperty(function() {
                            return Cesium.Color.WHITE.withAlpha(1 - r1 / data.maxR) //entity的颜色透明 并不影响材质，并且 entity也会透明哦
                        }, false)
                    })
                }
            })
        }, data.eachInterval)
        setTimeout(() => {
            viewer.entities.remove(entiti2);
            viewer.entities.remove(entiti1);
        }, 5000)
    },
    /**
     * @params
     */
    /*
    流动纹理线
     color 颜色
     duration 持续时间 毫秒
    */

    line() {
        this.loopMaterial = new Cesium.PolylineTrailLinkMaterialProperty(
            Cesium.Color.AQUA,
            3750
        )

        function PolylineTrailLinkMaterialProperty(color, duration) {
            this._definitionChanged = new Cesium.Event()
            this._color = undefined
            this._colorSubscription = undefined
            this.color = color
            this.duration = duration
            this._time = new Date().getTime()
        }
        Cesium.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
            isConstant: {
                get: function() {
                    return false
                }
            },
            definitionChanged: {
                get: function() {
                    return this._definitionChanged
                }
            },
            color: Cesium.createPropertyDescriptor('color')
        })
        PolylineTrailLinkMaterialProperty.prototype.getType = function(time) {
            return 'PolylineTrailLink'
        }
        PolylineTrailLinkMaterialProperty.prototype.getValue = function(time, result) {
            // debugger
            if (!Cesium.defined(result)) {
                result = {}
            }
            result.color = Cesium.Property.getValueOrClonedDefault(
                this._color,
                time,
                Cesium.Color.WHITE,
                result.color
            )
            result.image = Cesium.Material.PolylineTrailLinkImage
            result.time =
                ((new Date().getTime() - this._time) % this.duration) / this.duration
            return result
        }
        PolylineTrailLinkMaterialProperty.prototype.equals = function(other) {
            return (
                this === other ||
                (other instanceof PolylineTrailLinkMaterialProperty &&
                    Property.equals(this._color, other._color))
            )
        }
        Cesium.PolylineTrailLinkMaterialProperty = PolylineTrailLinkMaterialProperty
        Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink'
        Cesium.Material.PolylineTrailLinkImage = require('../assets/home/line.png')
        Cesium.Material.PolylineTrailLinkSource =
            'czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                                            {\n\
                                                                 czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                                 vec2 st = materialInput.st;\n\
                                                                 vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
                                                                 material.alpha = colorImage.a * color.a;\n\
                                                                 material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
                                                                 return material;\n\
                                                             }'
        Cesium.Material._materialCache.addMaterial(
            Cesium.Material.PolylineTrailLinkType, {
                fabric: {
                    type: Cesium.Material.PolylineTrailLinkType,
                    uniforms: {
                        color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
                        image: Cesium.Material.PolylineTrailLinkImage,
                        time: 0
                    },
                    source: Cesium.Material.PolylineTrailLinkSource
                },
                translucent: function(material) {
                    return true
                }
            }
        )

    }

}