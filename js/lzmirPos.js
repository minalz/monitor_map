var startTime = "";
var endTime = "";
var carNo = "";
// 从参数中提取地图类型，如果没指定，则默认为0
var maptype = TUI.Core.getRequestParam("maptype");
if (maptype == 0) {
    document.writeln('<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=QayQeUy9OawntBa9fHNKKTwL"><\/script>');
    document.writeln('<script type="text/javascript" src="../js/maps/baidu/rectangleZoom.js"><\/script>');
    document.writeln('<script type="text/javascript" src="../js/maps/baidu/distanceTool.js"><\/script>');
    document.writeln('<script type="text/javascript" src="../js/maps/baidu/baiduImpl.js"><\/script>');
    // document.writeln('<script type="text/javascript" src="//api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js"></script>');
    // document.writeln('<script type="text/javascript" src="//api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js"></script>');
    document.writeln('<script type="text/javascript" src="../js/maps/baidu/textIconOverlay.js"></script>');
    document.writeln('<script type="text/javascript" src="../js/maps/baidu/markerClusterBD.js"></script>');
}else{
    document.writeln('<script type="text/javascript" src="http://maps.google.cn/maps/api/js?key=AIzaSyBczwA1o2F5_2JyIc_JEt5ylprGT1Nvpbc&libraries=drawing,geometry,visualization"></script>');
    // document.writeln('<script type="text/javascript" src="http://maps.google.cn/maps/api/js?key=AIzaSyDKCSX1zHDhsduXviOs4XYQFnoXyQk3FHo&libraries=drawing,geometry,visualization"></script>');
    document.writeln('<script type="text/javascript" src="../js/maps/google/labelmarker.js"></script>');
    document.writeln('<script type="text/javascript" src="../js/maps/google/googleImpl.js"></script>');
    document.writeln('<script type="text/javascript" src="../js/maps/google/markerClusterGOO.js"></script>');
}
$(function(){
    // initMap();
    // 1:谷歌  0:百度
    if (maptype == 0) {
        g_Map = new TUI.map.BaiduImpl();
    }else{
        g_Map = new TUI.map.GoogleImpl();
    }
    g_Map.createMap();
    initPos();
});

var trackPoints = [];
function initPos(){
    $.ajax({
        url: "../js/pos.json",
        // data: data,
        dataType: 'json',
        success: function (data) {
            var dataRows = data.rows;
            if(dataRows!=null&&dataRows.length>0){
                $.each(dataRows,function(index,value){
                    var lat = value['lat'];
                    var lng = value['lng'];
                    console.info("转换前 -- lat:"+lat+"---lng:"+lng);
                    // 1：谷歌 0：百度
                    if (maptype == 0) {
                        var point = wgs2bd(lat, lng);
                        lat = point[0];
                        lng = point[1];
                    } else {
                        var point = wgs2gcj(lat, lng);
                        lat = point[0];
                        lng = point[1];
                    }
                    trackPoints.push({
                        lat:lat,
                        lng:lng,
                        // angle:0,
                        // speed: 0,
                        // gpstime: "2019-08-21 16:20:00",
                        // isHaving: 0,
                    });
                    console.info("转换后 -- lat:"+lat+"---lng:"+lng);
                    // trackPoints.push(new google.maps.LatLng(lat,lng));
                });
            }
            console.info("trackPoints:"+trackPoints);
            g_Map.drawPos(trackPoints,true);
            // initMap();
        }
    })
}

// var trackPoints = [];
function initMap() {
    var myOptions = {
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
    };
    var map = new google.maps.Map(
        document.getElementById("map"),
        myOptions
    );
    // 这里填上轨迹的经纬坐标，或者ajax从后台读取
    // 坐标做好是在路口的，不然画线不在路上。
    /*var trackPoints = [
        new google.maps.LatLng(39.956662,116.275735),
        new google.maps.LatLng(39.957221,116.284447),
        new google.maps.LatLng(39.95834,116.29406),
        new google.maps.LatLng(39.959326,116.29951),
        new google.maps.LatLng(39.960083,116.303029),
        new google.maps.LatLng(39.96209,116.307793),
        new google.maps.LatLng(39.96209,116.307793),
        new google.maps.LatLng(39.96209,116.307793),
        new google.maps.LatLng(39.96209,116.307793),
        new google.maps.LatLng(39.96209,116.307793),
        new google.maps.LatLng(39.96209,116.307793),
        new google.maps.LatLng(39.96209,116.3077931),
        new google.maps.LatLng(39.96209,116.3077932),
        new google.maps.LatLng(39.96209,116.3077933),
        new google.maps.LatLng(39.96209,116.3077934),
        new google.maps.LatLng(39.96209,116.3077935),
        new google.maps.LatLng(39.96209,116.3077936),
        new google.maps.LatLng(39.96209,116.3077937),
        new google.maps.LatLng(39.96209,116.3077938),
        new google.maps.LatLng(39.96209,116.3077939),
        new google.maps.LatLng(39.96209,116.30779310),
        new google.maps.LatLng(39.96209,116.30779311),
        new google.maps.LatLng(39.96209,116.30779312),
        new google.maps.LatLng(39.96209,116.30779313),
        new google.maps.LatLng(39.96209,116.30779314),
        new google.maps.LatLng(39.96209,116.30779315),
        new google.maps.LatLng(39.96209,116.30779316),
        new google.maps.LatLng(39.96209,116.30779317),
        new google.maps.LatLng(39.96209,116.30779318),
        new google.maps.LatLng(39.96209,116.30779319),
        new google.maps.LatLng(39.96209,116.30779320),
        new google.maps.LatLng(39.96209,116.30779321),
        new google.maps.LatLng(39.96209,116.30779322),
        new google.maps.LatLng(39.96209,116.30779323),
        new google.maps.LatLng(39.964556,116.2748341),
        new google.maps.LatLng(39.964556,116.2748342),
        new google.maps.LatLng(39.964556,116.2748343),
        new google.maps.LatLng(39.964556,116.2748344),
        new google.maps.LatLng(39.964556,116.2748345),
        new google.maps.LatLng(39.964556,116.2748346),
        new google.maps.LatLng(39.964556,116.2748347),
    ];*/
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

    var trackPath = new google.maps.Polyline({
        path: trackPoints,
        strokeColor: "#FF0000", // 线条颜色
        strokeOpacity: 1.0, // 线条透明度
        strokeWeight: 5 // 线条粗细
    });

    trackPath.setMap(map);
}