// 根据提交的URL参数动态决定需要的JS文件
//<![CDATA[
var lang = TUI.Core.getRequestParam("lang");

if (lang == null)
    lang = "cn";
try {
    var loginUrl = unescape(parent.parent.TUI.Core.getRequestParam("loginUrl"));
    if (loginUrl.indexOf("chexiaomi") > -1) {
        document.writeln('<script type="text/javascript" src="../chexiaomi/js/' + lang + '.js?v=6.0.0"><\/script>');
    } else {
        document.writeln('<script type="text/javascript" src="../js/lang/' + lang + '.js?v=6.0.0"><\/script>');
    }
} catch (e) {
    document.writeln('<script type="text/javascript" src="../js/lang/' + lang + '.js?v=6.0.0"><\/script>');
}

// 如果是中文，需要引入EXT中文组件
if (typeof Ext != "undefined" && lang == 'cn') {
    document.writeln('<script type="text/javascript" src="../ext-3.4.0/locale/ext-lang-cn-min.js"><\/script>');
} else if (typeof Ext != "undefined" && lang == "tw") {
    document.writeln('<script type="text/javascript" src="../ext-3.4.0/locale/ext-lang-zh_TW-min.js"><\/script>');
}
//]]>
