var map; // 地图的全局变量
var g_Map;
// var lat = 31.305592; // 纬度
// var lng = 121.504485; // 经度
var direction = 0; // 方向
var markers = []; // marker数组
var prevClickWindow; // 上一个点击的window窗口 打开下一个 就得关闭上一个
// 从参数中提取地图类型，如果没指定，则默认为0
var maptype = TUI.Core.getRequestParam("maptype");
// maptype = 0;
if (maptype == 0) {
    document.writeln('<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=QayQeUy9OawntBa9fHNKKTwL"><\/script>');
    document.writeln('<script type="text/javascript" src="../js/maps/baidu/rectangleZoom.js"><\/script>');
    document.writeln('<script type="text/javascript" src="../js/maps/baidu/distanceTool.js"><\/script>');
    document.writeln('<script type="text/javascript" src="../js/maps/baidu/baiduImpl.js"><\/script>');
    // document.writeln('<script type="text/javascript" src="//api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js"></script>');
    // document.writeln('<script type="text/javascript" src="//api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js"></script>');
    document.writeln('<script type="text/javascript" src="../js/maps/baidu/textIconOverlay.js"></script>');
    // document.writeln('<script type="text/javascript" src="../js/maps/baidu/markerClusterBD.js"></script>');
    document.writeln('<script type="text/javascript" src="../js/maps/baidu/MarkerClusterer_min.js"></script>');
}else{
    document.writeln('<script type="text/javascript" src="http://maps.google.cn/maps/api/js?key=AIzaSyBczwA1o2F5_2JyIc_JEt5ylprGT1Nvpbc&libraries=drawing,geometry,visualization"></script>');
    // document.writeln('<script type="text/javascript" src="http://maps.google.cn/maps/api/js?key=AIzaSyDKCSX1zHDhsduXviOs4XYQFnoXyQk3FHo&libraries=drawing,geometry,visualization"></script>');
    document.writeln('<script type="text/javascript" src="../js/maps/google/labelmarker.js"></script>');
    document.writeln('<script type="text/javascript" src="../js/maps/google/googleImpl.js"></script>');
    document.writeln('<script type="text/javascript" src="../js/maps/google/markerClusterGOO.js"></script>');
}
$(function(){
    // 1:谷歌  0:百度
    if (maptype == 0) {
        g_Map = new TUI.map.BaiduImpl();
    }else{
        g_Map = new TUI.map.GoogleImpl();
    }
    g_Map.createMap();
    map = g_Map._map;
    // initMap();
    setTimeout(function(){
        initPos();
    },500);

    /*var rows = [];
    var data1 = "{\"lng\":121.49790859870787,\"speed\":0.0,\"lastTime\":\"2019-03-05 00:00:00\"," +
        "\"certificateId\":null,\"label\":\"--\",\"startMileage\":0.0,\"angle\":0," +
        "\"id\":79592,\"isOnline\":false,\"carState\":0,\"carNo\":\"沪A32212\",\"personalId\":null," +
        "\"companyId\":3,\"driverName\":\"哈哈哈哈哈\",\"lat\":31.299958840329055}";
    var data2 = "{\"lng\":121.69890859870887,\"speed\":0.0,\"lastTime\":\"2019-03-05 00:00:00\"," +
        "\"certificateId\":null,\"label\":\"--\",\"startMileage\":0.0,\"angle\":0," +
        "\"id\":79593,\"isOnline\":false,\"carState\":0,\"carNo\":\"沪A32212\",\"personalId\":null," +
        "\"companyId\":3,\"driverName\":\"哈哈哈哈哈\",\"lat\":31.299958840329055}";
    var data3 = "{\"lng\":121.89990859870987,\"speed\":0.0,\"lastTime\":\"2019-03-05 00:00:00\"," +
        "\"certificateId\":null,\"label\":\"--\",\"startMileage\":0.0,\"angle\":0," +
        "\"id\":79594,\"isOnline\":false,\"carState\":0,\"carNo\":\"沪A32212\",\"personalId\":null," +
        "\"companyId\":3,\"driverName\":\"哈哈哈哈哈\",\"lat\":31.299958840329055}";
    rows.push($.parseJSON(data1));
    rows.push($.parseJSON(data2));
    rows.push($.parseJSON(data3));
    var trackPoints = [
        g_Map._newLngLat(121.49790859870787,31.299958840329055),
        g_Map._newLngLat(121.49790859870887,31.299958840329055),
        g_Map._newLngLat(121.49790859870987,31.299958840329055),
        g_Map._newLngLat(121.49790859871087,31.299958840329055),
        g_Map._newLngLat(121.49790859871187,31.299958840329055),
        g_Map._newLngLat(121.49790859871287,31.299958840329055),
        g_Map._newLngLat(121.49790859871387,31.299958840329055),
        g_Map._newLngLat(121.49790859871487,31.299958840329055),
        // new google.maps.LatLng(31.299958840329055,121.49790859870787),
        // new google.maps.LatLng(31.399958840329055,121.49790859870787),
        // new google.maps.LatLng(31.299958840329055,121.59790859870787),
        // new google.maps.LatLng(31.599958840329055,121.49790859870787),
        // new google.maps.LatLng(31.299958840329055,121.69790859870787),
        // new google.maps.LatLng(31.799958840329055,121.49790859870787),
        // new google.maps.LatLng(31.299958840329055,121.89790859870787),
        // new google.maps.LatLng(31.999958840329055,121.89790859870787),
    ];
    addBatchMarker(rows);*/
});
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
            var trackPoints = [];
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
                    if (maptype == 0) {
                        var point = wgs2bd(lat, lng);
                        lat = point[0];
                        lng = point[1];
                    } else {
                        var point = wgs2gcj(lat, lng);
                        lat = point[0];
                        lng = point[1];
                    }
                    // trackPoints.push(new google.maps.LatLng(lat,lng));
                // trackPoints.push(g_Map._newLngLat(lng,lat));
                    var da = {
                        lat: lat,
                        lng: lng,
                        angle: angle,
                        speed: speed,
                        gpstime: time,
                        isHaving: isHaving,

                        id: index,
                        lastTime: "2019-08-21 10:02:00",
                        certificateId: null,
                        label: "--",
                        startMileage: 6.6,
                        driverName: "荒天帝石昊",
                        personalId: "12345678901",
                        carState: 32,
                    }
                    trackPoints.push(da);
                });
            }
            // 刷新历史数据轨迹
            addBatchMarker(trackPoints,true);
        }
    })
}
// 初始化地图
function initMap() {
    // The location of Uluru
    var uluru = {lat:31.305592, lng:121.504485};
    // The map, centered at Uluru
    map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 12,
            center: uluru,
            zoomControl: true, // 启用/禁用缩放控件
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER,
            },
            mapTypeControl: false, // 启用/禁用允许用户在地图类型（例如地图和卫星）之间切换的地图类型控件
            scaleControl: false, // 启用/禁用提供简单地图比例的“缩放”控件
            streetViewControl: false, // 启用/禁用Pegman控件
            rotateControl: false, // 启用/禁用旋转控件的外观以控制45°图像的方向
            fullscreenControl: false, // 是否全屏 此控件在移动设备上可见，在桌面上不可见
            gestureHandling: 'greedy', // 属性设置 greedy为触摸屏和移动设备，以允许用户在用户滑动（拖动）屏幕时平移地图（向上或向下，向左或向右）。换句话说，单指滑动和双指滑动都可以使地图平移。
        });
}
var markerCluster = null;
// 批量添加marker 是否聚合
function addBatchMarker(rows,isCluster){
    if(markerCluster != null){
        markerCluster.clearMarkers();
    }
    if(rows.length == 0){
        return;
    }
    for (var i = 0; i < rows.length; i++) {
        // new google.maps.LatLng(31.999958840329055,121.89790859870787)
        // var latLng = new google.maps.LatLng(rows[i].lat,rows[i].lng);
        /*var point;
        // 百度地图转成bd坐标  谷歌地图不用转 是原始的wgs84 谷歌中国地图需要转成gcj02火星坐标系
        if(maptype == 0){
            point = wgs2bd(rows[i].lat,rows[i].lng);
        }else{
            point = wgs2gcj(rows[i].lat,rows[i].lng);
        }
        rows[i].lat = point[0];
        rows[i].lng = point[1];*/
        var latLng = g_Map._newLngLat(rows[i].lng,rows[i].lat);
        // var latLng = data[i];
        // 这里是以后判断车辆状态 改变车辆颜色的代码位置
        // code...code...code...code...code...
        // 这里是以后判断车辆状态 改变车辆颜色的代码位置
        /*var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon:{
                path:"M18.227,24.134a0.772,0.772,0,0,1,.773.772v2.51a0.772,0.772,0,0,1-.773.772H18.034v6.95A3.863,3.863,0,0,1,14.171,39H6.83a3.863,3.863,0,0,1-3.864-3.861v-6.95H2.773A0.772,0.772,0,0,1,2,27.416v-2.51a0.772,0.772,0,0,1,.773-0.772H2.926L2.862,20.079H2.773A0.773,0.773,0,0,1,2,19.307V16.8a0.772,0.772,0,0,1,.773-0.772H2.8L2.65,6.636A6.375,6.375,0,0,1,8.863,0h3.255a6.375,6.375,0,0,1,6.214,6.636l-0.148,9.389h0.044A0.772,0.772,0,0,1,19,16.8v2.51a0.773,0.773,0,0,1-.773.772H18.12l-0.064,4.055h0.172ZM10.4,34.559a10.735,10.735,0,0,0,5.315-1.307l-0.6-4.87a11,11,0,0,1-4.887,1.078,11.175,11.175,0,0,1-4.563-.926l-0.579,4.72A10.737,10.737,0,0,0,10.4,34.559ZM3.932,30.891l1.352-1.738V24.327l-1.352-.772v7.337Zm0-7.916,1.352,0.772V17.955L3.932,14.48v8.5ZM10.4,9.653a12.239,12.239,0,0,0-6.045,1.483L5.017,16.5a12.74,12.74,0,0,1,5.193-1.052,12.538,12.538,0,0,1,5.562,1.224l0.68-5.531A12.236,12.236,0,0,0,10.4,9.653Zm6.665,4.634-1.352,3.668v5.792l1.352-.772V14.287Zm0,9.267-1.352.772v4.827l1.352,1.738V23.555Z",
                anchor:new google.maps.Point(14, 22), // 图片分辨率 28*43
                fillColor:"#4D7CE0",
                fillOpacity:1,
                strokeOpacity:0,
                // scale:0.05,
                rotation:direction
            },
            title: rows[i].carNo,
        });
        markers.push(marker);*/
        var icon;
        if(maptype == 0){
            icon = "../images/carIcon/truck/car.png";
        }else{
            icon = {
                path:"M18.227,24.134a0.772,0.772,0,0,1,.773.772v2.51a0.772,0.772,0,0,1-.773.772H18.034v6.95A3.863,3.863,0,0,1,14.171,39H6.83a3.863,3.863,0,0,1-3.864-3.861v-6.95H2.773A0.772,0.772,0,0,1,2,27.416v-2.51a0.772,0.772,0,0,1,.773-0.772H2.926L2.862,20.079H2.773A0.773,0.773,0,0,1,2,19.307V16.8a0.772,0.772,0,0,1,.773-0.772H2.8L2.65,6.636A6.375,6.375,0,0,1,8.863,0h3.255a6.375,6.375,0,0,1,6.214,6.636l-0.148,9.389h0.044A0.772,0.772,0,0,1,19,16.8v2.51a0.773,0.773,0,0,1-.773.772H18.12l-0.064,4.055h0.172ZM10.4,34.559a10.735,10.735,0,0,0,5.315-1.307l-0.6-4.87a11,11,0,0,1-4.887,1.078,11.175,11.175,0,0,1-4.563-.926l-0.579,4.72A10.737,10.737,0,0,0,10.4,34.559ZM3.932,30.891l1.352-1.738V24.327l-1.352-.772v7.337Zm0-7.916,1.352,0.772V17.955L3.932,14.48v8.5ZM10.4,9.653a12.239,12.239,0,0,0-6.045,1.483L5.017,16.5a12.74,12.74,0,0,1,5.193-1.052,12.538,12.538,0,0,1,5.562,1.224l0.68-5.531A12.236,12.236,0,0,0,10.4,9.653Zm6.665,4.634-1.352,3.668v5.792l1.352-.772V14.287Zm0,9.267-1.352.772v4.827l1.352,1.738V23.555Z",
                anchor:new google.maps.Point(14, 22), // 图片分辨率  28*43
                fillColor:"#4D7CE0",
                fillOpacity:1,
                strokeOpacity:0,
                // rotation:0, // 这里写个0  否则不走path图片定义 会报错url不是String
            };
        }
        var opt = {
            lngLat: latLng, // 位置
            icon: icon, // 图标
            size: {x: 44, y: 20}, // 图标大小
            // label: g_Map.getSimpleCarTip(index,history), //车辆简要信息提示
            offset: {x: 48, y: 6},
            rotation: 0, // 这里写个0  否则不走path图片定义 会报错url不是String
            isNoSetMap: true, // 是否不直接将marker设置到地图上
        };
        var marker = g_Map._newMarker(opt);
        // g_Map._addOverlay(marker);
        markers.push(marker);
    }
    g_Map._map.panTo(g_Map._newLngLat(rows[0].lng,rows[0].lat));
    if(isCluster){
        g_Map.showCluster(markers,"../js/maps/google/img/m");
    }

    for (var i = 0; i < markers.length; i++) {
        addMarker(markers[i],rows[i]);
    }
}
function addMarker(marker,data){
    var pos = {
        lng: data.lng,
        lat: data.lat,
    }
    g_Map._addInfoWindow(marker, data);   // 添加信息窗口
    // g_Map._openInfoWindow(marker, data);
    /*g_Map._bind(marker,'click',function(event){
        console.info("markers"+"---"+marker.position);
        g_Map._openInfoWindow(infowindow,marker);
        map.panTo(marker.position);
    });
    g_Map._bind(infowindow,'click',function(event){
        if(typeof prevClickWindow != 'undefined' && prevClickWindow != infowindow){
            prevClickWindow.close();
        }
        prevClickWindow = infowindow;
    });*/
    // g_Map._openInfoWindow(marker, data, pos);

    /**
     * "{\"lon\":121.49790859870787,\"speed\":0.0,\"lastTime\":\"2019-03-05 00:00:00\"," +
        "\"certificateId\":null,\"label\":\"--\",\"startMileage\":0.0,\"angle\":0," +
        "\"id\":79592,\"isOnline\":false,\"carState\":0,\"carNo\":\"沪A32212\",\"personalId\":null," +
        "\"companyId\":3,\"driverName\":null,\"lat\":31.299958840329055}"
     * @type {string}
     */
    /*var id = data.id;
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
        "<div class=\"popothermess\"><span>地址：</span><span><a id=\"pos"+id+"\" href=\"javascript:clickToQuery('"+id+"','"+data.lat+","+data.lng+"')\">点击查询地址</a></span></div></div>" +
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

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
    });
    google.maps.event.addListener(marker, 'click', function(event) {
        console.info("markers"+"---"+marker.position);
        infowindow.open(map,marker);
        map.panTo(marker.position);
    });
    google.maps.event.addListener(infowindow,"domready",function(){
        if(typeof prevClickWindow != 'undefined' && prevClickWindow != infowindow){
            prevClickWindow.close();
        }
        prevClickWindow = infowindow;
    });*/
}
// 点名
function rollCall(carNo,deviceNo){
    alert("carNo---"+carNo+"---deviceNo---"+deviceNo);
    /*$.ajax({
        url: "rollCall.action",
        dataType: 'json',
        data:{
            carNo:carNo,
            deviceNo:deviceNo,
        },
        success:function(resp){
        },
        error:function(resp){
        }
    });*/
}
// 跟踪
// 变频
function frequencyConversion(carNo,deviceNo,interval,lastInterval){
}
// 轨迹
// 报文
// 报文审批
// 事件
// 点击查询
var clickToQuery=function(id,pos){

    g_Map.resolveAddress(g_Map._newLngLat(pos.split(",")[1],pos.split(",")[0]));
    /*queryPosition(id,pos,function(area){
        $("#pos"+id).html(area);
        $("#pos"+id).attr("style","pointer-events:none");
        $("#area"+id).html(area);
        $("#area"+id).attr("style","pointer-events:none");
    });*/
}
function queryPosition(id, dz, callBack) {
    $.ajax({
        url : 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + dz + '&key=AIzaSyBczwA1o2F5_2JyIc_JEt5ylprGT1Nvpbc',
//		url : 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + dz + '&key=AIzaSyBczwA1o2F5_2JyIc_JEt5ylprGT1Nvpbc&language=tr',
        type : "POST",
        dataType : "json",
        success : function(res) {
            if (res.results.length > 0) {
                var area = res.results[0].formatted_address;
                callBack(area);
            } else {
                callBack("request is error");
            }
        },
        error : function(res) {
            console.info("request is error");
            callBack("request is error");
        }
    });
}