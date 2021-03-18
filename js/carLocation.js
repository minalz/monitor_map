Date.prototype.Format = function(fmt) { //author: meizz 
    var o = {
        "M+" : this.getMonth() + 1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth() + 3) / 3), //季度
        "S" : this.getMilliseconds()
        //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for ( var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
                : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
var carNo = "";
var cycleInterval;
var g_Map;
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
var icon;
$(function(){
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
    // 1:谷歌  0:百度
    if (maptype == 0) {
        g_Map = new TUI.map.BaiduImpl();
    }else{
        g_Map = new TUI.map.GoogleImpl();
    }
    g_Map.createMap();
    // map = g_Map._map;
    // initMap();
	getCurrentCar(carNo);
    // var interval = setInterval(cycle30,5000);
    cycleInterval=setInterval(getCurrentCar,1000)

    // addMarker();
    // interval.clearInterval();
});

var map;
var infowindow;
var uluru;
var marker;
function initMap() {
    // The location of Uluru
    uluru = {lat:lat, lng:lng};
    var contentString = "<div>\n" +
        "        <div><span><b>车牌:</b></span><span>沪A123456</span></div>\n" +
        "        <div><span><b>里程:</b></span><span>555KM</span></div>\n" +
        "        <div><span><b>方向:</b></span><span>北偏东56°</span></div>\n" +
        "        <div><span><b>速度:</b></span><span>28KM/h</span></div>\n" +
        "        <div><span><b>车辆类型:</b></span><span>凯旋</span></div>\n" +
        "        <div><span><b>最后位置汇报时间:</b></span></div>\n" +
        "        <div><span>2019-01-15 12:00:23</span></div>\n" +
        "    </div>";

    infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    // The map, centered at Uluru
    map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 12,
            center: uluru,
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
}

function addMarker(){
    var opt = {
        lngLat: g_Map._newLngLat(lng,lat), // 位置
        icon: icon, // 图标
        size: {x: 44, y: 20}, // 图标大小
        // label: g_Map.getSimpleCarTip(index,history), //车辆简要信息提示
        offset: {x: 48, y: 6},
        rotation: 0, // 这里写个0  否则不走path图片定义 会报错url不是String
    };
    if (marker == null) {
        marker = g_Map._newMarker(opt);
        g_Map._addOverlay(marker);
    }else{
        lng = lng + 0.1;
        lat = lat;
        g_Map._refreshMarker(marker, opt);
    }
    // var lng1 = marker.getMarker().position.lng();
    // var lat1 = marker.getMarker().position.lat();
    var zoom = g_Map.getZoom();
    g_Map.setCenter(lng,lat,zoom);
    // 121.50006358448357,31.307592326609413
    // 121.49790859870787,31.299958840329055
    /*uluru = {lat:31.299958840329055, lng:121.49790859870787};
    // getCurrentCar(carNo);
    marker = new google.maps.Marker({
        position: uluru,
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
        title: 'Car location',
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
    g_Map._map.panTo(uluru);*/
}
// 每次点击时 清除上一次的30秒刷新 然后重新计时
var lat = 31.305592; // 纬度
var lng = 121.504485; // 经度
var direction = 0; // 方向
var trackPoints = []; // 轨迹点存放的地方
function getCurrentCar(carNo){
    if(typeof cycleInterval != 'undefined'){
        clearInterval(cycleInterval);
    }
    direction = 50;
    /*trackPoints = [
        new google.maps.LatLng(31.299958840329055,121.49790859870787),
        new google.maps.LatLng(31.399958840329055,121.49790859870787),
        new google.maps.LatLng(31.299958840329055,121.59790859870787),
        new google.maps.LatLng(31.599958840329055,121.49790859870787),
        new google.maps.LatLng(31.299958840329055,121.69790859870787),
        new google.maps.LatLng(31.799958840329055,121.49790859870787),
        new google.maps.LatLng(31.299958840329055,121.89790859870787),
        new google.maps.LatLng(31.999958840329055,121.89790859870787),
    ];*/
    trackPoints.push({
        lng: lng,
        lat: lat,
    })
    addMarker();
    drawPos();
    // $.ajax({
    //     url: "../js/pos.json",
    //     // data: data,
    //     dataType: 'json',
    //     // data:{carNo:carNo},
    //     success:function(resp){
    //         var car = resp.data.car;
    //         if(car!=null){
    //             lat = data.lat;
    //             lng = data.lon;
    //             direction = data.angle;
    //             // trackPoints.push(new google.maps.LatLng(lat,lng));
    //         }
    //         addMarker();
    //         drawPos();
    //     },
    //     error:function(resp){
    //         console.info("get current car is error!");
    //         carNo="";
    //     }
    // });
    if(typeof cycleInterval != 'undefined'){
        cycleInterval=setInterval(getCurrentCar,1000);
    }
}
function changeData(){
}
//loadhistory数据
function loadHistoryData(){
    var companyId=Ext.getCmp("companyCombo").getValue();
    var carNo=$("#carNo").val();
//	var carId=$("#carId").val();
//	var onLineStatus=$("#onLineStatus").val();
    var taxStatus=$("#taxStatus").val();
    $.ajax({
        url:'showSpCar.action',
        data:{
            companyId:companyId,
            carNo:carNo,
//		   		carId:carId,
//		   		onLineStatus:onLineStatus,
            taxStatus:taxStatus,
            isExport:"0",
            start:$dm.getStartOnPage(),
            limit:$dm.getItemsOnPage()
        },
        type:"POST",
        dataType:"json",
        success:showList
    });
}

//显示查询
function showList(rs){
    var datas=rs.rows;
    var count=rs.totalCount;
    var string = "";
    $("#tableGrid2").html("");
    if(count>0){
        $.each(datas, function (index, val){
            string +='<tr class="dataListTr">';
            string +='<td >'+val['carNo']+'</td>';
            string +='<td >'+val['speed']+'</td>';
            string +='</tr>';
        });
        $("#tableGrid2").append(string);
        $("#tableGrid2").show();
    }else{
        count=0;
    }
    $dm.initPage("simplePaging2",count,loadHistoryData);
    $(".dataListTr").unbind('click').on('click',function(){
        var carNo = $(this).find("td:first").text();
        getCurrentCar(carNo);
    });
}

/**
 * 轨迹绘画
 */
var trackPath;
function drawPos() {
    g_Map.drawPos(trackPoints,false);
    // 每次重新画轨迹的时候 都需要清空已经画出来的轨迹
    /*if(typeof trackPath != 'undefined' && trackPath != null){
        trackPath.setMap(null);
    }
    trackPath = new google.maps.Polyline({
        path: trackPoints,
        strokeColor: "#FF0000", // 线条颜色
        strokeOpacity: 1.0, // 线条透明度
        strokeWeight: 5 // 线条粗细
    });
    trackPath.setMap(map);*/
}