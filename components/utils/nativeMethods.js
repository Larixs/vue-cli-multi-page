import { isApp, isAndroidApp, isIosApp } from './environment';
import { getIvCodeUrl } from './tools'
import request from "components/request"


const gongmuAppEvent = function (url){
  // 公募列表点击
  if ( this.isApp() ) {
    nativeCommon &&
    nativeCommon.nativeRoute(
      encodeURIComponent(
        JSON.stringify({
          schemeURL: 'licaigezi://main',
          onerrorURL: url
        })
      )
    );
  } else {
    location.href = url;
  }
};

const addShareButton = function (obj){
  const checkFlag = () =>{
    if ( isApp() ) {
      if ( !!window.nativeCommon == false ) {
        window.setTimeout(checkFlag, 100);
      } else {
        if ( window.nativeCommon && window.nativeCommon.addNavBarButton ) {
          window.nativeCommon.addNavBarButton(
            'share',
            'share',
            "shareMethod('common',shareContent)"
          );
        }
      }
    }
  };

  shareMethodHandler(obj);
  checkFlag();
};
const removeShareButton = function (){
  if ( isApp() ) {
    window.nativeCommon.removeNavBarButton('share');
  }
};

const shareMethod = function (obj, type = 'common'){
  shareMethodHandler(obj, type);
  window.shareMethod(type, window.shareContent);
};

const shareMethodHandler = async function (obj, type = 'common'){
  const subStr = (str, len) =>{
    if ( str == '' || str == null ) return;
    var new_str = str.substr(0, len);
    return new_str;
  };

  window.shareMethod = (type, obj) =>{
    window.nativeCommon.share(type, JSON.stringify(obj));
  };

  const mainTitle = obj.mainTitle || '格上财富', // 主标题
    subTitle = obj.subTitle || '最新大佬访谈，最热机构路演，权威数据实时呈现，一手研报尽在掌握，了解私募就是这么简单，格上财富，精选好私募！', // 副标题
    defaultContent = subStr(obj.weiboCont, 100) || '最新大佬访谈，最热机构路演，权威数据实时呈现，一手研报尽在掌握，了解私募就是这么简单，格上财富，精选好私募！', // weibo
    pic = obj.pic
      || 'https://resource.gstianfu.com/static/img/licai_h5/logo_wechat.png'; // 分享logo

  let link = obj.link || `https://mobile.licai.com${window.location.pathname}${window.location.hash}${window.location.search}` // 分享链接
  let analytics = obj.analytics || {}
  //获取iv_code
  link = await getIvCodeUrl(link, { utm_medium: 'app', utm_source: 'share' })

  window.shareContent = [
    {
      platform: type,
      shareTitle: encodeURIComponent(mainTitle),
      defaultContent: encodeURIComponent(defaultContent),
      shareContents: [
        {
          type: 0,
          content: [encodeURIComponent(subTitle)]
        },
        {
          type: 1,
          content: [encodeURIComponent(link)]
        },
        {
          type: 2,
          content: [encodeURIComponent(pic)]
        }
      ],
      analytics: {
        contentType: encodeURIComponent(analytics.contentType || ''),
        contentID: encodeURIComponent(analytics.contentID || ''),
      },
    }
  ];
};

// const setShareContent = (obj) =>{
//   window.shareContent = [
//     Object.assign({}, window.shareContent[0], obj)
//   ]
// }

const addSearchButton = function (){
  window.nativeSearch = function (){
    nativeCommon.nativeRoute(
      encodeURIComponent(
        JSON.stringify({
          schemeURL: 'licairice://dl/search/'
        })
      )
    );
  };
  if ( isApp() ) {
    if ( isAndroidApp() ) {
      window.nativeCommon.addNavBarButton('search', 'search', 'nativeSearch()');
    } else if ( isIosApp() ) {
      setTimeout(function (){
        if ( typeof window.nativeCommon != 'undefined' ) {
          window.nativeCommon.addNavBarButton(
            'search',
            'search',
            'nativeSearch()'
          );
        }
      }, 100);
    }
  }
};

const removeSearchButton = function (){
  if ( isApp() ) {
    window.nativeCommon.removeNavBarButton('search');
  }
};

const openPdf = function (url, title = ''){
  if ( isApp() ) {
    window.nativeCommon &&
    window.nativeCommon.nativeRoute(
      encodeURIComponent(
        JSON.stringify({
          schemeURL: 'licairice://dl/pdf_view/',
          onerrorURL: window.location.origin + '/licai/index',
          parameters: {
            pdf_url: url,
            title: title
          }
        })
      )
    );
  } else {
    window.open(url)
  }
};

const openNativeLogin = function (){
  if (isApp()) {
    window.nativeCommon &&
    window.nativeCommon.nativeRoute(
      encodeURIComponent(
        JSON.stringify({
          schemeURL: 'licairice://dl/login/',
        })
      )
    );
  }
}
export {
  gongmuAppEvent,
  addShareButton,
  removeShareButton,
  shareMethod,
  addSearchButton,
  removeSearchButton,
  openPdf,
  openNativeLogin,
};
