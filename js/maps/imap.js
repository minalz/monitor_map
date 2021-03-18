TUI.Core.create({
    name: "TUI.map.BaseMap",
    init: function (isInit) {
        this._mapPanel = "map";                       // 局部变量，存储地图DIV的ID号
        this._map = null;                                    // 地图对象
        this._carMarkers = new TUI.util.HashMap();             // 哈希表，存储所有车辆的标签
        this._cItemList = new TUI.util.HashMap();            //保存需要画圆的点
        this._cpItemList = new TUI.util.HashMap();              //保存圆里的报警点
        this._pItemList = new TUI.util.HashMap();               //保存不需要画圆的点
        this._carLines = [];                                 // 只保存一辆车的实时轨迹

        this._historyData = [];                             // 数组，存储所有轨迹数据，由于需要分析每个点，所以用数组存储
        this._historyMarkers = [];                          // 数组，存储因轨迹产生的标记 这个_historyMarkers不仅保存了marker还保存了轨迹posline 最终都可以调用setMap()
        this._playMarker = null;                            // 轨迹播放标记

        this._counter = 0;                                 // 一个记数变量，产生不重复的数值
        this._region = null;                               // 存储区域对象，用来绘制区域
        this._infoWin = null;                              // 信息窗口
        this._prevWin = null;                              // 上一个信息窗口
        this._currentWin = null;                            // 当前信息窗口
        this._geoObjects = [];                              //数组，保存地图上绘制的空间对象
        this._distanceMap = {};                             // map 每个索引对应的一段行程里程
        this._passedPolyline = null;                            // 已经走过的轨迹 多段轨迹显示  key-value 对应 数据索引index-对应的点
        // this._maptype = 1;                                  // 地图类型  1：谷歌  2：百度  默认谷歌地图

        this._geo = null;
        //单个空间对象

    },
    methods: {

        // 创建地图工具栏控件
        createControl: function () {
            var self = this;
            var imgHtml = '<img id="{0}" class="controlIcon" src="../images/ctrltools16X16/alpha_button_{0}.gif\" title="{1}" />';  // 按钮图片对应的HTML
            var splitHtml = '<img class="split" src="../images/ctrltools16X16/grid-blue-split.gif" />';  // 分隔符对应的HTML
            var img1 = "zoomIn", img2 = "zoomOut", img3 = "panH", img4 = "ruler", img5 = "fullExtent1", img6 = "clean",
                img7 = "center";

            // 生成HTML
            var htmls = [];
            htmls.push("地图工具" + ":");
            htmls.push(imgHtml.format(img1, "放大"));//img1和lg.zoomin替换掉{0}和{1}
            htmls.push(splitHtml);
            htmls.push(imgHtml.format(img2, "缩小"));
            htmls.push(splitHtml);
            htmls.push(imgHtml.format(img3, "移动"));
            htmls.push(splitHtml);
            htmls.push(imgHtml.format(img4, "测距"));
            htmls.push(splitHtml);
            htmls.push(imgHtml.format(img5, "全国"));
            htmls.push(splitHtml);
            htmls.push(imgHtml.format(img6, "清空"));
            htmls.push(splitHtml);
            htmls.push(imgHtml.format(img7, "地图经纬度定位"));
            htmls.push(splitHtml);

            // 地图选择控件
            htmls.push("<select id='select_map_type'>");
            htmls.push("<option value='0'>" + "百度地图" + "</option>");
            // htmls.push("<option value='1'>" + lg.baidusatellite + "</option>");
            htmls.push("<option value='1'>" + "谷歌地图" + "</option>");
            // htmls.push("<option value='3'>" + lg.googlesatellite + "</option>");
            // htmls.push("<option value='4'>" + lg.mapabcmap + "</option>");
            // htmls.push("<option value='5'>" + lg.tencentmap + "</option>");
            // htmls.push("<option value='6'>" + lg.tencentsatellite + "</option>");
            htmls.push("</select>");

            // 全景地图控件
            htmls.push("<span id='check_full_map'><input type='checkbox'/>" + "全屏" + "</span>");
            // 加入地图中
            var parentNode = TUI.Dom.$(this._mapPanel).parentNode;
            var divNode = TUI.Dom.createElement("div", {className: "mapControl"});//创建节点
            parentNode.appendChild(divNode);
            var language = TUI.Core.getRequestParam("lang");
            divNode.style.width = language == "en" ? "420px" : "385px";
            TUI.Dom.html(divNode, htmls.join(""));//设置节点divNode的innerHtml


            /* //页面倒计时刷新div
             if ((parent.frameElement.id.indexOf("monitorPage") > -1) || (parent.frameElement.id.indexOf("tracking") > -1)) {
             var countHtml = [];
             countHtml.push("<span class='countHtml' id='countHtml'></span>");
             countHtml.push('<span>' + lg.countdown + '</span>');
             var countNode = TUI.Dom.createElement("div", {className:"count", id:"count"});
             parentNode.appendChild(countNode);
             countNode.style.width = language == "en" ? "220px" : "100px";
             TUI.Dom.html(countNode, countHtml.join(""));
             countdown();
             }*/

            //路况div
            /*var trafficNode = TUI.Dom.createElement("div", {id: "trafficControl"});
            var pnode = TUI.Dom.$("map");
            pnode.appendChild(trafficNode);
            trafficNode.style.width = language == "en" ? "120px" : "66px";
            TUI.Dom.html(trafficNode, lg.trafficCondition);*/


            //街景切换div
            // var panoControl = TUI.Dom.createElement("div", {id: "panoControl"});
            // var mapPanel = TUI.Dom.$("map");
            // if (parent.frameElement.id.indexOf("monitorPage") > -1) {
            //     mapPanel.appendChild(panoControl);
            //     panoControl.style.width = language == "en" ? "120px" : "66px";
            //     panoControl.style.right = language == "en" ? "160px" : "100px";
            //     TUI.Dom.html(panoControl, lg.showPanorama);
            //     TUI.Event.addEventListener(panoControl, "click", function (e) {
            //         self.togglePanorama();
            //     });
            // }


            //退出街景按钮
            /*var exitContent = [];
            var imgExit = '<img id="{0}" class="exitButton" src="../images/ctrltools16X16/alpha_button_{0}.gif\" title="{1}" />';
            var img9 = "exit";
            exitContent.push(imgExit.format(img9, lg.exitPanorama));
            var panoHolder = TUI.Dom.$("panoHolder");
            var exitPanorama = TUI.Dom.createElement("div", {className: "exitPanorama"});
            panoHolder.appendChild(exitPanorama);
            TUI.Dom.html(exitPanorama, exitContent.join(""));
            TUI.Event.addEventListener(img9, "click", function (e) {
                self.hidePanorama();
            });*/

            // 添加地图控件事件
            TUI.Event.addEventListener(img1, "click", function (e) {
                self.dragMax();
            });
            TUI.Event.addEventListener(img2, "click", function (e) {
                self.dragMin();
            });
            TUI.Event.addEventListener(img3, "click", function (e) {
                self.moveMap();
            });
            TUI.Event.addEventListener(img4, 'click', function (e) {
                self.range();
            });
            TUI.Event.addEventListener(img5, "click", function (e) {
                self.fullMap();
            });
            TUI.Event.addEventListener(img6, "click", function (e) {
                self.cleanAll();
            });
            TUI.Event.addEventListener(img7, "click", function (e) {
                self.mapLoc();
            });
            /*TUI.Event.addEventListener(trafficNode, "click", function (e) {
                self.toggleTrafficLayer();
            });*/

            // 选中当前地图，并添加地图选择事件
            var select_map_type = TUI.Dom.$("select_map_type");
            select_map_type.style.width = (lang == 'en' ? '110px' : '80px');
            select_map_type.options[maptype].selected = true;
            TUI.Event.addEventListener(select_map_type, 'change', function () {
                self.setMapType(select_map_type.selectedIndex);
            });

            // 全景地图处理函数
            // var check_full_map = TUI.Dom.$("check_full_map");
            // var checkbox = check_full_map.firstChild;
            // checkbox.checked = mapfull;
            // TUI.Event.addEventListener(checkbox, 'click', function () {
            //     if (parent && parent.parent && parent.parent.g_Main) {
            //         //在iframe页面通过parent可以获得主页面的window，接着就可以正常访问父页面的元素了
            //         parent.parent.g_Main.setFullMap(checkbox.checked);
            //     }
            // });
        },
        //退出街景
        hidePanorama: function () {
            var self = this;
            var cars = parent.parent.g_Main.getMonitorCars();
            var zoom = this._map.getZoom();
            var panoHolder = TUI.Dom.$("panoHolder");
            var mapStyle = TUI.Dom.$(this._mapPanel);
            panoHolder.style.display = "none";
            mapStyle.style.width = "100%";
            var panoControl = TUI.Dom.$("panoControl");
            var trafficNode = TUI.Dom.$("trafficControl");
            if (maptype == 2 || maptype == 3) {
                google.maps.event.trigger(this._map, 'resize');
            }
            document.getElementById("panoControl").innerHTML = lg.showPanorama;
            document.getElementById("panoControl").style.backgroundColor = "rgb(238, 238, 238)";
            panoControl.style.top = "35px";
            trafficNode.style.top = "35px"
            if (maptype == 0 || maptype == 1 || maptype == 2 || maptype == 3) {
                setTimeout(function () {
                    self.setCenter(cars[cars.length - 1].pos.lng, cars[cars.length - 1].pos.lat, zoom)
                }, 500);
            }

        },
        //街景隐藏显示切换
        togglePanorama: function () {
            var self = this;
            var cars = parent.parent.g_Main.getMonitorCars();

            if (parent.parent.g_Main.getMonitorCars().length == 0) {
                parent.parent.g_Main.alertInfo(lg.chooseCar);
                return;
            }
            if (parent.parent.g_Main.getMonitorCars().length >= 2) {
                parent.parent.g_Main.alertInfo(lg.singleCar);
                return;
            }

            var panoHolder = TUI.Dom.$("panoHolder");
            var map = TUI.Dom.$(this._mapPanel);
            var panoControl = TUI.Dom.$("panoControl");
            var trafficNode = TUI.Dom.$("trafficControl");
            if (panoHolder.style.position == "relative") {
                panoHolder.style.position = "absolute";

            }
            //var trackingMapControl = TUI.Dom.getElementByClassName("trackingMapControl");
            if (panoHolder.style.display == "none" || panoHolder.style.display == "") {
                panoHolder.style.display = "block";//显示街景div
                map.style.width = "50%";//调整地图div宽度为50%
                var zoom = this._map.getZoom();
                if (maptype == 0 || maptype == 1 || maptype == 2 || maptype == 3) {
                    //
                    setTimeout(function () {
                        self.setCenter(cars[cars.length - 1].pos.lng, cars[cars.length - 1].pos.lat, zoom)
                    }, 500);

                }
                /*if(maptype==2||maptype==3){
                 google.maps.event.trigger(this._map,'resize');
                 }*/
                document.getElementById("panoControl").innerHTML = lg.hidePanorama;
                document.getElementById("panoControl").style.backgroundColor = "rgb(111, 165, 219)";
                panoControl.style.top = "5px";
                trafficNode.style.top = "5px";

            } else {
                var zoom = this._map.getZoom();
                panoHolder.style.display = "none";
                map.style.width = "100%";
                //self.showCar(car[0],true);

                /* if(maptype==2||maptype==3){
                 google.maps.event.trigger(this._map,'resize');
                 }*/
                document.getElementById("panoControl").innerHTML = lg.showPanorama;
                document.getElementById("panoControl").style.backgroundColor = "rgb(238, 238, 238)";
                panoControl.style.top = "35px";
                trafficNode.style.top = "35px"
                if (maptype == 0 || maptype == 1 || maptype == 2 || maptype == 3) {
                    setTimeout(function () {
                        self.setCenter(cars[cars.length - 1].pos.lng, cars[cars.length - 1].pos.lat, zoom)
                    }, 500);
                }
            }
        },
        // 设置地图类型
        setMapType: function (index) {
            if (index == maptype)
                return;
            // 如果地图对象已加载，并且是同一种地图，则只调用一次接口就行了，无须重新加载
            // 1:谷歌  0:百度
            // if (this._map) {
            //     if (index == 0) {
            //         this._map.setMapType(BMAP_NORMAL_MAP);
            //         maptype = index;
            //         return;
            //     }else{
            //         this._map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
            //         maptype = index;
            //         return;
            //     }
            // }
            // 切换地图
            window.location = "rollcall.html?maptype=" + index + "&lang=" + lang;
            // window.location = "trackPos.html?maptype=" + index + "&lang=" + lang;
        },

        // 设置全景地图复选框状态
        setMapFull: function (checked) {
            var check_full_map = TUI.Dom.$("check_full_map");
            var checkbox = check_full_map.firstChild
            checkbox.checked = checked;
        },

        // 清除所有
        cleanAll: function () {
            this.cleanCar();            //清除车辆
            this.cleanHistoryLine();   // 清除历史轨迹
            this.cleanAllGeo();        // 清除空间对象
        },
        //地图经纬度定位
        mapLoc: function () {
            //地图定位对话框
            parent.parent.g_Main.showLocDialog();
        },
        // 移除车辆标记
        removeCar: function (carId) {
            var carMarkers = this._carMarkers;
            if (carMarkers.containsKey(carId))
                this._removeOverlay(carMarkers.remove(carId));//自定义hashmap里的remove方法,返回的是value

            // 如果轨迹是当前车辆的，则清空所有轨迹
            var carLines = this._carLines;
            if (carLines.carId == carId) {
                for (var i = 0; i < carLines.length; i++) {
                    this._removeOverlay(carLines[i]);// 移除车辆标记
                }
                carLines.length = 0;
                carLines.carId = null;
            }
        },

        // 清除所有车辆
        cleanCar: function () {//清除hashmap里的所有cars
            var keys = this._carMarkers.getKeys();
            for (var i = 0; i < keys.length; i++) {
                this.removeCar(keys[i]);
            }
        },

        // 清空轨迹图层
        cleanHistoryLine: function () {//清空historyMarkers数组
            var self = this;
            var overlays = this._historyMarkers;
            for (var i = 0; i < overlays.length; i++) {
                self._removeOverlay(overlays[i]); // 清除历史轨迹
            }

            this._historyMarkers = [];
            this._historyData = null;
            this._cItemList.clear();
            this._pItemList.clear();
            // 如果创建了播放标记
            if (this._playMarker) {
                self._removeOverlay(this._playMarker); // 清除播放标记
                this._playMarker = null;
            }
        },

        //////////////////////////////Tip窗口对应HTML代码/////////////////////////////////////
        // 获取车辆简要信息提示
        getSimpleCarTip: function (index,pos) {
            var html = [];
            html.push("<div class=\"simpleCarTip\">");
            html.push("<div><span style='color:#11aabf;'>" + "速度" + "-" + "方向" + ":&nbsp;</span>{0}<div/>"); // 速度 - 方向
            html.push("<div><span style='color:#11aabf;'>" + "距离" + ":&nbsp;</span>{1}<div/>"); // 距离
            html.push("<div><span style='color:#11aabf;'>" + "状态" + ":&nbsp;</span>{2}<div/>"); // 状态
            html.push("<div><span style='color:#11aabf;'>" + "GPS时间" + ":&nbsp;</span>{3}<div/>"); // GPS时间
            html.push("</div>");
            return html.join("").format(
                pos.speed + " (KM/h) / " + parseFloat(pos.angle.toFixed(2)) + "°",
                (this._distanceMap[index]/1000).toFixed(2) + " (KM)",
                pos.isHaving == true ? "重车" : "空车", // 重车  空车
                // pos.isHaving == true ? $.i18n.prop('HiredVehicle') : $.i18n.prop('VacantVehicle'), // 重车  空车
                pos.gpstime,
            );
        },
        // 获取车辆详细信息提示
        getInfoWindowDetail: function (data) {
            var contentString = "<div class=\"popupall\"><div class=\"popuptop\">" +
                "<div class=\"popmess\"><span>车牌号：</span><span>"+data.carNo+"</span></div>" +
                "<div class=\"popmess\"><span>终端号：</span><span>12346</span></div>" +
                "<div class=\"popmess\"><span>驾驶员：</span><span>"+data.driverName+"</span></div>" +
                "<div class=\"popmess\"><span>身份证：</span><span>"+data.personalId+"</span></div>" +
                "<div class=\"popmess\"><span>速度：</span><span>"+data.speed+"&nbsp;KM/H</span></div>" +
                // "<div class=\"popmess\"><span>地点：</span><span>点击获取地址</span></div>" +
                "<div class=\"popmess\"><span>时间：</span><span>"+data.lastTime+"</span></div>" +
                "<div class=\"popmess\"><span>报警：</span><span>空空如也</span></div>" +
                "<div class=\"popmess\"><span>状态：</span><span>"+data.carState+"</span></div>" +
                "<div class=\"popothermess\"><span>坐标：</span><span>"+data.lng+"-"+data.lat+"</span></div>" +
                "<div class=\"popothermess\"><span>地址：</span><span><a id=\"pos"+data.id+"\" href=\"javascript:clickToQuery('"+data.id+"','"+data.lat+","+data.lng+"')\">点击查询地址</a></span></div></div>" +
                "<div class=\"poperation\">" +
                "<button onclick='rollCall(\""+data.carNo+"\",\"123456\")'>点名</button>" +
                "<button>跟踪</button>" +
                "<button onclick='frequencyConversion()'>变频</button>" +
                "<button>轨迹</button>" +
                "<button>报文</button>" +
                "<button>事件</button>" +
                "<button>抓拍</button>" +
                "<button>参数</button>" +
                "<button>提问</button>" +
                "<button>视频</button>" +
                "</div></div>";
            return contentString;

        },

        // 根据经纬度生成位置描述
        getAddress: function (lng, lat, callback) {
            // 别的程序也要使用获取位置，所以放在主程序
            try {
                parent.parent.g_Main.getAddress(lng, lat, callback);
            } catch (e) {
            }
        },

        // 根据速度生成颜色
        getColorBySpeed: function (speed) {
            if (speed >= 10)
                return "red";
            else if (speed >= 6 && speed < 10)
                return "#FF00FF";
            else
                return "green";
        },
        getColorByHaving: function (isHaving) {
            if(isHaving){
                return "#ff6161"; // 红色 重车
            }else{
                return "#31dfb3"; // 绿色 空车
            }
        },

        // 刷新线的属性，基本都有getPath函数，如果遇到不一致的，再考虑重载吧
        _refreshPolyline: function (poly, opt) {
            if (poly && opt.add) {            // 如果刷新只是添加点
                var path = poly.getPath();   // 获取路径
                path.push(opt.add);        // 添加点
                poly.setPath(path);        // 更新路径
            }
        },

        // 显示车辆
        showCar: function (car, fit) {
            // 验证一下参数

            if (!car || !car.pos)
                return;
            var carMarkers = this._carMarkers;//哈希表里存储的车辆标签
            var carLines = this._carLines;//只保存一辆车的实时轨迹
            var icon;//车辆图标

            var loginUrl = unescape(parent.parent.TUI.Core.getRequestParam("loginUrl"));
            if (loginUrl.indexOf("chexiaomi") > -1)
                icon = "../images/chexiaomi/cheCar.gif";
            else
                icon = "../images/carIcon/" + car.getIcon();
            // 更新车辆图标
            var opt = {
                lngLat: this._newLngLat(car.pos.lng, car.pos.lat), // 位置
                icon: icon, // 图标
                size: {x: 32, y: 32}, // 图标大小
                label: car.carNO + "," + car.pos.getSpeed(), // label里的文字
                offset: {x: 32, y: 6}                                    // 标题偏移
            };

            var marker = carMarkers.get(car.carId);
            if (marker == null) {   // 如果原来不存在该图标
                marker = this._newMarker(opt);
                this._addOverlay(marker);      // 添加到地图上

                this._addInfoWindow(marker, car, car.pos);   // 添加信息窗口
                this._openInfoWindow(marker, car, car.pos);
                carMarkers.put(car.carId, marker);           // 加入到车辆标记列表，hashmap里的put方法，根据key，value添加数据
            }
            else {//如果存在该图标就刷新marker
                this._refreshMarker(marker, opt);
                this._addInfoWindow(marker, car, car.pos);   // 重新添加信息窗口
                if (fit === true) this._openInfoWindow(marker, car, car.pos);
                if (this._infoWin && this._infoWin.carId == car.carId) {  // 如果当前信息窗口正在显示是本车，则更新信息窗口
                    this._refreshInfoWindow(marker, car, car.pos);
                }
            }
            // 如果需要显示轨迹
            if (car.showLine) {
                // var col = this.getColorBySpeed(car.pos.speed);  // 根据速度取出当前颜色
                var col = this.getColorByHaving(car.isHaving);  // 根据速度取出当前颜色
                if (carLines.carId == car.carId) {  // 如果刚好是当前车辆的轨迹
                    var line = carLines[carLines.length - 1];   // 取出最后一条
                    if (line.color != col) {  // 如果颜色变化了
                        var lngLat = [];
                        var lineArray = this._getPath(line);  // 获取线段的轨迹

                        //兼容下腾讯地图
                        if (maptype == 5 || maptype == 6) {
                            lngLat.push(lineArray.elems[lineArray.length - 1]);
                        } else {
                            lngLat.push(lineArray[lineArray.length - 1]);
                        }
                        lngLat.push(opt.lngLat);
                        var line = this._newPolyline({lngLat: lngLat, color: col});//添加折线覆盖物
                        // 生成新颜色的轨迹
                        this._addOverlay(line);
                        line.color = col;
                        carLines.push(line);   // 新线加入到数组中
                    } else {
                        this._refreshPolyline(line, {add: opt.lngLat});  //颜色没变化，往线里面添加一个点就行了
                    }
                } else {  // 如果不是当前车辆的轨迹
                    // 先清空原来的轨迹
                    for (var i = 0; i < carLines.length; i++) {
                        this._removeOverlay(carLines[i]);
                    }
                    carLines.length = 0;   // 清空数组
                    // 生成新线
                    var line = this._newPolyline({lngLat: [opt.lngLat], color: col});   // 生成新轨迹
                    this._addOverlay(line);
                    line.color = col;     // 保存线的颜色
                    carLines.push(line);   // 加入到数组中
                    carLines.carId = car.carId;   // 记住对应的车辆ID
                }
            }
            // 如果原来有这个车的轨迹，要清空
            else if (carLines.carId == car.carId) {
                // 先清空原来的轨迹
                for (var i = 0; i < carLines.length; i++) {
                    this._removeOverlay(carLines[i]);
                }
                carLines.length = 0;   // 清空数组
            }
            // 如果需要聚焦到车辆上
            if (fit) {
                this.setCenter(car.pos.lng, car.pos.lat, 16);
            }
            // 如果设定了锁定窗口
            if (car.lockWindow) {
                this.lockWindowByLngLat(opt.lngLat);

            }
        },

        filterSpider: function (historys) {

            var itemI = historys[0];
            var historysMap = new TUI.util.HashMap();//需要过滤的点
            var lessHis = new TUI.util.HashMap();//距离小于三百的所有点
            //将轨迹组装到哈希表中
            var len = historys.length;
            for (var i = 0; i < len; i++) {
                historysMap.put(historys[i].gpstime, historys[i]);
            }
            //var maxdeviant = 0;//找出最大的圆的半径
            //遍历后面的接点是否在以该点为圆心，半径为300米的圆内
            for (var j = 1; j < len; j++) {

                var itemJ = historys[j];
                var startPoint = this._newLngLat(itemI.lng, itemI.lat);
                var endPoint = this._newLngLat(itemJ.lng, itemJ.lat);
                var distance = (maptype == 2 || maptype == 3) ? TUI.Core.getDistance(startPoint.lng(), startPoint.lat(), endPoint.lng(), endPoint.lat()) * 1000 : TUI.Core.getDistance(startPoint.lng, startPoint.lat, endPoint.lng, endPoint.lat) * 1000;//计算两点之间的距离,单位米
                if (!this._pItemList.containsKey(itemI.gpstime))
                    this._pItemList.put(itemI.gpstime, itemI);//画点表中也保存该点
                if (!this._pItemList.containsKey(itemJ.gpstime))
                    this._pItemList.put(itemJ.gpstime, itemJ);//画点表中保存该点等到了9时删除
                if (distance <= 300) {//如果距离小于（暂定）300(最小值)
                    //if (distance > maxdeviant)//如果距离大于最大距离
                    // maxdeviant = distance;//只保存最大的半径
                    lessHis.put(itemJ.gpstime, itemJ);//key: 定位时间，value: pos位置
                } else
                    continue;//不处理


            }


            //处理完一个点后---保存这个圆内有报警点的
            if (lessHis.size() > 13) {
                if (!this._cItemList.containsKey(itemI.gpstime)) {
                    var circle = new Object();
                    circle.alarm = itemI.alarm;//报警信息
                    circle.gpstime = itemI.gpstime;
                    circle.newCenter = startPoint;
                    circle.lng = itemI.lng;
                    circle.lat = itemI.lat;
                    //circle.newDeviant = maxdeviant;
                    this._cItemList.put(itemI.gpstime, circle);//画圆表保存该点
                }
                var hMArr = historysMap.getKeys();//所有需要过滤的点的时间key
                var lHArr = lessHis.getKeys();//符合某一个点的所有小于三百的时间key
                var pItemArr = this._pItemList.getKeys();//<300的点积累到9时需要删除
                for (var l in lHArr) {
                    for (var h in hMArr) {
                        if (hMArr[h] == lHArr[l]) {//如果需要过滤的点和<350的点相同则融合
                            if (historysMap.containsKey(hMArr[h]))
                                historysMap.remove(hMArr[h]);//根据key删除value
                        }
                    }
                    for (var p in pItemArr) {
                        if (lHArr[l] == pItemArr[p]) {//如果需要绘制的点和<350的点相同则融合
                            if (this._pItemList.containsKey(pItemArr[p]))
                                this._pItemList.remove(pItemArr[p]);//根据key删除value

                        }
                    }
                }
                try {
                    var lelen = lessHis.getValues().length;
                    var alarmItems = [];//蜘蛛圆中的报警组合
                    for (var le = 0; le < lelen; le++) {
                        var alarm = lessHis.getValues()[le].alarm;
                        if (alarm && alarm.length > 2) {//如果有报警信息
                            alarmItems.push(lessHis.getValues()[le]);
                        }
                    }
                    if (!this._cpItemList.containsKey(itemI.gpstime) && alarmItems.length > 0)
                        this._cpItemList.put(itemI.gpstime, alarmItems);//保存到报警哈希中
                } catch (e) {
                    alert(e);
                }
            }
            if (historysMap.containsKey(itemI.gpstime))
                historysMap.remove(itemI.gpstime);//过滤完之后删除该点
            if (historysMap.size() == 0) return;
            else {
                var historys = historysMap.getValues();//重新组装需要过滤的点
                this.filterSpider(historys);//递归调用
            }
        },

        //处理圆，如果两个圆有交叉，即圆心距离小于400的时候，归并成一个
        //半径=两点之间的距离加上400/2
        filterCircle: function (cItemList) {
            try {
                var size = cItemList.size();
                if (size == 0) {
                    return;
                }

                var cArr = cItemList.getValues();//获取圆对象
                //for (var i = 0; i < cArr.length; i++) {
                var startPoint = cArr[0].newCenter;
                for (var j = 1; j < cArr.length; j++) {
                    var endPoint = cArr[j].newCenter;
                    var distance = this.TUI.Core.getDistance(startPoint.lng, startPoint.lat, endPoint.lng, endPoint.lat) * 1000;//计算两点之间的距离

                    if (distance < 300) {//证明这两个圆有交叉

                        var newDeviant = (distance + 600) / 2;
                        //大致得到经纬度
                        var newCenter = this._newLngLat((cArr[0].newCenter.lng + cArr[j].newCenter.lng) / 2, (cArr[0].newCenter.lat + cArr[j].newCenter.lat) / 2);
                        var newCircle = new Object();//定义一个圆对象
                        newCircle.gpstime = cArr[0].gpstime;//新的圆时间
                        newCircle.newCenter = newCenter;//新的圆中心
                        newCircle.newDeviant = newDeviant;
                        //删除融合的圆
                        if (this._cItemList.containsKey(cArr[0].gpstime)) {
                            this._cItemList.remove(cArr[0].gpstime);
                            this._pItemList.remove(cArr[0].gpstime);
                        }
                        if (this._cItemList.containsKey(cArr[j].gpstime)) {
                            this._cItemList.remove(cArr[j].gpstime);
                            this._pItemList.remove(cArr[j].gpstime);
                        }
                        //融合成一个新的圆

                        this._cItemList.put(cArr[0].gpstime, newCircle);
                        //this.filterCircle(this._cItemList);//递归调用;


                    } else {
                        //如果没有相交，则跳过
                        continue;
                    }
                }

                var filterCList = this.cloneO(this._cItemList);
                if (filterCList.containsKey(cArr[0].gpstime))
                    filterCList.remove(cArr[0].gpstime);
                //this.filterCircle(filterCList);//递归调用
            } catch (e) {
                alert(e);
            }

        },

        //克隆对象
        cloneO: function (myObj) {
            if (typeof(myObj) != 'object') return myObj;
            if (myObj == null) return myObj;
            var myNewObj = new Object();
            for (var i in myObj)
                myNewObj[i] = this.cloneO(myObj[i]);
            return myNewObj;
        },

        //过滤夹角暂定为<45的去掉
        //注在一个地方漂移很久的点则不过滤（后期考虑）
        filterAngle: function (historys) {

            try {
                var len = historys.length;
                for (var i = 0; i < len; i++) {
                    this._pItemList.put(historys[i].gpstime, historys[i]);
                }

                if (len < 3) return;
                for (var i = 0; i < len - 2; i++) {
                    var pointA = historys[i];
                    var pointB = historys[i + 1];
                    var pointC = historys[i + 2];
                    //计算角度
                    var start = {x: pointA.lng - pointB.lng, y: pointA.lat - pointB.lat},
                        end = {x: pointC.lng - pointB.lng, y: pointC.lat - pointB.lat};
                    var angle = this.getPointAngle(start, end);

                    if (angle > 0.707) {//角度小于45度
                        if (this._pItemList.containsKey(pointB.gpstime)) {
                            this._pItemList.remove(pointB.gpstime);
                        }
                        /* i = i + 1;*/
                        /*continue;*/
                    } else {//角度大于45，则保存中间点

                        continue;
                    }


                }
            } catch (e) {
                alert(e);
            }
            //return this._pItemList.getValues();
        },
        getFilteredPositions: function (historys) {
            try {
                var index = [];
                var len = historys.length;
                for (var i = 0; i < len; i++) {
                    this._pItemList.put(historys[i].gpstime, historys[i]);
                }

                if (len < 3) return;
                for (var i = 0; i < len - 2; i++) {
                    var pointA = historys[i];
                    var pointB = historys[i + 1];
                    var pointC = historys[i + 2];
                    //计算角度
                    var start = {x: pointA.lng - pointB.lng, y: pointA.lat - pointB.lat},
                        end = {x: pointC.lng - pointB.lng, y: pointC.lat - pointB.lat};
                    var angle = this.getPointAngle(start, end);

                    if (angle > 0.707) {//角度小于45度
                        index.push(i + 1);
                        if (this._pItemList.containsKey(pointB.gpstime)) {
                            this._pItemList.remove(pointB.gpstime);
                        }
                        /* i = i + 1;*/
                        /*continue;*/
                    } else {//角度大于45，则保存中间点

                        continue;
                    }


                }
            } catch (e) {
                alert(e);
            }
            return index;
        },
        //获取夹角
        getPointAngle: function (start, end) {

            var x1 = start.x, y1 = start.y;
            var x2 = end.x, y2 = end.y;
            var step1 = x1 * x2 + y1 * y2;
            var step2 = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2)) * Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2));
            //   acrcos 0.866 30    0.707   45
            return step1 / step2;


        },
        getFilteredPoints: function (historys) {

            if (historys.length == 0) {
                return historys;
            } else {
                this._pItemList.clear();
                this._cpItemList.clear();
                this._cItemList.clear();
                // 如果已经有轨迹，先清除
                if (this._historyMarkers.length > 0)
                    this.cleanHistoryLine();//清除所有点
                // 先保存轨迹数据
                //this._historyData = historys;
                // 有起始点，则先绘制起始点
                if (historys.length == 0) return;
                var pArr;//需要绘制的点

                this.filterAngle(historys);//过滤锐角

                /*if (this._pItemList.getValues().length < 400)//小于400个点
                 this.filterSpider(this._pItemList.getValues());//过滤蜘蛛网*/
                if (!this._pItemList.containsKey(historys[historys.length - 1].gpstime))
                    this._pItemList.put(historys[historys.length - 1].gpstime, historys[historys.length - 1]);
                return this._pItemList.getValues();
            }

        },
        // 绘制轨迹
        drawHistoryLine: function (historys) {
            // 这里是计算走了多少距离
            var distanceMap = {};
            var totalDistance = 0;
            distanceMap[0] = totalDistance;
            // 1：谷歌 0：百度
            if(maptype == 0){
                for(var i = 0; i < historys.length; i++){
                    if(i > 0){
                        var point1 = new BMap.Point(historys[i-1].lng,historys[i-1].lat);
                        var point2 = new BMap.Point(historys[i].lng,historys[i].lat);
                        var distance = this._map.getDistance(point1,point2);
                        totalDistance += distance;
                        distanceMap[i] = totalDistance;
                    }
                }
            }else{
                for(var i = 0; i < historys.length; i++){
                    if(i > 0){
                        var point1 = new google.maps.LatLng(historys[i-1].lat,historys[i-1].lng);
                        var point2 = new google.maps.LatLng(historys[i].lat,historys[i].lng);
                        var distance = google.maps.geometry.spherical.computeDistanceBetween(point1,point2);
                        totalDistance += distance;
                        distanceMap[i] = totalDistance;
                    }
                }
            }
            this._distanceMap = distanceMap;
            // 这里是计算走了多少距离

            // 如果已经有轨迹，先清除
            //this._pItemList.clear();
            if (this._historyMarkers.length > 0)
                this.cleanHistoryLine();
            // 保存下轨迹数据先
            this._historyData = historys;
            // 有起始点，则先绘制起始点
            if (historys.length > 0) {
                var first = historys[0];
                var opt = {
                    lngLat: this._newLngLat(first.lng, first.lat), // 位置
                    // icon: "../images/carIcon/startpos" + (lang == 'cn' ? '' : '_' + lang) + ".gif", // 图标
                    icon: "icon-start-en.png",
                    size: {x: 36, y: 45},                                       // 图标大小
                };
                var firstMarker = this._newMarker(opt);
                this._addOverlay(firstMarker);
                // this._addInfoWindow(firstMarker, car, first);
                this._historyMarkers.push(firstMarker);
            }
            // 有超过1个点
            if (historys.length > 1) {
                // 生成结束点
                var last = historys[historys.length - 1];
                var opt = {
                    lngLat: this._newLngLat(last.lng, last.lat), // 位置
                    // icon: "../images/carIcon/stoppos" + (lang == 'cn' ? '' : '_' + lang) + ".gif", // 图标
                    icon: "icon-end-en.png",
                    size: {x: 36, y: 45},                    // 图标大小
                };
                var lastMarker = this._newMarker(opt);
                this._addOverlay(lastMarker);
                // this._addInfoWindow(lastMarker, car, last);
                this._historyMarkers.push(lastMarker);
                // 遍历所有轨迹，生成需要的标签
                var lngLats = [];
                var color = null;
                for (var i = 0; i < historys.length; i++) {
                    var item = historys[i];

                    lngLats.push(this._newLngLat(item.lng, item.lat));  // 添加到数组构成线
                    // var col = this.getColorBySpeed(item.speed);  // 根据速度取出当前颜色
                    var col = this.getColorByHaving(item.isHaving);  // 根据空重车状态取出当前颜色
                    if (color) {
                        if (col != color) {   // 如果颜色变化
                            var polyline = this._newPolyline({lngLat: lngLats, color: color});     // 绘制轨迹
                            this._addOverlay(polyline);
                            this._historyMarkers.push(polyline);
                            lngLats = [];  // 清空轨迹点
                            lngLats.push(this._newLngLat(item.lng, item.lat));  // 添加当前点到数组
                            color = col;                                           // 更新当前颜色
                        }
                    } else {  // 如果没有初始颜色，则取个起点颜色
                        color = col;
                    }
                }
                // 绘制轨迹
                if (lngLats.length >= 2) {
                    var polyline = this._newPolyline({lngLat: lngLats, color: color});
                    this._addOverlay(polyline);
                    this._historyMarkers.push(polyline);
                }
                // 调整窗口大小 这里是使得第一次加载轨迹的时候 可以让所有的轨迹在可视窗口中出现
                this._setFitview(this._historyMarkers);
            }
            // 这里创建已经行驶过的轨迹的对象
            // 0：百度 1：谷歌
            if(maptype == 0){
                this._passedPolyline = new BMap.Polyline(null, {strokeColor: "#EFEEEC", strokeOpacity: 0.5, strokeWeight: 5});
            }else{
                this._passedPolyline = new google.maps.Polyline({
                    path: [], // 这个path不能为空 否则浏览器会报错 InvalidValueError: not an Array
                    strokeColor: "#EFEEEC", // 线条颜色
                    strokeOpacity: 0.5, // 线条透明度
                    strokeWeight: 5 // 线条粗细
                });
            }
            this._addOverlay(this._passedPolyline);
        },
        // 绘制轨迹  是否带图标
        drawPos: function(historys,isIcon){
            // 如果已经有轨迹，先清除
            //this._pItemList.clear();
            // 这个_historyMarkers不仅保存了marker还保存了轨迹posline
            // if (this._historyMarkers.length > 0)
            this.cleanHistoryLine();
            // 保存下轨迹数据先
            this._historyData = historys;
            // 有起始点，则先绘制起始点
            if (historys.length > 0 && isIcon) {
                var first = historys[0];
                var opt = {
                    lngLat: this._newLngLat(first.lng, first.lat), // 位置
                    // icon: "../images/carIcon/startpos" + (lang == 'cn' ? '' : '_' + lang) + ".gif", // 图标
                    icon: "icon-start-en.png",
                    size: {x: 36, y: 45},                                       // 图标大小
                };
                var firstMarker = this._newMarker(opt);
                this._addOverlay(firstMarker);
                // this._addInfoWindow(firstMarker, car, first);
                this._historyMarkers.push(firstMarker);
            }
            // 有超过1个点
            if (historys.length > 1) {
                // 生成结束点
                if(isIcon){
                    var last = historys[historys.length - 1];
                    var opt = {
                        lngLat: this._newLngLat(last.lng, last.lat), // 位置
                        // icon: "../images/carIcon/stoppos" + (lang == 'cn' ? '' : '_' + lang) + ".gif", // 图标
                        icon: "icon-end-en.png",
                        size: {x: 36, y: 45},                    // 图标大小
                    };
                    var lastMarker = this._newMarker(opt);
                    this._addOverlay(lastMarker);
                    // this._addInfoWindow(lastMarker, car, last);
                    this._historyMarkers.push(lastMarker);
                }
                // 遍历所有轨迹，生成需要的标签
                var lngLats = [];
                var color = null;
                for (var i = 0; i < historys.length; i++) {
                    var item = historys[i];

                    lngLats.push(this._newLngLat(item.lng, item.lat));  // 添加到数组构成线
                    // var col = this.getColorBySpeed(item.speed);  // 根据速度取出当前颜色
                    var col = this.getColorByHaving(item.isHaving);  // 根据空重车状态取出当前颜色
                    if (color) {
                        if (col != color) {   // 如果颜色变化
                            var polyline = this._newPolyline({lngLat: lngLats, color: color});     // 绘制轨迹
                            this._addOverlay(polyline);
                            this._historyMarkers.push(polyline);
                            lngLats = [];  // 清空轨迹点
                            lngLats.push(this._newLngLat(item.lng, item.lat));  // 添加当前点到数组
                            color = col;                                           // 更新当前颜色
                        }
                    } else {  // 如果没有初始颜色，则取个起点颜色
                        color = col;
                    }
                }
                // 绘制轨迹
                if (lngLats.length >= 2) {
                    var polyline = this._newPolyline({lngLat: lngLats, color: color});
                    this._addOverlay(polyline);
                    this._historyMarkers.push(polyline);
                }
                // 调整窗口大小  当代图标的时候再设置
                if(isIcon){
                    this._setFitview(this._historyMarkers);
                }
            }
        },
        // 根据两点经纬度获取轨迹角度  前一个点的经纬度-当前点的经纬度
        getAngle: function (lng1, lat1, lng2, lat2) {
            // console.info("lng1, lat1 -- " + lng1 +","+ lat1+"--lng2, lat2 --" + lng2 + "," + lat2);
            var self = this;
            var angle = 0;
            // var maptype = self._maptype;
            if(maptype == 0){
                // 百度
                // var dx = lng2 - lng1;
                // var dy = lat2 - lat1;
                // if(dy != 0){
                //     var rad = Math.atan(Math.abs(dx / dy));
                //     angle = rad * 180.0 / Math.PI;
                //     if (dx > 0 && dy <= 0)  // 二象限
                //         return 180 - angle;
                //     else if (dx <= 0 && dy < 0)  // 三象限
                //         return 180 + angle;
                //     else if (dx < 0 && dy >= 0)  // 四象限
                //         return 360 - angle;
                //     else
                //         return angle;
                // }

                /**
                 *在每个点的真实步骤中设置小车转动的角度
                 */
                    //start!
                    var curPos =  self._map.pointToPixel(new BMap.Point(lng1, lat1));
                    var targetPos =  self._map.pointToPixel(new BMap.Point(lng2, lat2));
                    if(targetPos.x != curPos.x){
                        var tan = (targetPos.y - curPos.y)/(targetPos.x - curPos.x),
                            atan  = Math.atan(tan);
                        angle = atan*360/(2*Math.PI);
                        //degree  correction;
                        if(targetPos.x < curPos.x){
                            angle = -angle + 90 + 90;
                        } else {
                            angle = -angle;
                        }
                        angle = -angle;
                    }else {
                        var disy = targetPos.y- curPos.y ;
                        var bias = 0;
                        if(disy > 0){
                            bias=-1
                        }else{
                            bias = 1
                        }
                        angle = -bias * 90;
                    }
                // console.info("lng1, lat1 -- " + lng1 +","+ lat1+"--lng2, lat2 --" + lng2 + "," + lat2 + " -- angle -- " + angle);
                // console.info("angle -- " + angle);
            }else{
                // 谷歌
                var prevPoint = new google.maps.LatLng(lat1,lng1);
                var currentPoint = new google.maps.LatLng(lat2,lng2);
                angle = google.maps.geometry.spherical.computeHeading(prevPoint,currentPoint);
            }
            return angle;
        },
        // 移动到index帧，根据回放进度滑动条的位置调整车辆的位置和角度
        moveTo: function ( index, interval) {//index代表播放进度滚动条的位置，interval为播放速度，即多长时间更新车辆的位置
            var self = this;
            var historys = this._historyData;//所有轨迹数据
            if (historys == null || historys.length == 0 || index >= historys.length)
                return;
            // 算出当前位置对应的数据
            var history = historys[index];//根据播放进度取出当前位置对应的数据
            // 车辆图标和简要信息提示（GPS时间，定位方式，速度，车辆状态）
            var playMarker = this._playMarker;
            // GPS中的方向字段经常没有，通过小车路线来区分方向
            // var dir = history.direction;
            var rotation = history.angle;
            if (index > 0) {   // 如果有前一个点，则用这两个点构造方向
                var last = historys[index - 1];
                rotation = this.getAngle(last.lng, last.lat, history.lng, history.lat);
            }
            // var icon = "../images/carIcon/truck/0.png";
            var icon = "../images/carIcon/truck/car.png";
            // var maptype = self._maptype;
            if(maptype == 0){
                // 百度
            }else{
                // 谷歌
                if(rotation || rotation == 0){
                    icon = {
                        path:"M18.227,24.134a0.772,0.772,0,0,1,.773.772v2.51a0.772,0.772,0,0,1-.773.772H18.034v6.95A3.863,3.863,0,0,1,14.171,39H6.83a3.863,3.863,0,0,1-3.864-3.861v-6.95H2.773A0.772,0.772,0,0,1,2,27.416v-2.51a0.772,0.772,0,0,1,.773-0.772H2.926L2.862,20.079H2.773A0.773,0.773,0,0,1,2,19.307V16.8a0.772,0.772,0,0,1,.773-0.772H2.8L2.65,6.636A6.375,6.375,0,0,1,8.863,0h3.255a6.375,6.375,0,0,1,6.214,6.636l-0.148,9.389h0.044A0.772,0.772,0,0,1,19,16.8v2.51a0.773,0.773,0,0,1-.773.772H18.12l-0.064,4.055h0.172ZM10.4,34.559a10.735,10.735,0,0,0,5.315-1.307l-0.6-4.87a11,11,0,0,1-4.887,1.078,11.175,11.175,0,0,1-4.563-.926l-0.579,4.72A10.737,10.737,0,0,0,10.4,34.559ZM3.932,30.891l1.352-1.738V24.327l-1.352-.772v7.337Zm0-7.916,1.352,0.772V17.955L3.932,14.48v8.5ZM10.4,9.653a12.239,12.239,0,0,0-6.045,1.483L5.017,16.5a12.74,12.74,0,0,1,5.193-1.052,12.538,12.538,0,0,1,5.562,1.224l0.68-5.531A12.236,12.236,0,0,0,10.4,9.653Zm6.665,4.634-1.352,3.668v5.792l1.352-.772V14.287Zm0,9.267-1.352.772v4.827l1.352,1.738V23.555Z",
                        anchor:new google.maps.Point(14, 22), // 图片分辨率  28*43
                        fillColor:"#4D7CE0",
                        fillOpacity:1,
                        strokeOpacity:0,
                        rotation:rotation
                    };
                }
            }
            history.angle = rotation;
            var loginUrl = unescape(parent.parent.TUI.Core.getRequestParam("loginUrl"));
            // 构造参数
            var opt = {
                lngLat: this._newLngLat(history.lng, history.lat), // 位置
                icon: icon, // 图标
                size: {x: 44, y: 20}, // 图标大小
                label: this.getSimpleCarTip(index,history), //车辆简要信息提示
                offset: {x: 48, y: 6},
                rotation: rotation,
            };
            // 如果还没创建播放点，则创建
            if (playMarker == null) {
                playMarker = this._newMarker(opt);
                this._addOverlay(playMarker);
                this._playMarker = playMarker;//保存播放标记点
            }
            // 已经创建则只更新
            else {
                if (self.timer)  // 重新刷新点时，一定要停止动画
                    clearTimeout(self.timer);

                this._refreshMarker(playMarker,opt);
                if (interval && index > 0) {  // 如果有前一个点，取出来实现动画效果
                    var last = historys[index - 1];
                    var dx = (history.lng - last.lng) / 10.0;
                    var dy = (history.lat - last.lat) / 10.0;
                    var i = 10;
                    var doMove = function () {
                        var lng = history.lng - dx * i;
                        var lat = history.lat - dy * i;
                        playMarker.setPosition(self._newLngLat(lng, lat));  // 移动播放标记点
                        if (i-- > 0) {
                            // 这里绘制已经走过的轨迹
                            self.hasPassedPos(self._newLngLat(lng, lat));
                            // 这里绘制已经走过的轨迹
                            self.timer = setTimeout(doMove, Math.round(interval));//Math.round(interval)更新一次车辆位置
                        }
                    };
                    // 执行动画
                    if (interval > 0)
                        doMove();
                } else {   // 不使用动画效果
                    this._refreshMarker(playMarker, opt);
                }
            }
            //如果已经有信息窗口则关闭
            if (this._infoWin) {
                this._infoWin.close();
                this._infoWin = null;
            }
            // 添加信息窗口
            // this._addInfoWindow(playMarker, car, history);
            var cpKeys = this._cpItemList.getKeys();//所有需要弹出报警提示框的点
            try {
                if (cpKeys.length != 0) {//如果有需要弹出报警框的
                    for (var cp in cpKeys) {
                        if (history.gpstime == cpKeys[cp]) {
                            if (index == 0) {  //如果是起始点

                                if (this._cpItemList.containsKey(history.gpstime) && this._cpItemList.get(history.gpstime).length > 0)
                                    this._addCInfoWindow(playMarker, car, history, historys.length > 1 ? historys[1] : history, this._cpItemList.get(history.gpstime));//重新组装信息框
                                break;
                            } else if (index == historys.length - 1 && historys > 1) {//如果是终点
                                if (this._cpItemList.containsKey(history.gpstime) && this._cpItemList.get(history.gpstime).length > 0)
                                    this._addCInfoWindow(playMarker, car, history, historys[index - 2], this._cpItemList.get(history.gpstime));//重新组装信息框
                                break;
                            } else {

                                if (this._cpItemList.containsKey(history.gpstime) && this._cpItemList.get(history.gpstime).length > 0)
                                    this._addCInfoWindow(playMarker, car, history, historys[index + 1], this._cpItemList.get(history.gpstime));//添加报警信息框
                                break;
                            }

                        }

                    }
                }
            } catch (e) {
                alert(e);
            }
            // 如果当前信息窗口正在显示是本车，则更新信息窗口
            if (this._infoWin && this._infoWin.carId == car.carId) {
                this._refreshInfoWindow(playMarker, car, history);
            }
            // 调整窗口位置 这里是当车辆离开可视窗口后  转移到以当前坐标为中心的可视窗口中
            this.lockWindowByLngLat(opt.lngLat);

        },

        /////////////////////////////////////安全管理事件，防止未释放///////////////////////
        // 安全注册事件      对象   动作名  动作
        _safeBind: function (elem, event, fun) {
            // this.events = this.events ? this.events : [];   // 有一个数组来存储所有事件
            this._cleanBind(elem, event);//先释放所有绑定事件
            this._bind(elem, event, fun);//根据相应地图注册对象事件
            // this.events.push({elem: elem, event: event, fun: fun});//保存到数组里
        },

        // 根据条件返回对象  参数允许为空
        _getBind: function (elem, event) {
            var ret = [];
            if (this.events) {
                for (var i = 0; i < this.events.length; i++) {
                    var cur = this.events[i];
                    if ((!elem || cur.elem == elem) && (!event || cur.event == event))
                        ret.push(cur);
                }
            }
            return ret;//返回绑定的事件
        },

        // 释放绑定事件 参数允许为空，为空则选择所有
        _cleanBind: function (elem, event) {
            var ret = this._getBind(elem, event);//获取所有绑定的事件
            for (var i = 0; i < ret.length; i++) {
                var cur = ret[i];
                this._unbind(cur.elem, cur.event, cur.fun);//根据相应地图删除该对象上指定事件的所有侦听器
                this.events.remove(cur);//从数组中清除事件
            }

        },
        /////////////////////////////////////空间对象相关///////////////////////////////////
        // json转成经纬度数组
        _parsePoints: function (points) {
            var res = [];
            for (var i = 0; i < points.length; i++) {
                res.push(this._newLngLat(points[i].lng, points[i].lat));
            }
            return res;
        },
        //清空所有空间对象
        cleanAllGeo: function () {
            if (this._geo) {
                this._removeOverlay(this._geo);
                this._geo = null;//清除单个空间对象
            }
            if (this._geoObjects && this._geoObjects.length > 0) {
                for (var i = 0; i < this._geoObjects.length; i++) {
                    this._removeOverlay(this._geoObjects[i]);//清除地图上绘制的所有空间对象
                }
                this._geoObjects = [];
            }
        },
        // 结束绘制空间对象
        endGeo: function () {
            // 设为缺省指针
            this._setDefaultCursor();

            // 结束绘制
            if (this._geo) {
                var points = "";
                var path = [];
                if (this._geo.getPath)
                    path = this._geo.getPath();
                else
                    path.push(this._geo.getPosition());
                // 将所有点连成一个字符串
                for (var i = 0; i < path.length; i++) {
                    if (i != 0)
                        points += ';';
                    points += path[i].lng.toFixed(6) + ',' + path[i].lat.toFixed(6);
                }
                // 传递坐标给上层
                try {
                    parent.parent.g_Main.geoDialog.onEndGeo(points);
                }
                catch (e) {
                }
                this._cleanBind(this._geo);  // 清空绑定的事件
                this._cleanBind(this._map);
            }
        },
        // 重新从索引处画已走过的轨迹
        _restartByIndex: function(index){
            // 已走过的路径清空 然后将path中的值 从0加到index
            var path = [];
            var historys = this._historyData;
            for(var i = 0; i < historys.length; i++){
                if(i <= index){
                    path.push(historys[i]);
                }
            }
            this._passedPolyline.setPath(path);

        }
    }
});


var start = 10;
var step = -1;

function countdown() {
    document.getElementById("countHtml").innerHTML = start;
    start += step;
    if (start < 1)
        start = 10;
    setTimeout("countdown()", 1000);

}

function turnMapType(maptype) {
    if (maptype == 0 || maptype == 1) {
        return 3;
    } else {
        return 5;
    }
}
