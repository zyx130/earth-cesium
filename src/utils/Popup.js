export const Popup = function(info) {
    this.constructor(info)
}
Popup.prototype.id = 0;
Popup.prototype.constructor = function(info) {
        var _this = this;
        _this.viewer = info.viewer; //弹窗创建的viewer
        _this.geometry = info.geometry; //弹窗挂载的位置
        _this.entitiName = info.entitiName;
        _this.id = "popup_" + _this.__proto__.id++;
        _this.ctn = document.createElement("div")
        _this.ctn.id = _this.id
        _this.ctn.className = 'bx-popup-ctn'
        _this.viewer.container.append(_this.ctn);
        //测试弹窗内容
        var testConfig = {
            content: `<div>${_this.entitiName}</div>`,
        }
        _this.ctn.innerHTML = _this.createHtml(testConfig.content);
        _this.render(_this.geometry);
        _this.eventListener = _this.viewer.clock.onTick.addEventListener(function(clock) {
            _this.render(_this.geometry);
        })
    }
    // 实时刷新
Popup.prototype.render = function(geometry) {
        try {
            var _this = this;
            var position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(_this.viewer.scene, geometry)
            let left = position.x - _this.ctn.offsetWidth / 2;
            let top = position.y - _this.ctn.offsetHeight;
            _this.ctn.style.left = left + "px"
            _this.ctn.style.top = top + "px"
        } catch {
            console.log("弹窗出错")
        }
    }
    // 动态生成内容
Popup.prototype.createHtml = function(content) {
        var html = `
            <div class="bx-popup-content-ctn" >
            <div class="bx-popup-content" >
            ${content}
            </div>
            </div>
           `;
        return html;
    }
    // 关闭弹窗按钮
Popup.prototype.close = function() {
    var _this = this;
    _this.ctn.remove();
    _this.viewer.clock.onTick.removeEventListener(_this.eventListener);
}