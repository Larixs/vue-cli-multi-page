//config:
// allApiStatus: Boolean 是否返回所以状态
// ignoreApiStatus: Array 需要忽略的状态码


import axios from "axios";
import 'whatwg-fetch'

const checkNetworkStatus = response => {
  // window.fetchQueue.pop()
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status >= 500 && response.status < 600) {
    const error = new Error('服务器访问异常');
    error.response = response;
    throw error;
  } else {
    const error = new Error('网络异常，请稍后再试');
    error.response = response;
    throw error;
  }
};

// const checkApiStatus = (response, config) => {
//   const { allApiStatus, ignoreApiStatus } = config;
//   let _apiStatus = [0, 1004, 7001]
//   return response.json().then(data => {
//     if (allApiStatus) {
//       return data;
//     }
//     if (Array.isArray(ignoreApiStatus)) {
//       _apiStatus = _apiStatus.concat(ignoreApiStatus)
//     }
//     if (
//       data &&
//       _apiStatus.filter(e => Number(e) == data.code).length > 0
//     ) {
//       // console.log(data)
//       return data;
//     }
//     const error = new Error(data.msg);
//     error.response = data;
//     throw error;
//   })
//
// };

const checkApiStatus =  (response, config) => {
  const { allApiStatus, ignoreApiStatus } = config;
  let _apiStatus = [0, 1004, 7001]
  if (Array.isArray(ignoreApiStatus)) {
    _apiStatus = _apiStatus.concat(ignoreApiStatus)
  }
  const data = response.data
  if (allApiStatus) {
    return response;
  }
    if (
      data &&
      _apiStatus.findIndex(e => Number(e) == data.code) !== -1
    ) {
    return response
  }
  const error = new Error(data.msg);
  error.response = response;
  throw error;
};

const showNotification = err => {
  console.log(err);
  console.log(err.message);
  if (err.message === 'Type error' || err.message === 'Failed to fetch') {
    console.log('网络异常，请稍后再试')
  } else {
    console.log(err.message);
  }

  // 在这里再次抛出错误的原因是需要在具体的组件里
  // 用try-catch进行流程控制
  throw err;
};

const getQuery = params => {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
}

export default {
  get(url, params = {}, config = {}) {
    // // console.log('request get')
    // window.fetchQueue = window.fetchQueue || []
    // window.fetchQueue.push(true)
    // const _params = params.params || {}
    // const query = getQuery(_params)
    // return fetch(`${url}${url.indexOf('?') > 0 || !query ? '' : '?' + query}`, {
    //   credentials: 'include'
    // })
    //   .then(response => checkNetworkStatus(response, config))
    //   .then(response => checkApiStatus(response, config))
    //   .then(data => {
    //     // console.log('return data')
    //     return data
    //   })
    //   .catch(showNotification);
    return axios
      .get(url, params)
      .then(response => checkNetworkStatus(response, config))
      .then(response => checkApiStatus(response, config))
      .then(response => response.data)
      .catch(showNotification);
  },
  post(url, options, config = {}) {
    // window.fetchQueue = window.fetchQueue || []
    // window.fetchQueue.push(true)
    // return fetch(url, {
    //   method: "POST",
    //   credentials: 'include',
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(options)
    // }).then(response => checkNetworkStatus(response, config))
    //   .then(response => checkApiStatus(response, config))
    //   .then(data => {
    //     // console.log('return data')
    //     return data
    //   }).catch(showNotification);
    return axios
      .post(url, options)
      .then(response => checkNetworkStatus(response, config))
      .then(response => checkApiStatus(response, config))
      .then(response => response.data)
      .catch(showNotification);
  },
  put(url, options, config = {}) {
    // window.fetchQueue = window.fetchQueue || []
    // window.fetchQueue.push(true)
    // return fetch(url, {
    //   method: "PUT",
    //   credentials: 'include',
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(options)
    // }).then(response => checkNetworkStatus(response, config))
    //   .then(response => checkApiStatus(response, config))
    //   .then(data => {
    //     // console.log('return data')
    //     return data
    //   }).catch(showNotification);
    return axios
      .put(url, options)
      .then(response => checkNetworkStatus(response, config))
      .then(response => checkApiStatus(response, config))
      .then(response => response.data)
      .catch(showNotification);
  },
  delete(url, params, config = {}) {
    // // console.log('request get')
    // window.fetchQueue = window.fetchQueue || []
    // window.fetchQueue.push(true)
    // const _params = params.params || {}
    // const query = getQuery(_params)
    // return fetch(`${url}${url.indexOf('?') > 0 ? '' : '?' + query}`, {
    //   method: "DELETE",
    //   credentials: 'include'
    // })
    //   .then(response => checkNetworkStatus(response, config))
    //   .then(response => checkApiStatus(response, config))
    //   .then(data => {
    //     console.log('return data')
    //     return data
    //   })
    //   .catch(showNotification);
    return axios
      .delete(url, params)
      .then(response => checkNetworkStatus(response, config))
      .then(response => checkApiStatus(response, config))
      .then(response => response.data)
      .catch(showNotification);
  },
  patch(url, params, config = {}) {
    // window.fetchQueue = window.fetchQueue || []
    // window.fetchQueue.push(true)
    // const _params = params.params || {}
    // const query = getQuery(_params)
    // return fetch(`${url}${url.indexOf('?') > 0 ? '' : '?' + query}`, {
    //   method: "PATCH",
    //   credentials: 'include'
    // })
    //   .then(response => checkNetworkStatus(response, config))
    //   .then(response => checkApiStatus(response, config))
    //   .then(data => {
    //     // console.log('return data')
    //     return data
    //   })
    //   .catch(showNotification);
    return axios
      .patch(url, params)
      .then(response => checkNetworkStatus(response, config))
      .then(response => checkApiStatus(response, config))
      .then(response => response.data)
      .catch(showNotification);
  }
};
