import { Toast } from 'base_components'

let timeStamp = 0
//无条件允许第一次跳转

window.nativeJumpFlag = false
window.addEventListener("$$onPageResume", event => {
  window.nativeJumpFlag = false
  timeStamp = 0
  console.log("utils jump pageResume")
})
window.addEventListener("$$onPagePause", event => {
  window.nativeJumpFlag = false
})


const jump = function (url, type = "href") {

  //jump方法支持前端路由跳转 使用前端路由跳转时第二个参数为Obj。其中router为前端路由对象，method为方法，剩下的与前端路由文档一直。path可以不传，默认使用url作为前端路由的path。支持method为go，第一个参数为传给go的参数

  console.log('offline flag', window.offlineFlag)
  if (window.offlineFlag) {
    Toast('网络异常，请稍后再试')
    return
  }

  let _type
  if (typeof type != 'string') {
    _type = type.method || 'push'
  } else {
    _type = type
  }

  const _jumpHanlder = url => {
    if (typeof type != 'string') {
      _routerHandler()
    } else {
      switch (_type) {
        case "href":
          window.location.href = url;
          break;
        case "replace":
          window.location.replace(url);
          break;
        case "go":
          window.history.go(Number(url));
          break;
      }
    }
  };

  const _routerHandler = () => {
    const { router } = type
    if (!!router) {
      if (_type === 'go') {
        router.go(Number(url))
      } else {
        router[_type]({ path: url, ...type })
      }
    } else {
      switch (_type) {
        case "push":
          window.location.href = url;
          break;
        case "replace":
          window.location.replace(url);
        case "go":
          window.history.go(Number(url));
      }
    }
  }

  const _appHandler = url => {
    if (window.nativeJumpFlag) return
    switch (true) {
      case url.indexOf("/licai/index") > -1:
        window.nativeJumpFlag = true
        nativeCommon && nativeCommon.switchtab(0, true);
        break;
      case url.indexOf("/pf/mobile/video") > -1:
        window.nativeJumpFlag = true
        nativeCommon && nativeCommon.switchtab(1, true);
        break;
      case url.indexOf("/pf/mobile/hot") > -1 &&
        url.indexOf("/pf/mobile/hot_") < 0:
        window.nativeJumpFlag = true
        nativeCommon && nativeCommon.switchtab(2, true);
        break;
      case url.indexOf("/pf/mobile/favorite") > -1:
        window.nativeJumpFlag = true
        nativeCommon && nativeCommon.switchtab(3, true);
        break;
      case url === "/pf/mobile/user/" || url === "/pf/mobile/user/#/":
        window.nativeJumpFlag = true
        nativeCommon && nativeCommon.switchtab(4, true);
        break;
      default:
        if (typeof type != 'string') {
          _routerHandler()
        } else {
          let _url
          if (url.slice(0, 4) == 'http') {
            _url = url
          } else {
            _url = window.location.origin + url
          }
          if (_type == 'replace') {
            window.location.replace(url);
          } else if (_type == 'go') {
            if (url == '-1') {
              window.nativeJumpFlag = true
              nativeCommon.close()
            } else {
              window.history.go(Number(url))
            }
          } else {
            // console.log(_url)
            if (_url.indexOf('?') > 0 && _url.indexOf('?') > _url.indexOf('#') && _url.split('#').length > 2 || _url.split('http').length > 2 || escape(_url).indexOf("%u") > 0) {
              const _herf = _url.slice(0, _url.indexOf('?') + 1)
              const _query = _url.slice(_url.indexOf('?') - _url.length + 1)
              _url = _herf + encodeURIComponent(_query)
            }
            // console.log(_herf)
            // console.log(_query)
            // return

            //防止多次打开webview
            const now = new Date()
            const duration = now - timeStamp
            if (duration < 2000) {
              //2s内不让重复跳转
              console.log("jump too short")
              return
            }
            timeStamp = now
            window.nativeJumpFlag = true
            console.log("open new webwiew")
            nativeCommon && nativeCommon.nativeRoute(
              encodeURIComponent(
                JSON.stringify({
                  schemeURL: _url,
                  onerrorURL: window.location.origin + "/licai/index"
                })
              )
            );
          }
        }
    }
  };
  try{
    window.sessionStorage.setItem('lastPageInfo', JSON.stringify({
      url: window.location.href,
      historyLength: window.history.length
    }))
  }catch (err){
    console.log(err)
  }

  if (!!url && url !== "undefined" && url !== "null") {
    if (this.isApp()) {
      console.log('jump')
      _appHandler(url);
    } else {
      _jumpHanlder(url);
    }
  }
};

export {
  jump
}