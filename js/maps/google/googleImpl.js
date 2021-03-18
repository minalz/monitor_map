TUI.Core.create({
    name: "TUI.map.GoogleImpl",
    extend: TUI.map.BaseMap,
    init: function () {
        this.isShowTraffic = true;
        this.layer = new google.maps.TrafficLayer();                            // 创建地图控件
    },

    methods: {
        // 创建地图
        createMap: function () {
            // 初始化标签类
            try {
                initLabelMarker();
                // var maptypeid = google.maps.MapTypeId.ROADMAP;
                // if (maptype == 3)
                //     maptypeid = google.maps.MapTypeId.HYBRID;
                var centerPoint = this._newLngLat(121.504485, 31.305592); //{lat: 31.305592, lng: 121.504485},
                var mapOptions = {
                    // mapTypeId: maptypeid,
                    zoom: 5,
                    minZoom:3,
                    center: centerPoint,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoomControl: true, // 启用/禁用缩放控件
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.LEFT_TOP
                    },
                    mapTypeControl: false, // 启用/禁用允许用户在地图类型（例如地图和卫星）之间切换的地图类型控件
                    scaleControl: false, // 启用/禁用提供简单地图比例的“缩放”控件
                    streetViewControl: false, // 启用/禁用Pegman控件
                    rotateControl: false, // 启用/禁用旋转控件的外观以控制45°图像的方向
                    fullscreenControl: false, // 是否全屏 此控件在移动设备上可见，在桌面上不可见
                    gestureHandling: 'greedy', // 属性设置 greedy为触摸屏和移动设备，以允许用户在用户滑动（拖动）屏幕时平移地图（向上或向下，向左或向右）。换句话说，单指滑动和双指滑动都可以使地图平移。
                };
                this._map = new google.maps.Map(TUI.Dom.$(this._mapPanel), mapOptions);
                this.lazyLoadControl();
            } catch (e) {

            }
        },
        lazyLoadControl: function () {
            var self = this;
            self.createControl();
        },
        //路况
        toggleTrafficLayer: function () {
            var self = this;
            var trafficDiv = TUI.Dom.$("trafficControl");
            if (this.isShowTraffic) {
                trafficDiv.style.backgroundColor = "rgb(111, 165, 219)";
                this.layer.setMap(self._map);
                this.isShowTraffic = false;
            } else {
                trafficDiv.style.backgroundColor = "rgb(238, 238, 238)";
                this.layer.setMap(null);
                this.isShowTraffic = true;
            }
        },
        // 拉框放大
        dragMax: function () {
            this._map.setZoom(this._map.getZoom() + 1);
        },
        // 拉框缩小
        dragMin: function () {
            this._map.setZoom(this._map.getZoom() - 1);
        },
        // 移动地图
        moveMap: function () {
        },
        getZoom: function () {
            return this._map.getZoom();
        },
        // 自定义测距方法
        range: function () {
            var self = this;
            var poly = new google.maps.Polyline({
                strokeColor: "green",
                strokeOpacity: 0.7,
                strokeWeight: 3
            });
            self.startDrawing(poly, function (poly) {
                var dis = 0, path = poly.getPath();
                for (var i = 0; i < path.getLength() - 1; i++) {
                    var src = path.getAt(i);
                    var des = path.getAt(i + 1);
                    dis += google.maps.geometry.spherical.computeDistanceBetween(src, des);
                }
                if (dis < 1000) {
                    alert(dis.toFixed(0) + "m")
                } else {
                    alert((dis / 1000).toFixed(2) + "km");
                }
                self._removeOverlay(poly);
            });
        },
        // 基本函数，显示全国图
        fullMap: function () {
            this.setCenter(110.397, 36.917, 5);
        },
        // 设置中心点
        setCenter: function (lng, lat, zoom) {
            var lngLat = this._newLngLat(lng, lat);
            this._map.setCenter(lngLat);
            this._map.setZoom(zoom);
        },
        // 锁定视窗
        lockWindowByLngLat: function (lngLat) {
            // var lo = lngLat.lng(), la = lngLat.lat();
            var bounds = this._map.getBounds();
            var isExist = bounds.contains(lngLat);
            if(!isExist){
                this._map.panTo(lngLat);
            }
            // if (!bounds)
            //     return;
            //
            // var left = bounds.getSouthWest().lng();	//西南 经度
            // var down = bounds.getSouthWest().lat();	//西南 维度
            // var right = bounds.getNorthEast().lng();	//东北 经度
            // var up = bounds.getNorthEast().lat();	//东北 维度
            // if (lo < left || lo > right || la < down || la > up) {
            //     this._map.setCenter(lngLat);
            // }
        },
        // 最佳视窗效果
        _setFitview: function (overlays) {
            var self = this, lngLats = [];
            for (var i = 0; i < overlays.length; i++) {
                var item = overlays[i];
                if (item instanceof LabelMarker) {
                    lngLats.push(item.getMarker().getPosition());
                }
                else if (item instanceof google.maps.Polyline || item instanceof google.maps.Polygon) {
                    lngLats = lngLats.concat(item.getPath().getArray());
                }
            }
            var maxLng = lngLats[0].lng(), maxLat = lngLats[0].lat();
            var minLng = lngLats[0].lng(), minLat = lngLats[0].lat();
            for (var i = 0; i < lngLats.length; i++) {
                var item = lngLats[i];
                if (item.lng() > maxLng) {
                    maxLng = item.lng();
                }
                if (item.lat() > maxLat) {
                    maxLat = item.lat();
                }
                if (item.lng() < minLng) {
                    minLng = item.lng();
                }
                if (item.lat() < minLat) {
                    minLat = item.lat();
                }
            }
            var bounds = new google.maps.LatLngBounds(this._newLngLat(minLng, minLat), this._newLngLat(maxLng, maxLat));
            this._map.fitBounds(bounds);
        },
        //设置保存后的和右键的鼠标指针
        _setDefaultCursor: function () {
            var sUserAgent = navigator.userAgent;
            if (sUserAgent.indexOf("Chrome") > -1) {
                this._map.setOptions({draggableCursor: "-webkit-grab"});//谷歌浏览器对于谷歌地图的鼠标指针
            } else if (sUserAgent.indexOf("Firefox") > -1) {
                this._map.setOptions({draggableCursor: "-moz-grab"});//火狐浏览器对于谷歌地图的鼠标指针
            } else {
                this._map.setOptions({draggableCursor: "url('../images/cur/openhand.cur')"});
            }

        },
        /////////////////////////////////////内部私有函数///////////////////////////////////
        // 添加具体的覆盖物实例
        _addOverlay: function (overlay) {
            overlay.setMap(this._map);
        },
        // 移除具体的覆盖物实例
        _removeOverlay: function (overlay) {
            overlay.setMap(null);
        },
        // 根据经度，纬度创建位置对象
        _newLngLat: function (lng, lat) {
            return new google.maps.LatLng(lat, lng);
        },

        // 获取icon
        _getIcon: function (opt) {
            if(opt.rotation || opt.rotation == 0){
                return opt.icon;
            }
            var icon = new google.maps.MarkerImage();
            icon.url = opt.icon;
            icon.scaledSize = new google.maps.Size(opt.size.x, opt.size.y);
            // icon.size = new google.maps.Size(opt.size.x, opt.size.y);
            // icon.anchor = new google.maps.Point(opt.size.x / 2, opt.size.y / 2);
            return icon;
        },

        // 创建Marker
        _newMarker: function (opt) {
            var setMap = null;
            if(!opt.isNoSetMap){
                setMap = this._map;
            }
            var marker = new LabelMarker({
                position: opt.lngLat,
                map: setMap,
                icon: this._getIcon(opt),
                labelOpt: {text: opt.label, offset: opt.offset}
            });
            return marker;
        },
        // 刷新Marker上的信息
        _refreshMarker: function (marker, opt) {
            if (marker) {
                if (opt.lngLat) {   // 如果指明了位置，就刷新位置
                    marker.setPosition(opt.lngLat);
                }
                if (opt.icon) {   // 如果指明了图标与尺寸
                    marker.getMarker().setIcon(this._getIcon(opt));
                }
                if (opt.label) {  // 如果指明了文本及偏移地址
                    marker.getLabel().setText(opt.label);
                }
            }
        },
        // 根据经度，纬度创建线
        _newPolyline: function (opt) {
            return new google.maps.Polyline({
                path: opt.lngLat,
                strokeColor: opt.color,
                strokeOpacity: 1.0,
                strokeWeight: 5
            });
        },
        // 获取对象的轨迹
        _getPath: function (poly) {
            return poly.getPath().getArray();
        },

        // 打开车辆信息窗口
        _openInfoWindow: function (marker, data) {
            var self = this;
            var html = self.getInfoWindowDetail(data);

            var infowindow = new google.maps.InfoWindow({
                content: html,
                // height: loginUrl.indexOf("chexiaomi") > -1 ? 130 : 150
            });
            self._currentWin = infowindow;
            if (self._prevWin && self._prevWin != self._currentWin){
                self._prevWin.close();
            }
            infowindow.open(self._map, marker.getMarker());

            self._prevWin = infowindow;                          // 保存下窗体

        },

        // 注册车辆信息窗口
        _addInfoWindow: function (marker, data) {
            var self = this;
            //google.maps.event.clearListeners(marker.getMarker(), "click");  // 谷歌允许添加多个事件
            this._safeBind(marker.getMarker(), "click", function () {
                var html = self.getInfoWindowDetail(data);
                var infowindow = new google.maps.InfoWindow({
                    content: html,
                    height: 150
                });
                self._currentWin = infowindow;
                if (self._prevWin && self._prevWin != self._currentWin){
                    self._prevWin.close();
                }
                infowindow.open(self._map, marker.getMarker());
                self._map.panTo(marker.getMarker().position);

                self._prevWin = infowindow;                          // 保存下窗体
            });
        },
        // 刷新车辆信息窗口
        _refreshInfoWindow: function (marker, car, pos) {
            var self = this;
            var infowindow = self._prevWin;
            if (infowindow) {
                var html = self.getInfoWindowDetail(car.carNO, pos);
                infowindow.setContent(html);
                self.getAddress(pos.lo, pos.la, function (address) {
                    var ct = html.replace(lg.searching, address);
                    iw.setContent(ct);
                });
            }
            return infowindow;
        },

        // 绑定事件
        _bind: function (elem, event, fun) {
            google.maps.event.addListener(elem, event, fun);
        },

        // 释放事件
        _unbind: function (elem, event, fun) {
            google.maps.event.clearListeners(elem, event);
        },

        /////////////////////////////////////测距等的绘制函数///////////////////////////////////
        startDrawing: function (poly, onUpdate) {
            var self = this;
            var map = this._map;
            var begin = false;
            var pushed = false;
            poly.setMap(map);

            function clickCB(event) {
                var path = poly.getPath();
                if (!pushed) {
                    path.push(event.latLng);
                }
                pushed = false;
                if (!begin) {
                    self._safeBind(map, 'mousemove', mousemoveCB);
                    self._safeBind(poly, 'mousemove', mousemoveCB);
                    begin = true;
                    map.setOptions({disableDoubleClickZoom: true});
                }
            }

            function mousemoveCB(event) {
                var path = poly.getPath();
                if (!pushed) {
                    path.push(event.latLng);
                    pushed = true;
                } else {
                    path.setAt(path.getLength() - 1, event.latLng);
                }
            }

            function rightclickCB(event) {
                self._cleanBind(poly);
                self._cleanBind(map);
                onUpdate(poly);
                window.setTimeout(function () {
                    map.setOptions({disableDoubleClickZoom: false});
                }, 500);
            }

            self._safeBind(map, 'click', clickCB);
            self._safeBind(poly, 'click', clickCB);
            self._safeBind(map, 'rightclick', rightclickCB);
            self._safeBind(poly, 'rightclick', rightclickCB);
        },

        /////////////////////////////////////空间对象相关///////////////////////////////////
        // 创建空间对象
        _createGeo: function (lngLats, canEdit, GeoName, type) {
            var self = this;
            // 如果是点
            if (type == 0) {
                self._geo = self._newMarker({
                    lngLat: lngLats[0], // 坐标
                    icon: "../images/marker.png", // 图标
                    size: {x: 25, y: 25}, // 图标大小
                    label: GeoName, // 标题
                    offset: {x: 27, y: 6}                     // 标题偏移
                });
                if (canEdit)
                    self._geo.setDraggable(true);
            }
            // 如果是线
            else if (type == 1) {
                self._geo = new google.maps.Polyline({
                    path: lngLats,
                    strokeColor: "#FF0000",
                    fillColor: "#FF0000",
                    strokeWeight: 2,
                    strokeOpacity: 0.7,
                    fillOpacity: 0.2,
                    strokeStyle: "dashDashed"
                });
                if (canEdit)
                    self._geo.setEditable(true);
            }
            // 如果是面
            else if (type == 2) {
                self._geo = new google.maps.Polygon({
                    path: lngLats,
                    strokeColor: "#FF0000",
                    fillColor: "#FF0000",
                    strokeWeight: 2,
                    strokeOpacity: 0.7,
                    fillOpacity: 0.2,
                    strokeStyle: "dashed"
                });

                if (canEdit)
                    self._geo.setEditable(true);
            }
            self._addOverlay(self._geo);  // 添加到地图
            return self._geo;
        },
        //显示所有空间对象
        drawAllGeo: function (geoList) {

            if (self._map)
                this._cleanBind(self._map);     // 清空所有事件
            if (this._geo)
                this._cleanBind(self._geo);

            this.cleanAllGeo();

            for (var i = 0; i < geoList.length; i++) {
                var points = geoList[i].dpList;
                // 如果有坐标，说明是更新，直接生成可以编辑的对象
                if (points && points.length > 0) {
                    var lngLats = this._parsePoints(points);
                    this._createGeo(lngLats, false, geoList[i].geoName, geoList[i].geoType);   // 创建空间对象
                }
                this._geoObjects.push(this._geo);
            }
            this._setFitview(this._geoObjects);
        },
        // 绘制空间对象
        drawGeo: function (type, points, editable, GeoName) {
            var self = this;      // 获取全局对象
            var path = [];         // 已经接收的点
            var drawPath = null;  // 显示需要的点

            if (this._geo)
                this._cleanBind(this._geo);  // 清空空间对象事件
            if (this._map)
                this._cleanBind(this._map);  // 清空地图事件

            this.cleanAllGeo();  // 清空所有对象

            // 如果有坐标，说明是更新，只生成对象，不注册事件
            if (points && points.length > 0) {
                var lngLats = this._parsePoints(points);
                self._createGeo(lngLats, editable, GeoName, type);   // 创建空间对象
                if (type == 0)
                    this.setCenter(lngLats[0].lng(), lngLats[0].lat(), 12);
                else
                    this._setFitview([self._geo]);  // 居中显示
            }
            // 否则，注册事件重新绘制
            else {
                self._map.setOptions({draggableCursor: 'crosshair'});
                self._safeBind(self._map, 'click', _clickCB);  // 添加左键单击事件
                self._safeBind(self._map, 'mousemove', _moveCB);
                self._safeBind(self._map, 'rightclick', _rclickCB);
            }

            // 左键单击事件
            function _clickCB(event) {


                path.push(event.latLng);                        // 往路径中加点
                drawPath = path.concat(path[path.length - 1]);  // 显示的点总要多一个
                // 左键时，如果对象为空
                if (self._geo == null) {
                    self._createGeo(drawPath, false, GeoName, type);    // 以第一次单击位置创建对象
                    self._safeBind(self._geo, 'click', _clickCB);
                    self._safeBind(self._geo, 'mousemove', _moveCB);
                    self._safeBind(self._geo, 'rightclick', _rclickCB);
                }
                else {
                    if (type == 0) {
                        self._geo.setPosition(event.latLng);
                    }
                    else {
                        self._geo.setPath(drawPath);
                    }
                }
            }

            // 鼠标移动事件
            function _moveCB(event) {
                if (self._geo && type != 0 && drawPath.length > 1) {


                    drawPath.pop();
                    drawPath.push(event.latLng);

                    self._geo.setPath(drawPath); // 修改最后一个显示点的位置
                }
            }

            // 右键事件
            function _rclickCB(event) {
                if (self._map)
                    self._cleanBind(self._map);
                if (self._geo)
                    self._cleanBind(self._geo);
                self._setDefaultCursor();
                if (self._geo && type != 0 && path.length > 1) {
                    self._geo.setPath(path);
                }
                //label.setMap(null);
            }

        },

        // GOOGE差异太大，重载一下结束绘制函数
        endGeo: function () {
            // 设为缺省指针
            this._setDefaultCursor();

            if (this._geo) {
                var points = "";
                var path = [];
                if (this._geo.getPath)
                    path = this._geo.getPath().getArray();//google的差异
                else
                    path.push(this._geo.getMarker().getPosition());
                // 将所有点连成一个字符串
                for (var i = 0; i < path.length; i++) {
                    if (i != 0)
                        points += ';';
                    points += path[i].lng().toFixed(6) + ',' + path[i].lat().toFixed(6);
                }
                // 传递坐标给上层
                try {
                    parent.parent.g_Main.geoDialog.onEndGeo(points);
                }
                catch (e) {
                }
                if (this._geo)
                    this._cleanBind(this._geo);  // 清空空间对象事件
                if (this._map)
                    this._cleanBind(this._map);  // 清空地图事件
            }
        },
        // 绘制已经走过的轨迹 覆盖一层模糊图层在已经行驶过的轨迹之后 增加效果
        hasPassedPos: function(currentPos){
            var path = this._getPath(this._passedPolyline);
            path.push(currentPos);
            this._passedPolyline.setPath(path);
        },
        // 根据经纬度解析地址
        resolveAddress: function(latLng){
            var geocoder = new google.maps.Geocoder();
            // var latLng = new google.maps.LatLng(pos.lat, pos.lng);
            geocoder.geocode({"latLng": latLng}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        alert(results[0].formatted_address);
                        // var ct = html.replace(lg.searching, results[0].formatted_address);
                        // iw.setContent(ct);
                        //alert(JSON.stringify(results[0]));
                    }
                } else {
                    alert("Geocoder failed due to: " + status);
                }
            });
        },
        // 展示聚合效果
        showCluster: function(markers,url){
            var self = this;
            var markerArr = [];
            for(var i = 0; i< markers.length; i++){
                markerArr.push(markers[i].getMarker());
            }
            var markerCluster = new MarkerClusterer(self._map, markerArr,
                {imagePath: url});
            return markerCluster;
        },
    }
});
