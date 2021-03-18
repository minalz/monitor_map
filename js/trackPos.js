var carNo = "";
var trackPoints = [];
var direction = 0;
var map;
var g_Map = null;
// 从参数中提取地图类型，如果没指定，则默认为0
var maptype = TUI.Core.getRequestParam("maptype");
if (maptype == 0) {
    document
        .writeln('<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=QayQeUy9OawntBa9fHNKKTwL"><\/script>');
    // document
    //     .writeln('<script type="text/javascript" src="../js/maps/baidu/customerLushu.js"><\/script>');
    document
        .writeln('<script type="text/javascript" src="../js/maps/baidu/rectangleZoom.js"><\/script>');
    document
        .writeln('<script type="text/javascript" src="../js/maps/baidu/distanceTool.js"><\/script>');
    document
        .writeln('<script type="text/javascript" src="../js/maps/baidu/baiduImpl.js"><\/script>');
}else{
    document.writeln('<script type="text/javascript" src="http://maps.google.cn/maps/api/js?key=AIzaSyBczwA1o2F5_2JyIc_JEt5ylprGT1Nvpbc&libraries=drawing,geometry,visualization"></script>');
    document.writeln('<script type="text/javascript" src="../js/maps/google/labelmarker.js"></script>');
    document.writeln('<script type="text/javascript" src="../js/maps/google/googleImpl.js"></script>');
}
$(function(){
    // 1:谷歌  0:百度
    if (maptype == 0) {
        g_Map = new TUI.map.BaiduImpl();
    }else{
        g_Map = new TUI.map.GoogleImpl();
    }
    g_Map.createMap();
    // g_Map._maptype = maptype;
    initPos();
    // 开始点击事件
    $("#start").on('click', function () {
        // var getProjection = map.getProjection();
        // console.info(getProjection);
        // initPos();
        startPlay();
    });
    // 暂停点击事件
    $("#stop").on('click',function(){
        stopPlay();
    });
    // 重新开始点击事件
    $("#restart").on('click',function(){
        // var path = g_Map._getPath(g_Map._passedPolyline).push([]);
        g_Map._passedPolyline.setPath([]);
        playIndex = 0;
        startPlay();
    });
    $("#playInterval").on('click',function () {
        playInterval = $("#interval").val();
    });
    $("#restartIndex").on('click',function(){
        var index = $("#index").val();
        playIndex = index;
        g_Map._restartByIndex(playIndex);
    });
});

function initMap() {
    map = new google.maps.Map(
        document.getElementById("map"),{
            zoom: 12,
            center: trackPoints[0],
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
        });

    var startPoint = trackPoints[0];
    var endPoint = trackPoints[trackPoints.length-1];
    if(startPoint!=null){
        var marker = new google.maps.Marker({
            position: startPoint,
            map: map,
            icon:{
                url:"icon-start-en.png",
                scaledSize:new google.maps.Size(36,45),
            },
            title: 'start location',
        });
    }
    if(endPoint!=null){
        var marker = new google.maps.Marker({
            position: endPoint,
            map: map,
            icon:{
                url:"icon-end-en.png",
                scaledSize:new google.maps.Size(36,45),
            },
            title: 'end location',
        });
    }

    var symbol = {
        path:"M18.227,24.134a0.772,0.772,0,0,1,.773.772v2.51a0.772,0.772,0,0,1-.773.772H18.034v6.95A3.863,3.863,0,0,1,14.171,39H6.83a3.863,3.863,0,0,1-3.864-3.861v-6.95H2.773A0.772,0.772,0,0,1,2,27.416v-2.51a0.772,0.772,0,0,1,.773-0.772H2.926L2.862,20.079H2.773A0.773,0.773,0,0,1,2,19.307V16.8a0.772,0.772,0,0,1,.773-0.772H2.8L2.65,6.636A6.375,6.375,0,0,1,8.863,0h3.255a6.375,6.375,0,0,1,6.214,6.636l-0.148,9.389h0.044A0.772,0.772,0,0,1,19,16.8v2.51a0.773,0.773,0,0,1-.773.772H18.12l-0.064,4.055h0.172ZM10.4,34.559a10.735,10.735,0,0,0,5.315-1.307l-0.6-4.87a11,11,0,0,1-4.887,1.078,11.175,11.175,0,0,1-4.563-.926l-0.579,4.72A10.737,10.737,0,0,0,10.4,34.559ZM3.932,30.891l1.352-1.738V24.327l-1.352-.772v7.337Zm0-7.916,1.352,0.772V17.955L3.932,14.48v8.5ZM10.4,9.653a12.239,12.239,0,0,0-6.045,1.483L5.017,16.5a12.74,12.74,0,0,1,5.193-1.052,12.538,12.538,0,0,1,5.562,1.224l0.68-5.531A12.236,12.236,0,0,0,10.4,9.653Zm6.665,4.634-1.352,3.668v5.792l1.352-.772V14.287Zm0,9.267-1.352.772v4.827l1.352,1.738V23.555Z",
        anchor:new google.maps.Point(12, 22), // 图片分辨率 28*43
        fillColor:"#4D7CE0",
        fillOpacity:1,
        strokeOpacity:0,
        scale:1.5,
        // rotation:direction
    };
    var polyLine = new google.maps.Polyline({
        path: trackPoints,
        strokeColor: "#FF0000", // 线条颜色
        strokeOpacity: 1.0, // 线条透明度
        strokeWeight: 5, // 线条粗细
        // icons:[{
        //     icon:symbol,
        //     offset:'100%',
        // }],
        map:map,
    });
    // trackPath.setMap(map);
    // animateCircle(polyLine);
}

// 初始化轨迹
function initPos(){
    // 这里显示正在加载的 可以用jbox.loading来显示 可以参考首页的聚合功能
    // ...
    // 这里显示正在加载的 可以用jbox.loading来显示 可以参考首页的聚合功能
    $.ajax({
        url: "../js/posNew.json",
        // data: data,
        dataType: 'json',
        success: function (data) {
            var dataRows = data.rows;
            if(dataRows!=null&&dataRows.length>0){
                $.each(dataRows,function(index,value){
                    var angle = value['angel'];
                    var isGpsError = value['isGpsError'];
                    var lng = value['lon'];
                    var isAccOn = value['isAccOn'];
                    var time = value['time'];
                    var speed = value['speed'];
                    var isHaving = value['isHaving'];
                    var lat = value['lat'];
                    // 1：谷歌 0：百度
                    if(maptype == 0){
                        var point = wgs2bd(lat,lng);
                        lat = point[0];
                        lng = point[1];
                    }else{
                        var point = wgs2gcj(lat,lng);
                        lat = point[0];
                        lng = point[1];
                    }
                    // trackPoints.push(new google.maps.LatLng(lat,lng));
                    trackPoints.push({
                        lat:lat,
                        lng:lng,
                        angle:angle,
                        speed: speed,
                        gpstime: time,
                        isHaving: isHaving,
                    });
                });
            }
            // 刷新历史数据轨迹
            refreshHistory(trackPoints);
            // 初始化地图
            // initMap();
        }
    })
}

// 刷新历史轨迹
function refreshHistory(historys) {
    var showHis = function () {
        try {
            // self.getMap().drawHistoryLine(this.curCar, this.uiHistorys, chkParking); // invoke method（imap.js）显示历史轨迹
            g_Map.drawHistoryLine(historys);
        }
        catch (e) {
            setTimeout(showHis, 2000);
        }
    };
    // 执行调用，显示轨迹
    showHis();
}

// 开始播放
var playInterval = 500;         // 默认500ms播放一次
var playIndex = 0;               // 播放的轨迹索引
var playTimer = null;           // 播放用的定时器
var oldIPos = 0;
function startPlay() {
    stopPlay();   // 先停止播放
    // 如果到结尾了，则调整到起始处
    if (playIndex >= trackPoints.length)
        playIndex = 0;
    // 如果没启动定时器
    if (!playTimer) {
        // 启动定时器    0.5s
        playTimer = setTimeout(callbackPlay, playInterval);  // 间隔有可能变化，所以用timeout
    }
}

// 回调函数
function callbackPlay() {
    // 移动指针
    moveIndex(playIndex++, playInterval / 10);
    // 还没结束，则继续播放
    if (playIndex < trackPoints.length) {
        playTimer = setTimeout(callbackPlay, playInterval);  // 间隔有可能变化，所以用timeout
    }else {
        // 否则清空定时器
        playTimer = null;
    }
}

// 移动回放指针            playInterval / 10移动一次指针
function moveIndex(iPos, timer) {
    // 验证一下位置
    if (iPos < 0 || !trackPoints || iPos >= trackPoints.length)
        return;
    // 更新地图显示
    g_Map.moveTo(iPos, timer);   // 更新地图显示
    if (iPos + 1 == trackPoints.length) {
        var mileage = this.getMileage(trackPoints);
        console.info("总里程数：" + mileage.toFixed(2) + 'km'); // 保留两位小数
    }

    var highstock = function () {
        try {
            if (playTimer) {
                oldIPos = iPos;
            }
        } catch (e) {
            setTimeout(highstock, 500);//如果有异常，0.5秒钟之后重新加载
        }
    };
    highstock();
}

// 计算总里程
function getMileage(historys) {
    var mileage = 0;
    for (var i = 0; i < historys.length - 1; i++) {
        mileage += TUI.Core.getDistance(historys[i].lo, historys[i].la, historys[i + 1].lo, historys[i + 1].la);
    }
    return mileage;
}

// 停止播放
function stopPlay() {
    if (playTimer) {
        //清空定时器
        clearTimeout(this.playTimer);
        playTimer = null;
    }
}

/**
 * 动态加载JS
 * @param {string} url 脚本地址
 * @param {function} callback  回调函数
 */
function dynamicLoadJs(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    if(typeof(callback)=='function'){
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete"){
                callback();
                script.onload = script.onreadystatechange = null;
            }
        };
    }
    head.appendChild(script);
}