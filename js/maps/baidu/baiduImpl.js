TUI.Core.create({
    name: "TUI.map.BaiduImpl",
    extend: TUI.map.BaseMap,
    init: function () {
        this.isShowTraffic=true;
        this.layer = new BMap.TrafficLayer();
    },
    methods: {
        // 创建地图对象
        createMap: function () {
            var maptypeid = BMAP_NORMAL_MAP;
            // if (maptype == 2)
            //     maptypeid = BMAP_HYBRID_MAP;
            var mapOptions = {
                mapType: maptypeid
            };

            var map = this._map = new BMap.Map(this._mapPanel, mapOptions);              // 创建Map实例
            map.addControl(new BMap.NavigationControl());                 // 添加平移缩放控件
            map.addControl(new BMap.ScaleControl());                      // 添加比例尺控件
            map.addControl(new BMap.OverviewMapControl({isOpen: false}));// 添加缩略地图控件
            map.enableScrollWheelZoom();								      // 启用滚轮放大缩小
            map.enableScrollWheelZoom(true);

            // 覆盖区域图层测试
            //map.addTileLayer(new BMap.PanoramaCoverageLayer());

            /* var stCtrl = new BMap.PanoramaControl(); //构造全景控件
             stCtrl.setOffset(new BMap.Size(50, 30));//相对于右上角的偏移量
             map.addControl(stCtrl);//添加全景控件*/

            /* var ctrl = new BMapLib.TrafficControl({
             showPanel: true //是否显示路况提示面板
             });
             map.addControl(ctrl);
             ctrl.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT);*/
            this._rectangleZoom = new BMapLib.RectangleZoom(map, {autoClose: true});	// 拉框放大工具
            this._distanceTool = new BMapLib.DistanceTool(map); 						// 测距工具
            this.setCenter(110.397, 36.917, 5);
            this.lazyLoadControl();
        },
        lazyLoadControl: function () {
            var self = this;
            self.createControl();
        },
        toggleTrafficLayer: function () {
            var self = this;
            var trafficDiv = TUI.Dom.$("trafficControl");
                if(this.isShowTraffic){
                trafficDiv.style.backgroundColor = "rgb(111, 165, 219)";
                self._map.addTileLayer(this.layer);
                this.isShowTraffic = false;

            } else {
                trafficDiv.style.backgroundColor = "rgb(238, 238, 238)";
                //console.log(self._map);
                //console.log(layer);
                self._map.removeTileLayer(this.layer);
                    this.isShowTraffic = true;
            }
        },
        // 拉框放大
        dragMax: function () {
            this._rectangleZoom._opts.zoomType = 0;
            this._rectangleZoom.open();
        },
        // 拉框缩小
        dragMin: function () {
            this._rectangleZoom._opts.zoomType = 1;
            this._rectangleZoom.open();
        },
        // 移动地图
        moveMap: function () {
        },
        // 测距
        range: function () {
            this._distanceTool.open();
        },
        getDistance:function(src, des){
           var distance = this._map.getDistance(src,des);
            return distance.toFixed(0);
        },
        // 基本函数，显示全国图
        fullMap: function () {
            this.setCenter(110.397, 36.917, 5);
        },
        // 设置中心点
        setCenter: function (lng, lat, zoom) {
            var lngLat = this._newLngLat(lng, lat);
            this._map.centerAndZoom(lngLat, zoom);
        },

        // 锁定视窗
        lockWindowByLngLat: function (lngLat) {
            var lo = lngLat.lng, la = lngLat.lat;
            var bounds = this._map.getBounds();
            var left = bounds.getSouthWest().lng;	//西南 经度
            var down = bounds.getSouthWest().lat;	//西南 纬度
            var right = bounds.getNorthEast().lng;	//东北 经度
            var up = bounds.getNorthEast().lat;	//东北 纬度);
            if (lo < left || lo > right || la < down || la > up) {
                this._map.setCenter(this._newLngLat(lo, la));
            }
        },
        getZoom:function(){
          return this._map.getZoom();
        },
        // 最佳视窗效果
        _setFitview: function (overlays) {
            var self = this, lngLats = [];
            for (var i = 0; i < overlays.length; i++) {
                var item = overlays[i];
                if (item instanceof BMap.Marker) {
                    lngLats.push(item.getPosition());
                }
                else if (item instanceof BMap.Polyline || item instanceof BMap.Polygon) {
                    lngLats = lngLats.concat(item.getPath());
                }
                else if (item instanceof BMap.Point) {
                    lngLats.push(item);
                }
            }
            var viewport = this._map.getViewport(lngLats);//根据经纬度数组获取最佳视窗
            this._map.setViewport(viewport);
        },
        _setDefaultCursor: function () {
            var sUserAgent = navigator.userAgent;
            if (sUserAgent.indexOf("Chrome") > -1) {
                this._map.setDefaultCursor("-webkit-grab");//谷歌浏览器支持，由于版本号不同，360不支持
            } else if (sUserAgent.indexOf("Firefox") > -1) {
                this._map.setDefaultCursor("-moz-grab");//火狐浏览器特有的鼠标指针
            } else {
                this._map.setDefaultCursor("url('../images/cur/openhand.cur')");
            }
        },
        /////////////////////////////////////内部私有函数///////////////////////////////////
        // 添加具体的覆盖物实例
        _addOverlay: function (overlay) {
            this._map.addOverlay(overlay);
        },
        // 移除具体的覆盖物实例
        _removeOverlay: function (overlay) {
            this._map.removeOverlay(overlay);
        },

        // 根据经度，纬度创建位置点
        _newLngLat: function (lng, lat) {
            return new BMap.Point(lng, lat);
        },
        _getIcon: function (opt) {
            var icon = new BMap.Icon(opt.icon, new BMap.Size(opt.size.x, opt.size.y),{imageSize:new BMap.Size(opt.size.x, opt.size.y)});
            return icon;
        },
        // 创建Marker
        _newMarker: function (opt) {
            var marker = new BMap.Marker(opt.lngLat, {shadow: null});//百度和高德的marker有label属性无需自定义
            if(opt.rotation || opt.rotation == 0){
                marker.setRotation(opt.rotation);
            }else{
                marker.setOffset(new BMap.Size(0, -(opt.size.y/2)));
            }
            if (opt.icon && opt.size) {   // 如果指明了图标与尺寸
                marker.setIcon(this._getIcon(opt));
            }
            if (opt.label && opt.offset) {  // 如果指明了文本及偏移地址
                var _label = new BMap.Label(opt.label, {offset: new BMap.Size(opt.offset.x, opt.offset.y)});
                _label.setStyle({border:"1px solid #4D7CE0"});
                marker.setLabel(_label);
            }
            return marker;
        },

        // 刷新Makert上的信息
        _refreshMarker: function (marker, opt) {
            if (marker) {
                if(opt.rotation || opt.rotation == 0){
                    marker.setRotation(opt.rotation);
                }else{
                    marker.setOffset(new BMap.Size(0, -(opt.size.y/2)));
                }
                if (opt.lngLat) {   // 如果指明了位置，就刷新位置
                    marker.setPosition(opt.lngLat);
                }
                // 这段代码不能要 会重复覆盖图标 导致小车的方向转换被覆盖 无法显示方向切换的效果
                // if (opt.icon && opt.size) {   // 如果指明了图标与尺寸
                //     // var _icon = new BMap.Icon(opt.icon, new BMap.Size(opt.size.x, opt.size.y));
                //     // marker.setIcon(_icon);
                //     marker.setIcon(this._getIcon(opt));
                // }
                if (opt.label) {  // 如果指明了文本及偏移地址
                    marker.getLabel().setContent(opt.label);
                }
            }
        },
        // 根据经度，纬度创建线
        _newPolyline: function (opt) {
            return new BMap.Polyline(opt.lngLat, {strokeColor: opt.color, strokeOpacity: 1.0, strokeWeight: 5});
        },
        // 获取对象的轨迹
        _getPath: function (poly) {
            return poly.getPath();
        },

        //打开信息窗口(新增)
        _openInfoWindow: function (marker, data) {
            var self = this;
            if (self._prevWin && self._prevWin != self._currentWin){
                self._prevWin.close();
            }
            var html = self.getInfoWindowDetail(data);
            var infoWindow = new BMap.InfoWindow(html,
                {
                    height:150,enableCloseOnClick: false
                });
            marker.openInfoWindow(infoWindow);
            self._prevWin = infoWindow;                          // 保存下窗体
            self._prevWin.carId = car.carId;

        },

        // 注册车辆信息窗口
        _addInfoWindow:function (marker, data) {
            var self = this;
            this._safeBind(marker, "click", function () {
                // 如果已经开了窗口，而且是别的车，则关闭之
                if (self._prevWin && self._prevWin != self._currentWin){
                    self._prevWin.close();
                }
                var html = self.getInfoWindowDetail(data);
                // var loginUrl = unescape(parent.parent.TUI.Core.getRequestParam("loginUrl"));
                var infowindow = new BMap.InfoWindow(html, {
                        height: 235
                    });
                self._currentWin = infowindow;
                self._map.openInfoWindow(infowindow,marker.point);
                /*self.getAddress(pos.lo, pos.la, function (address) {
                    var ct = html.replace(lg.searching, address);
                    iw.setContent(ct);
                });*/
                self._map.panTo(marker.point);
                self._prevWin = infowindow;                          // 保存下窗体
            });
        },


        //注册圆的信息窗口   alarmItems为数组类型
        _addCInfoWindow: function (marker, car, pos, posNext, alarmItems) {
            var self = this;
            this._safeBind(marker, "click", function () {
                // 如果已经开了窗口，而且是别的车，则关闭之
                if (self._cinfoWin) {
                    self._cinfoWin.close();
                }
                self._alarmItems = alarmItems;
                var html = self.getCDetailCarTip(car.carNO, pos, posNext, alarmItems);

                var iw = new BMap.InfoWindow(html, {height: 100});
                this.openInfoWindow(iw);
                self.getAddress(pos.lng, pos.lat, function (address) {
                    var ct = html.replace(lg.searching, address);
                    iw.setContent(ct);
                });
                self._cinfoWin = iw;                          // 保存下窗体
                self._cinfoWin.carId = car.carId;           // 并且保存下对应手表id
            });
        },

        // 刷新车辆信息窗口
        _refreshInfoWindow: function (marker, car, pos) {
            var self = this;
            var iw = self._prevWin;
            if (iw) {
                var html = self.getInfoWindowDetail(car.carNO, pos);//获取车辆详细提示信息
                iw.setContent(html);
                self.getAddress(pos.lo, pos.la, function (address) {
                    var ct = html.replace(lg.searching, address);
                    iw.setContent(ct);
                });
            }
        },

        // 绑定事件
        _bind: function (elem, event, fun) {
            elem.addEventListener(event, fun);    // 注册事件
        },

        // 释放事件
        _unbind: function (elem, event, fun) {
            elem.removeEventListener(event, fun);  // 释放事件
        },
        /////////////////////////////////////空间对象相关///////////////////////////////////
        // 创建空间对象
        _createGeo: function (lngLats, canEdit, GeoName, type) {/*标记物*/
            var self = this;
            // 如果是点
            if (type == 0) {
                self._geo = self._newMarker({
                    lngLat: lngLats[0], // 坐标
                    icon: "../images/marker.png", // 图标
                    size: {x: 25, y: 25}, // 图标大小
                    label: GeoName, // 标题
                    offset: {x: 27, y: 6}                      // 标题偏移
                });

                self._addOverlay(self._geo);  // 添加到地图
                if (canEdit)
                    self._geo.enableDragging();   // 允许拖动

            }
            // 如果是线
            else if (type == 1) {
                self._geo = new BMap.Polyline(lngLats, {
                    strokeColor: "#FF0000", //折线的颜色
                    fillColor: "#FF0000", //内部填充色
                    strokeWeight: 2, //宽度
                    strokeOpacity: 0.7, //透明度
                    fillOpacity: 0.2, //填充色透明度
                    strokeStyle: "dashed"//折线
                });

                self._addOverlay(self._geo);  // 添加到地图
                if (canEdit)
                    self._geo.enableEditing();//可编辑
            }
            // 如果是面
            else if (type == 2) {
                self._geo = new BMap.Polygon(lngLats, {
                    strokeColor: "#FF0000",
                    fillColor: "#FF0000",
                    strokeWeight: 2,
                    strokeOpacity: 0.7,
                    fillOpacity: 0.2,
                    strokeStyle: "dashed"
                });

                self._addOverlay(self._geo);  // 添加到地图
                if (canEdit)
                    self._geo.enableEditing();
            }
            return self._geo;
        },
        //显示所有标记点
        drawAllGeo: function (geoList) {
            this.cleanAllGeo();
            if (self._map)
                this._cleanBind(self._map);// null值将清除所有事件
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
            var label = new BMap.Label({offset: new BMap.Size(15, 0)});
            var self = this;
            var path = [];         // 已经接收的点
            var drawPath = null;  // 显示需要的点

            if (self._map)
                this._cleanBind(self._map);     // 清空所有事件

            this.cleanAllGeo();  // 清空所有对象

            // 如果有坐标，说明是更新，直接生成可以编辑的对象
            if (points && points.length > 0) {
                var lngLats = this._parsePoints(points);
                self._createGeo(lngLats, editable, GeoName, type);   // 创建空间对象
                if (type == 0)
                    this.setCenter(lngLats[0].lng, lngLats[0].lat, 12);
                else
                    this._setFitview([this._geo]);  // 居中显示
            }
            // 否则，注册事件重新绘制
            else {
                self._map.setDefaultCursor('crosshair');
                self._safeBind(self._map, 'click', _clickCB);
                self._safeBind(self._map, 'mousemove', _moveCB);
                self._safeBind(self._map, 'rightclick', _rclickCB);
            }
            // 左键单击事件
            function _clickCB(event) {
                self._map.addOverlay(label);
                label.setContent(lg.operatingtips);
                path.push(event.point);                        // 往路径中加点
                drawPath = path.concat(path[path.length - 1]);  // 显示的点总要多一个
                // 左键时，如果对象为空
                if (self._geo == null) {
                    self._createGeo(drawPath, false, GeoName, type);    // 以第一次单击位置创建对象
                }
                else {
                    if (type == 0) {
                        self._geo.setPosition(event.point);
                    }
                    else {
                        self._geo.setPath(drawPath);
                    }
                }
            }

            // 鼠标移动事件
            function _moveCB(event) {
                label.setPosition(event.point);
                if (self._geo && type != 0 && drawPath.length > 1) {
                    self._geo.setPositionAt(drawPath.length - 1, event.point); // 修改最后一个显示点的位置
                }
            }

            // 右击事件
            function _rclickCB(event) {
                if (self._map)
                    self._cleanBind(self._map);
                self._setDefaultCursor();
                if (self._geo && type != 0 && path.length > 1) {
                    self._geo.setPath(path);
                }
                self._map.removeOverlay(label);
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
            var geoc = new BMap.Geocoder();
            // var latLng = new BMap.Point(pos.lng, pos.lat);
            geoc.getLocation(latLng, function(rs){
                var addComp = rs.addressComponents;
                alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
            });
        },
        // 展示聚合效果
        showCluster: function(markers,url){
            var self = this;
            //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
            var markerClusterer = new BMapLib.MarkerClusterer(self._map, {markers:markers});
            return markerCluster;
        },
    }
});
