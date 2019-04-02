import { isApp } from "./environment";
import request from "../request.js";
import lodash from "lodash";

const getQueryString = function(key) {
  const search = decodeURIComponent(window.location.search);
  const hash = decodeURIComponent(window.location.hash);
  let searchResult = "",
    hashResult = "";
  if (!!search) {
    const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    searchResult = search.substr(1).match(reg);
  }
  if (!!hash) {
    //在用vue-router时，可能会从hash里面去寻找查询字符串
    const reg = new RegExp("(^|&|\\?)" + key + "=([^&]*)(&|$)");
    hashResult = hash.substr(1).match(reg);
  }
  //返回参数值
  const result = searchResult || hashResult;
  if (result) {
    let temp = decodeURIComponent(result[2]);
    return ["undefined", "null", "''", '""'].includes(temp) ? null : temp;
  } else {
    return null;
  }
};

const isLocalStorageSupported = function() {
  var testKey = "test",
    storage = window.localStorage;
  try {
    storage.setItem(testKey, "testValue");
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

const getCookie = function(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
};

const isEmptyObject = function(obj) {
  if (JSON.stringify(obj) === "{}") {
    return true;
  } else {
    return false;
  }
};
const trimLeftRight = function(str) {
  if (typeof str == "string") {
    return str.replace(/(^\s*)|(\s*$)/g, ""); //去除字符窜的左右空格
  } else {
    console.warn("trimLeftRight params is not String");
    return str;
  }
};

const trimTag = function(str) {
  if (typeof str == "string") {
    return str.replace(/(<([^>]+)>)/gi, ""); //去除html标签
  } else {
    console.warn("trimTag params is not String");
    return str;
  }
};

const setTitle = function(title) {
  if (isApp()) {
    document.title = title;
  } else {
    setTimeout(() => {
      //利用iframe的onload事件刷新页面
      document.title = title;
      var iframe = document.createElement("iframe");
      iframe.style.visibility = "hidden";
      iframe.style.width = "1px";
      iframe.style.height = "1px";
      iframe.onload = function() {
        setTimeout(function() {
          document.body.removeChild(iframe);
        }, 0);
      };
      document.body.appendChild(iframe);
    }, 0);
  }
};

const px2rem = function($px) {
  return $px / 20 + "rem";
};
const rem2px = function(rem) {
  return rem * 20 + "px";
};
const ga = function(...arg) {
  try {
    window.ga(...arg);
  } catch (e) {
    console.log(e);
    //2s后再试一次
    setTimeout(() => {
      try {
        window.ga(...arg);
      } catch (err) {
        console.log("ga 加载失败", ...arg)
        console.log(err)
      }
    }, 2000);
  }
};

const analyseStyleRules = function(
  styleRules,
  defaultStyleRules = {},
  instanceValue,
  skipFunction = false
) {
  let result = {};
  if (typeof styleRules === "string") {
    //styleRules为string
    result[styleRules] = true;
  } else if (Array.isArray(styleRules)) {
    //styleRules为array
    styleRules.forEach(rule => {
      result[rule] = true;
    });
  } else if (lodash.isFunction(styleRules)) {
    //styleRules为function
    result = styleRules(instanceValue);
  } else if (typeof styleRules === "object") {
    //styleRules为object
    Object.keys(styleRules).forEach(key => {
      let rule = styleRules[key];
      if (lodash.isFunction(rule)) {
        result[key] = skipFunction ? rule : rule(instanceValue); //skipFunction用于保留原函数
      } else {
        result[key] = ["", undefined, null].includes(rule)
          ? defaultStyleRules[key]
          : rule;
      }
    });
  } else {
    return defaultStyleRules;
  }
  return Object.assign({}, defaultStyleRules, result);
};

const localStorageSupportedFlag = isLocalStorageSupported();

const getUserSession = function(key) {
  if (localStorageSupportedFlag) {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    if (arguments.length) {
      return lodash.get(userSession, key);
    } else {
      //如果不传参数，则返回整个userSession对象
      return userSession;
    }
  } else {
    return {};
  }
};

const setUserSession = function() {
  const param1 = arguments[0];
  if (localStorageSupportedFlag) {
    let userSession = getUserSession();
    if (userSession === null || userSession === undefined) {
      userSession = {};
    }
    let temp = {};
    if (typeof param1 === "object") {
      //如果第一个参数是对象，则直接合并
      temp = param1;
    } else if (typeof param1 === "string") {
      //如果第一个参数是字符串，则将第一个参数与第二个参数作为键值对，合并到userSession里
      const param2 = arguments[1];
      temp[param1] = param2;
    }
    Object.assign(userSession, temp);
    localStorage.setItem("userSession", JSON.stringify(userSession));
    return true; //设置成功
  }
  return false; //设置失败
};

const removeUserSession = function() {
  if (localStorageSupportedFlag) {
    try {
      localStorage.removeItem("userSession");
      sessionStorage.removeItem("userSession");
    } catch (err) {
      return false;
    }
    return true; //删除成功
  }
  return false; //删除失败
};

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
};
