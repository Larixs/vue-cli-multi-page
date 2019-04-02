export {
  gongmuAppEvent,
  addShareButton,
  removeShareButton,
  shareMethod,
  addSearchButton,
  removeSearchButton,
  openPdf,
  openNativeLogin,
} from './utils/nativeMethods.js'

export {
  isApp,
  isAndroidApp,
  isIosApp,
  isIos11,
  isIos,
  isPC,
  appVersion,
  currentVersionIsAfter,
} from './utils/environment.js'

export {
  generateSwiper,
  generateBanner
} from './utils/generate.js'

export {
  jump
} from './utils/jump.js'

export {
  getQueryString,
  isLocalStorageSupported,
  getCookie,
  isEmptyObject,
  trimLeftRight,
  trimTag,
  setTitle,
  px2rem,
  rem2px,
  ga,
  analyseStyleRules,
  getUserSession,
  setUserSession,
  removeUserSession,
} from './utils/tools.js'

export {
  addWechatShare
} from './utils/wechatMethods.js'