$(function(){
    // 1:谷歌  2:百度
    if (maptype == 2) {
        g_Map = new TUI.map.BaiduImpl();
    }else{
        g_Map = new TUI.map.GoogleImpl();
    }
    g_Map.createMap();
});