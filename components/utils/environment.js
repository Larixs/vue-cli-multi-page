const isApp = function () {
  const ua = window.navigator.userAgent.toLowerCase();
  let pkgversion = '';
  if (window.nativeCommon && window.nativeCommon.getPkgVersion) {
    pkgversion = window.nativeCommon.getPkgVersion()
  }
  // 测试包名包含“rice”,在app中;正式包名包含"licai"
  if (ua.indexOf("rice") > -1 || ua.indexOf("licai") > -1 || pkgversion.indexOf("rice") > -1 || pkgversion.indexOf("licai") > -1 || ua.indexOf('gezi') > -1 || pkgversion.indexOf("gezi") > -1) {
    return true;
  } else {
    return false;
  }
};

const isAndroidApp = function () {
  var ua = window.navigator.userAgent.toLowerCase();
  if (isApp() && ua.indexOf("android") > -1) {
    return true;
  } else {
    return false;
  }
};

const isIosApp = function () {
  var ua = window.navigator.userAgent.toLowerCase();
  if (isApp() && ua.indexOf("iphone") > -1) {
    return true;
  } else {
    return false;
  }
};

const isIos11 = function () {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.indexOf("iphone os 11") > -1) {
    return true;
  } else {
    return false;
  }
};

const isIos = function () {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.indexOf("iphone") > -1) {
    return true;
  } else {
    return false;
  }
};

const isPC = function () {
  const ua = window.navigator.userAgent.toLowerCase();
  const Agents = new Array("android", "iphone", "symbianos", "windows phone", "ipad", "ipod");
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (ua.indexOf(Agents[v]) > 0) { flag = false; break; }
  }
  return flag;
}

const appVersion = function () {
  if (isApp()) {
    var ua = window.navigator.userAgent.toLowerCase();
    let pkgversion = '';
    if (window.nativeCommon && window.nativeCommon.getPkgVersion) {
      pkgversion = window.nativeCommon.getPkgVersion()
    }
    var arr = (!!pkgversion ? pkgversion : ua ).split("/")
    return arr.length ? arr[arr.length - 1] : "-1"
  } else {
    return "-1";
  }
};

const currentVersionIsAfter = function(version, isInclude){
  try{
    //此处假设版本号都是3位
    const currentVersion = appVersion()
    const versionArr = version.split(".")
    const currentVersionArr = currentVersion.split(".")
    for(let i = 0; i < versionArr.length; i++){
      if(+currentVersionArr[i] > +versionArr[i]){
        return true
      }else if(+currentVersionArr[i] < +versionArr[i]){
        return false
      }
    }
    return !!isInclude       //当前版本号与目标版本号相同
  }catch (err){
    console.log(err)
  }
}

export {
  isApp,
  isAndroidApp,
  isIosApp,
  isIos11,
  isIos,
  isPC,
  appVersion,
  currentVersionIsAfter,
}