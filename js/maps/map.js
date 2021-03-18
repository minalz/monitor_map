// 定义全局变量
var g_Map = null; // 地图对象
var mapfull = false; // 缺省不全景地图
document.getElementById("noPanoramaTip").innerHTML = lg.noPanorama;//街景不存在的提示信息
document.getElementById("noPanoramaTip").style.height = lang == "en" ? "60px" : "42px";
var a  = TUI.Dom.$("panoHolder");
setInterval(function(){
    if(navigator.userAgent.indexOf("Firefox")>0)
        a.style.position="absolute";
},1000);

// 全屏属性保存在主框架中
//在iframe页面通过parent可以获得主页面的window，接着就可以正常访问父页面的元素了
if (parent && parent.parent && parent.parent.g_Main) {
    mapfull = parent && parent.parent && parent.parent.g_Main.mapFull;
}
// 从参数中提取地图类型，如果没指定，则默认为0
var maptype = TUI.Core.getRequestParam("maptype");
if (maptype == null)
    maptype = lang == 'cn' ? 0 : 2; // 没有选择时，中文默认用百度地图，英文默认用谷歌地图

// 加载地图基类
document
    .writeln('<script type="text/javascript" src="../js/maps/imap.js?v=6.0.3"><\/script>');
document
    .writeln('<script type="text/javascript" src="http://map.qq.com/api/js?v=2.exp&libraries=convertor&key=P7XBZ-QVQH3-SCH3F-3NHPB-XYYY3-NXFBS"><\/script>');

// 如果是百度地图
if (maptype == 0 || maptype == 1) {

    document
        .writeln('<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=QayQeUy9OawntBa9fHNKKTwL"><\/script>');
    document
        .writeln('<script type="text/javascript" src="../js/maps/baidu/rectangleZoom.js"><\/script>');
    document
        .writeln('<script type="text/javascript" src="../js/maps/baidu/distanceTool.js"><\/script>');
    /*document
     .writeln('<link href="http://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.css" rel="stylesheet" type="text/css" />');

     document
     .writeln('<script type="text/javascript" src="http://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.js"></script>');*/
    document
        .writeln('<script type="text/javascript" src="../js/maps/baidu/baiduImpl.js?v=6.0.1"><\/script>');

}

// 如果是谷歌地图
else if (maptype == 2 || maptype == 3) {
    document.writeln('<script type="text/javascript" src="http://ditu.google.cn/maps/api/js?language=zh-cn&libraries=drawing&key=AIzaSyAX74XP98SZMebTTfC9iiIhFmcNb8dHdyE"><\/script>');
    /*if (lang == 'cn')
        document.writeln('<script type="text/javascript" src="http://ditu.google.cn/maps/api/js?sensor=false"><\/script>');
    else if (lang == "tw") {
        document.writeln('<script type="text/javascript" src="https://maps.google.com/maps/api/js?sensor=false&language=zh-TW"><\/script>');
    } else if (lang == "vn") {
        document.writeln('<script type="text/javascript" src="https://maps.google.com/maps/api/js?sensor=false&language=vi"><\/script>');
    } else
    document.writeln('<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false&language=en"><\/script>');*/
    document
        .writeln('<script type="text/javascript" src="../js/maps/google/labelmarker.js?v=6.0.0"><\/script>');
    document
        .writeln('<script type="text/javascript" src="../js/maps/google/googleImpl.js?v=6.0.2"><\/script>');
}
// 如果是高德地图
else if (maptype == 4) {
    document
        .writeln('<script language="javascript" src="http://app.mapabc.com/apis?t=javascriptmap&v=3&key=b0a7db0b3a30f944a21c3682064dc70ef5b738b062f6479a5eca39725798b1ee300bd8d5de3a4ae3"></script>');
    document
        .writeln('<script type="text/javascript" src="../js/maps/mapabc/mapabcImpl.js?v=6.0.1"><\/script>');
}
// 如果是腾讯地图
else if (maptype == 5 || maptype == 6) {
    document
        .writeln('<script type="text/javascript" src="http://map.qq.com/api/js?v=2.exp&libraries=geometry&key=P7XBZ-QVQH3-SCH3F-3NHPB-XYYY3-NXFBS"><\/script>');

    document
        .writeln('<script type="text/javascript" src="../js/maps/tencent/marker.js?v=6.0.0"><\/script>');
    document
        .writeln('<script type="text/javascript" src="../js/maps/tencent/tencentImpl.js?v=6.0.1"><\/script>');

}

// 待所有JS加载完毕后，生成地图对象
window.onload = function () {

    // 如果是百度地图
    if (maptype == 0 || maptype == 1) {
        g_Map = new TUI.map.BaiduImpl();
    }
    // 如果是谷歌地图
    else if (maptype == 2 || maptype == 3) {
        g_Map = new TUI.map.GoogleImpl();
    }
    // 如果是高德地图
    else if (maptype == 4) {
        g_Map = new TUI.map.MapabcImpl();
    }
    // 如果是腾讯地图
    else if (maptype == 5 || maptype == 6) {
        g_Map = new TUI.map.TencentImpl();
    }


    // 创建地图,有时候没加载完可能会抛异常，要捕捉住重试一次
    try {
        g_Map.createMap();

        // 当地图重新加载时，通知一下父窗体
        try {
            parent.onMapLoaded();
        } catch (e) {
            alert(e);
        }
    }

    catch (e) {
        var ret = window.confirm(lg.maploadfail);
        // 如果是，则切换地图
        if (ret) {
            var new_map_type = 0;
            if (maptype == 0 || maptype == 1)
                new_map_type = 2;
            else if (maptype == 2 || maptype == 3)
                new_map_type = 4;
            else if (maptype == 4)
                new_map_type = 5;
            else
                new_map_type = 0;
            // 切换地图
            window.location = "map.html?maptype=" + new_map_type + "&lang="
                + lang;
        }
    }
}
