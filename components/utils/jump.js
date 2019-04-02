
const jump = function (url, type = "href") {

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
  _jumpHanlder(url);
};

export {
  jump
}