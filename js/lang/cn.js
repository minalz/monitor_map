var lg = {
    // 登陆相关
    USER_EMPTY: '请注意：用户名不能为空!',
    PSW_EMPTY: '请注意：密码不能为空!',
    LOGIN_CARNO: '防盗器编号/车牌号:',
    LOGINING: "登录中...",
    LOGIN: "登   录",
    userExperience: "个人体验",
    teamExperience: "车队体验",
    LOGIN_TEAMNAME: '车队编号:',
    LOGIN_USERNAME: '用户名:',
    // 状态字段
    statusarray: ["已设防", "未设防", "休眠", "断电", "运动", "ACC开", "车门开", "油门断", "电门断", "电机锁", "胶带已连接", "胶带未连接", "门磁开", "馈电休眠"],
    // 报警字段
    alarmarray: ["电量不足", "车辆被移动", "SOS报警", "车门打开报警", "主电池被断开", "震动报警",
        "失窃报警", "偏离路线", "进入区域", "离开区域", "停车超时", "超速报警", "ACC异常接通", "进入点",
        "离开点", "进入线", "离开线", "进入区域", "离开区域", "胶带接触异常", "胶带损毁", "状态告警", "离线超时", "拆除告警", "设备离线", "非法开门"],
    // 东南西北
    directarray: ["东", "南", "西", "北"],
    // 方向字段
    directionarray: ["正北", "东北", "正东", "东南", "正南", "西南", "正西", "西北"],
    // 定位方式
    pointedarray: ["未定位", "卫星定位", "小区定位","WIFI定位","北斗定位","LORA定位"],
    // car.js
    righttip: "更多功能请右键",
    offline: "离线",
    move: "运动",
    stop: "静止",
    servicestop: "已停机",
    servicenormal: "正常",
    overserivce: "已过期",
    leftday: "剩余{0}天",
    // 主界面
    prompt: "提示",
    help: "帮助",
    exit: "退出",
    revisePwd: "修改密码",
    exitConfirm: "您确定要退出吗",
    serviceend: "服务截止日期",
    servicecount: "您有[{0}]辆车服务到期或即将到期",
    contactus: "请联系您的销售商!",
    contactusEmpty: "未查询到经销商的信息！",
    //帮助--经销商信息
    teamInfo: '经销商信息',
    teamAddress: '经销商地址',
    teamLinkman: '联系人',
    teamTel: '联系电话',
    teamName: '车队名称',

    firstpage: "首页",
    lastpage: "上一页",
    allastpage: "已经是最后一页",
    alfirstpage: "已经是第一页",
    nothispage: "此页不存在",
    pagelabel: "页码",
    nextpage: "下一页",
    endpage: "尾页",
    totalpage: "共{0}页",
    totalrecord: "共{0}条记录",
    logintimeout: "您已经登陆超时，是否立即返回登陆界面",
    // TAB属性页
    monitor: "综合监控",
    history: "历史轨迹",
    remotecmd: "远程指令",
    caralarm: "车辆告警",
    overservice: "服务过期",
    datastat: "数据统计",
    // 车辆树
    carlist: '车辆列表 (更多功能请右键)',
    keyword: "关键字",
    emptyTeam: "该车队为空",
    keywordtip: "请输入关键字",
    showline: "显示轨迹",
    lockwindow: "锁定监控",
    carinfo: "车辆信息",
    sendcmd: "下发指令",
    lockunlock: "设防撤防",
    morecmd: "更多指令",
    mileage: '里程',
    speed: '速度',

    statpreview: "统计总览",
    statmileage: "里程统计",
    statspeed: "超速统计",
    statalarm: "报警统计",
    statoffline: "离线统计",
    instpos: "立即定位",
    possuccess: "定位成功",
    posfail: "定位失败,原因:",
    lockcmd: "设防",
    locksuccess: "设防成功",
    lockfail: "设防失败,原因:",
    unlockcmd: "撤防",
    unlocksuccess: "撤防成功",
    unlockfail: "撤防失败,原因:",
    batcmd: "批量指令",
    onlycurcars: "仅本车队车辆",
    allcars: "下属所有车辆",
    userinfo: "用户信息",
    drop: '水滴',
    motorcycle: '摩托车',
    car: '汽车',
    truck: '货车',
    police: '警车',
    excavator: "推土机",
    bulldozer: "挖掘机",
    owner: '车主',
    ownerphone: '车主电话',
    cartype: '车辆类型',
    carbrand: '车辆品牌',
    carcolor: '车辆颜色',
    jointime: '注册时间',
    unit: '单位',
    carmarker: '车辆图标',
    installPlace: '安装地点',
    installMan: '安装人员',
    businessPerson: '销售人员',
    onlinePoint: '入网日期',
    deadline: '到期日期',
    sim: 'SIM卡号',
    machineno: "设备编号",
    remarks: '备注',
    bindowner: "绑定车主",
    wrongphone: "错误的车主号码!",
    bindok: "绑定成功",
    bindfail: "绑定失败,原因:",
    ownerName: '车主姓名',
    wrongEmail: '电子邮件格式不正确',
    fax: '传真',
    ownerCop: '车主公司',
    buyTime: '购车时间',
    specialDemand: '特殊要求',
    save: "保存",
    saveok: "保存成功!",
    // 监控列表
    monitorlist: "监控列表",
    stopcar: "停车",
    carno: "车牌号",
    carnoTooLong: "车牌号不能超过20",
    gpstime: "GPS时间",
    pointed: "定位方式",
    direction: "方向",
    speed: "速度",
    status: "车辆状态",
    alarm: "报警信息",
    lo: "经度",
    la: "纬度",
    stoptime: "停车时长",
    rotateSpeed:"转速",
    address: "地址",
    searching: "正在查找...",
    GPSTimeQuantum: "GPS时间区间",
    noAlarm: "无报警",
    detailAlarm: "详细报警信息",
    clickSee: "点击查看",
    y: "年",
    M: "月",
    d: "天",
    h: "时",
    m: "分",
    s: "秒",
    electric: '设备电量',
    gpsSignal: 'GPS信号',
    gsmSignal: 'GSM信号',
    voltageSignal: '车小秘电压',
    //地图相关
    maptools: '地图工具',
    zoomin: '放大',
    zoomout: '缩小',
    countdown: "秒后刷新位置",
    trafficCondition: "交通状况",
    pan: '移动',
    selectregion: '选择区域',
    ruler: '测距',
    clean: '清除',
    fullextent: '全国',
    maploc: '地图经纬度定位',
    baidumap: "百度地图",
    baidusatellite: "百度卫星",
    googlemap: "谷歌地图",
    googlesatellite: "谷歌卫星",
    mapabcmap: "高德地图",
    tencentmap: "腾讯地图",
    tencentsatellite: "腾讯卫星",
    fullscreen: "全屏",
    chooseCar: "请在左侧列表勾选车辆",
    singleCar: "单次只支持一辆车的实时街景，请在车辆树中选择一辆车",
    showPanorama: "显示街景",
    hidePanorama: "隐藏街景",
    noPanorama: '对不起，此地暂不支持街景模式,请访问<a href="http://map.qq.com" target="_blank">http://map.qq.com</a>查看',
    maploadfail: "对不起，当前地图加载失败,是否切换到其它地图?",
    range: "单击左键继续，单击右键结束测距",
    panorama: "街景",
    operatingtips: "单击左键继续，单击右键结束绘制",
    exitPanorama: "退出街景",
    // 历史轨迹页面
    tracktotal: "轨迹总数",
    trackpos: "位置",
    time: "时间",
    startTime: "开始时间",
    endTime: "结束时间",
    queryFirst: "请先查询轨迹",
    trackDownload: "轨迹下载",
    playSpeedLine: "点击开始回放查看速度曲线",
    playOver: "轨迹回放结束",
    totalmileage: "总里程",
    smallEnd: "结束时间必须大于起始时间!",
    bigInterval: "时间间隔不能超过10天!",
    trackreport: "轨迹报表",
    stopreport: "停车报表",
    alarmreport: "报警报表",
    accreport: "ACC报表",
    replaystep: "回放进度",
    replayspeed: "回放速度",
    speedvalue: "速度值",
    startplay: "开始回放",
    stopplay: "停止回放",
    showcellid: "显示小区定位",
    showParking: "显示停车点",
    carlistchoose: "请在车辆列表选择",
    start: '开始',
    end: "结束",
    query: "查询",
    more: "更多",
    hide: "隐藏",
    mnonotempty: "设备编号不能为空",
    trackisempty: "该时段内轨迹为空",
    no: "序号",
    accontime: "acc开启时间",
    setCommand: "设置指令",
    // 远程指令相关
    cmdlog: "指令日志",
    content: "内容",
    descar: "目标车辆",
    ctrltip: "按住键盘shift或ctrl可以多选",
    chooseall: "全选",
    reversechoose: "反选",
    clean: "清空",
    queryparam: "查询参数",
    paramhelp: "参数说明",
    paramname: "参数名",
    paramvalue: "参数值",
    paramnametip: "请选择参数名",
    send: "发送",

    descartip: "请在车辆列表中选择目标车辆!",
    setparam: "设置参数",
    paramvaluetip: "请输入参数值",
    remotectrl: "远程控制",
    remotesf: "远程设防",
    remotecf: "远程撤防",
    remotedy: "远程断油",
    remoteky: "远程开油",
    remotecq: "远程重启",
    remotedw: "单次定位",
    remotesms: "远程短信",
    unknowcmd: "未知指令",
    cmdoktip: "发送指令{0}到[{1}]成功,正在等待终端应答",
    cmdfailtip: "发送指令{0}到[{1}]失败,错误原因:{2}",
    //数据统计图表
    xAxis: "里程（km）、次数或' + '时长（单位：小时）",
    chart: "图表",
    speedLine: "速度曲线",
    location: "位置",
    statistic: "数据统计",
    toomanycars: "对不起，图表中最多只能显示10辆车,将为您显示前10辆车",
    previousPage: "上一页",
    nextPage: "下一页",
    goTo: "GO",
    page: "页",
    //查询余额
    tooltip3: "点击下方车牌号可隐藏曲线",
    tooltip4: "为保证效果最多同时显示5条曲线",
    queryFee: '查询余额',
    feeFail: '余额查询失败,原因:',
    fee: '您的终端SIM卡余额为:{0}元。',
    /***********************************recently added***************************/
    newPassword: "请输入终端密码，密码只能为6位数字",
    setPwd: "设置密码",
    phoneNo: "请输入终端内SIM卡号码",
    setPhoneNo: "设置号码",
    userNo: "请输入车主手机号码",
    inputSpeed: "请输入超速报警值，范围在0~300间",
    setSpeed: "设置速度",
    queryPwd: "密码",
    querySIMNO: "终端SIM卡号码",
    queryPhoneNO: "车主手机号码",
    querySpeed: "报警限速值",
    queryFreq: "上报频率",
    queryTrace: "是否开启追踪",
    queryRadius: "报警判定范围",
    queryVIB: "振动短信报警",
    queryVIBL: "振动灵敏度",
    queryVIBCALL: "振动电话报警",
    queryVIBGPS: "GPS过滤漂移功能",
    querySLEEP: "休眠功能",
    queryPOF: "断电报警",
    queryGPS: "查询GPS",
    queryVBAT: "查询电压",
    inputParam: "输入参数",
    inputFreq: "请输入开启追踪后的上报频率，单位是秒",
    setFreq: "设置频率",
    open: "开启",
    close: "关闭",
    setTrack: "设置追踪功能",
    inputRadius: "请输入非法移位报警判定范围，单位是米",
    setRadius: "设置范围",
    setVib: "设置短信报警",
    inputVibl: "请输入震动灵敏度，0~15间，太高可能误报",
    setVibl: "设置灵敏度",
    invalidValue: "输入值不合法",
    setVibcall: "设置电话报警",
    setVibgps: "设置过滤漂移",
    setSleep: "设置休眠功能",
    setPof: "设置断电报警",
    openPof: "请选择是否开启断电报警",
    chooseOp: "选择指令",
    openTrack: "请选择是否开启追踪",
    openVib: "请选择是否开启震动短信报警",
    openVibgps: "请选择是否开启GPS过滤漂移功能",
    openSleep: "请选择是否开启休眠功能",
    openVibcall: "请选择是否开启震动电话报警",
    queryCommand: "查询参数,鼠标悬浮按钮上查看相关指令的详细提示,查询结果见指令日志栏",
    queryHelp: "查询帮助",
    pswTIP: "查询终端密码和用户登录的密码",
    phoneTIP: "查询终端内置SIM卡号码",
    userTIP: "查询车主手机号码",
    speedTIP: "查询超速报警值，单位是km/h，超过就会报警",
    freqTIP: "查询开启追踪后的上报频率,单位是秒",
    traceTIP: "查询是否开启追踪,1是开启追踪,0是关闭追踪",
    radiusTIP: "查询非法移位报警判定范围,单位是米",
    vibTIP: "查询是否开启振动短信报警,1为开启0为关闭",
    viblTIP: "查询振动灵敏度0~15,0为最高灵敏度,太高可能会误报,15为最低灵敏度",
    vibcallTIP: "查询是否开启振动电话报警,1为开启0为关闭",
    vibgpsTIP: "查询是否开启GPS过滤漂移功能,1为开启0为关闭,如果开启则防盗器在5分钟内没有发生振动,则进入静止状态,过滤所有GPS漂移点",
    sleepTIP: "查询是否开启休眠功能,1为开启0为关闭,如果开启则防盗器在30分钟内没有发生振动,则进入休眠状态,关闭GPS断链,从而节省电量",
    pofTIP: "查询是否开启断电报警功能,1为开启0为关闭",
    gpsTIP: "查询GPS接收的卫星编号和强度,例如：2300 1223 3431 。一共12组四位数,2300表示接收到编号23卫星信号强度为00,1223表示接收到编号为12的卫星信号强度为23",
    vbatTIP: "查询电池电压，充电接口电压，充电电流大小,例如：VBAT=3713300：4960750：303500 表示电池电压为3713300uV，即3.71v,充电电压为4.96V，充电电流303mA",
    //修改密码
    oldPwd: "请输入旧密码",
    newPwd: "请输入新密码",
    confPwd: "确认新密码",
    emptyOldPwd: "请注意，旧密码不能为空",
    emptyNewPwd: "请注意，新密码不能为空",
    pleConfPwd: "请确认新密码",
    confRevision: "确认修改",
    reset: "重置",
    oldPwdTip: "请注意，密码只能为6位数字！",
    newPwdTip: "请注意，新密码只能为6位数字！",
    dismatch: "两次输入的新密码不匹配！",
    wrongOldPwd: "旧密码输入错误，请重新输入！",
    reviseSuccess: "密码修改成功！",
    reviseFail: "密码修改失败！您的设备不在线！",
    updatePass: "修改密码",
    oldPass: "旧密码",
    newPass: "新密码",
    confirmPass: "确认密码",
    passTooltip1: "您输入的旧密码错误，请重新输入",
    passTooltip2: "您两次输入的新密码不一致，请重新输入",
    passTooltip3: "密码修改成功",
    passTooltip4: "密码修改失败",
    oldPassEmpty: "旧密码不能为空",
    newPassEmpty: "新密码不能为空",
    sixNumber: "您输入的密码必须为六位",
    savePassOK: '修改密码成功',
    /****************************************************************************/
    // 报警相关
    msgWindow: '提示信息',
    msgContent: '您有{0}条新的车辆告警信息，请{1}查看!',
    click: '点击',
    alarmtitle: "您有[{0}]辆车发生报警,共产生[{1}]条报警",
    alarmcount: "报警条数",
    alarmsound: "关闭告警声音",
    popalarm: "不再弹出告警",
    freealarm: "解除报警",
    freeall: "解除全部",
    alarmtip: "双击查看该车全部告警,按住键盘shift或ctrl键可以多选",
    detailtitle: "车辆[{0}]报警列表",
    freefail: "解除告警失败,原因:",
    // 服务到期
    overservicetitle: "您有[{0}]辆车服务到期或即将到期，请及时充值，以免影响您的正常使用",
    servicestatus: "服务状态",
    deviceDivision: "设备分类",
    allDevice: "全部设备",
    stoppedDevice: "已停机设备",
    overDevice: "已过期设备",
    thirtyDays: "30天内过期设备",
    normal: "正常设备",
    serviceendtime: "服务截止时间",
    lefttime: "剩余时间",
    charge: "立即续费",
    chargetip: "请联系您的上级经销商进行充值!",
    // 数据统计
    dialy: "单日",
    monthly: "单月",
    manydays: "日区间",
    mileagecount: "里程数(km)",
    speedcount: "超速次数(次)",
    alarmcount: "报警次数(次)",
    offlinecount: "离线时长(h)",
    team: "车队",
    date: "日期",
    invalidDate: "输入日期不合理",
    month: "月份",
    speedlimit: "限速",
    btnexport: "导出",
    exportall: "导出全部",
    previousQuery: "上级查询",
    quickQuery: "快速查询",
    today: "今天",
    yesterday: "昨天",
    thisWeek: "本周",
    lastWeek: "上周",
    thisMonth: "本月",
    lastMonth: "上一月",
    all: "全部",
    timeperiod: "时段",
    track: "轨迹",
    offlinestart: "离线开始时间",
    offlineend: "离线结束时间",
    manydaystip: "日区间统计范围应当在2~30天!",
    speedlimittip: "限速值不能为空!",
    queryfail: "查询失败,原因:",
    querytrack: "查看轨迹",
    total: "总计",
    waitinfo: "正在查询，请稍候......",
    waittimeout: "查询超时,请重试!",
    norecord: "没有符合条件的记录!",

    // 空间对象管理
    geotitle: "空间对象列表",
    geoType: "对象类型",
    geoName: "对象名称",
    inWarn: "进入告警",
    outWarn: "离开告警",
    deviant: "允许误差",
    meter: '米',
    markTip: "标记点",
    extAttr: "备注",
    geoOwner: "作用对象",
    geoPoints: "坐标",
    showAll: "显示全部",
    showPaging: "分页显示",
    refresh: "刷新",
    addnew: "新建",
    edit: "编辑",
    del: "删除",
    draw: "绘制",
    finish: "完成",
    point: '标记点',
    line: '路线',
    clickShow: "点击显示",
    region: '电子围栏',
    geoAlarm: '告警类型',
    emptyPoints: "请点击'绘制'按钮,在'综合监控'页面中绘制",
    editGeoTitle: "编辑空间对象",
    newGeoTitle: "添加空间对象",
    geoNameEmpty: "对象名称不能为空!",
    geoPointsEmpty: "坐标不能为空!",
    yes: "是",
    not: "否",
    noChooseRecord: "请选择要操作的记录!",
    delok: "删除成功!",
    delfail: "删除失败,原因:",
    delconfirm: "确定要删除吗?",
    menuTitle: "空间对象",
    menuAddPt: "添加标记点",
    menuAddLine: "添加路线",
    menuAddRegion: "添加电子围栏",
    unknown: '未知',
    car: '车辆',
    hideAll: '隐藏全部',
    //经纬度定位相关
    confirm: '确定',
    lola: '经纬度',
    cellid: '小区ID',
    lolaNameEmpty: '经度纬度不能为空!',
    wrongValue: '您输入的值有误!',
    wrongCellId: '小区ID不能为空!',
    cellValueEmpty: '基站数据不存在!',
    loRange: '经度范围:-360 ~ 360',
    laRange: '纬度范围:-90 ~ 90',
    cellIdRange: '小区ID正确格式为：460:00:00:11或460.00.00.11',

    /*车小秘专用start*/
    newsRelease: '发布广告',
    newsCenter: '广告中心',
    release: '发布',
    newsTitle: '广告标题',
    releaseTime: '发布时间',
    seeDetails: '详细查看',
    titleEmpty: '广告标题不能为空哦!',
    contentEmpty: '内容不能为空!',
    releaseSuccess: '发布成功!',
    logining: '登录中...',
    login: '登 录',
    deleteRelease: '删除广告',
    delNewsConfirm: '您确定删除，删除之后个人用户将看不到此则广告!',

    sParamValues: ["PSW", "PHONE", "USER", "SPEED", "FREQ", "TRACE", "RADIUS", "VIB", "VIBL", "VIBCALL", "VIBGPS", "SLEEP", "POF"],
    qParamValues: ["PSW", "PHONE", "USER", "SPEED", "FREQ", "TRACE", "RADIUS", "VIB", "VIBL", "VBAT", "VIBCALL", "VIBGPS", "SLEEP", "POF", "GPS"],
    /*车小秘专用end*/


    /*普益电池专用start*/
    totalVoltage: '电池电压',
    cycles: '循环次数',
    batteryCapacity: '剩余容量',
    workingCurrent: '充放电流',
    batteryTemp: '电芯温度',

    chargingSwitch: '充电禁止',
    dischargeSwitch: '放电禁止',
    powerSavingMode: '省电模式',
    powerDownMode: '掉电模式',
    BMSTemp: 'BMSPCB温度',

    overVolPro: '过压保护',
    overPresWarning: '过压告警',
    underVolPro: '欠压保护',
    underVolWarning: '欠压告警',

    chargingFlow: '充电过流',
    dischargeFlow: '放电过流',
    batteryThermal: '电池高温',
    batteryLowTemp: '电池低温',

    powerHighTemp: '功率高温',
    shortCirPro: '短路保护',
    voltageDrop: '电压掉线',
    TempDrops: '温度掉线',

    times: '次',

    //普益报警数组
    pyAlarm: [
        '欠压告警', '欠压保护', '过压告警', '过压保护',
        '掉电模式', '省电模式', '放电禁止', '充电禁止',
        '温度掉线', '电压掉线', '短路保护', '功率高温',
        '电池低温', '电池高温', '放电过流', '充电过流'
    ],

    /*普益电池专用end*/


    /*2016-01-07*/
    offlineOrder: '离线指令',
    simNO1: '配置终端SIM卡',
    queryOfflineOrder: '查询离线配置',
    inputSimNO: "终端sim卡号",
    queryPhoneNO1: '查询车主号码',
    setPhoneNo1: "配置车主号码",
    offlineOrderDes: "多个车辆，默认查询/配置车牌号：{0},如果想查询/配置其它车辆，请单独选中!",
    offlineOrderDes1: '未查询到任何离线配置指令!',
    "inactive": "参数值：{0}，未生效!",
    noConfigure: "您还未配置离线指令，请在左侧输入，点击配置按钮确认!",
    "force": "参数值：{0}，已生效!",
    querySimNO1: '查询终端SIM卡',
    "inactive1": "已查询参数值为：{0}，未生效,是否修改参数值?",
    updateOfflineSuccess: "修改离线指令成功!",
    simNO1Empty: '终端sim卡号码不能为空,请在左侧输入!',
    phoneNO1Empty: '车主号码不能为空,请在左侧输入!',
    addOfflineSuccess: '增加离线指令成功!',

    /*2016-12-26*/
    downloadKml: '下载轨迹',
    downloadKmlHelp: '说明:下载的轨迹文件的格式是Google KML格式，如:“文件名.kml”。<br>' +
    '安装 Google Earth后。双击KML文件，会通过Google Earth工具打开。<br>' +
    '所下载的"KML轨迹文件"会将设备的移动痕迹以红线动态的描绘在Google地图上。<br>' +
    '»<a href="http://dl.google.com/earth/client/ge4/release_4_3/googleearth-win-plus-4.3.7284.3916.exe">下载 Google Earth</a>',
    adminRemark:'管理员备注',getInfo:'获取',adminRemarkState:'用于车队管理员备注终端信息,个人用户无权限使用!',setInfo:'设置'


}

// 查询参数的帮助
var html = [];
html.push('<table class="cmdTable" width="100%" border="0">');
html.push('<tr>');
html.push('<td class="cmdLabel" width="60">PSW:</td>');
html.push('<td>查询终端密码</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">PHONE:</td>');
html.push('<td>查询终端内置SIM卡号码</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">USER:</td>');
html.push('<td>查询车主手机号码</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">SPEED:</td>');
html.push('<td>查询超速报警限速值</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">FREQ:</td>');
html.push('<td>查询开启追踪后的上报频率,单位是秒</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">TRACE:</td>');
html.push('<td>查询是否开启追踪,1是开启追踪,0是关闭追踪</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">RADIUS:</td>');
html.push('<td>查询非法移位报警判定范围,单位是米</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">VIB:</td>');
html.push('<td>查询是否开启振动短信报警,1为开启0为关闭');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">VIBL:</td>');
html.push('<td>查询振动灵敏度0~15,0为最高灵敏度,太高可能会误报,15为最低灵敏度</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">VIBCALL:</td>');
html.push('<td>查询是否开启振动电话报警,1为开启0为关闭');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">VIBGPS:</td>');
html.push('<td>查询是否开启GPS过滤漂移功能,1为开启0为关闭,如果开启则防盗器在5分钟内没有发生振动,则进入静止状态,过滤所有GPS漂移点</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">SLEEP:</td>');
html.push('<td>查询是否开启休眠功能,1为开启0为关闭,如果开启则防盗器在30分钟内没有发生振动,则进入休眠状态,关闭GPS断链,从而节省电量</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">POF:</td>');
html.push('<td>查询是否开启断电报警功能,1为开启0为关闭</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">GPS:</td>');
html.push('<td>查询GPS接收的卫星编号和强度,例如：2300 1223 3431 。。。 一共12组四位数,2300表示接收到编号23卫星信号强度为00,1223表示接收到编号为12的卫星信号强度为23</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">VBAT:</td>');
html.push('<td>查询电池电压，充电接口电压，充电电流大小,例如：VBAT=3713300：4960750：303500 表示电池电压为3713300uV，即3.71v,充电电压为4.96V，充电电流303mA</td>');
html.push('</tr>');
html.push('</table>');
lg.queryparamhelp = html.join("");

// 设置参数的帮助
html = [];
html.push('<table class="cmdTable" width="100%" border="0">');
html.push('<tr>');
html.push('<td class="cmdLabel" width="60">PSW:</td>');
html.push('<td>设置终端密码,密码只能为6位数字</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">PHONE:</td>');
html.push('<td>设置终端内SIM卡号码</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">USER:</td>');
html.push('<td>设置车主手机号码</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">SPEED:</td>');
html.push('<td>设置超速报警限速值,范围应当在0~300之间</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">FREQ:</td>');
html.push('<td>设置开启追踪后的上报频率,单位是秒</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">TRACE:</td>');
html.push('<td>设置是否开启追踪,1是开启追踪,0是关闭追踪</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">RADIUS:</td>');
html.push('<td>设置非法移位报警判定范围,单位是米</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">VIB:</td>');
html.push('<td>设置是否开启振动短信报警,1为开启0为关闭');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">VIBL:</td>');
html.push('<td>设置振动灵敏度0~15,0为最高灵敏度,太高可能会误报,15为最低灵敏度</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">VIBCALL:</td>');
html.push('<td>设置是否开启振动电话报警,1为开启0为关闭');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">VIBGPS:</td>');
html.push('<td>设置是否开启GPS过滤漂移功能,1为开启0为关闭,如果开启则防盗器在5分钟内没有发生振动,则进入静止状态,过滤所有GPS漂移点</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">SLEEP:</td>');
html.push('<td>设置是否开启休眠功能,1为开启0为关闭,如果开启则防盗器在30分钟内没有发生振动,则进入休眠状态,关闭GPS断链,从而节省电量</td>');
html.push('</tr>');
html.push('<tr>');
html.push('<td class="cmdLabel">POF:</td>');
html.push('<td>设置是否开启断电报警功能,1为开启0为关闭</td>');
html.push('</tr>');
html.push('</table>');
lg.setparamhelp = html.join("");
