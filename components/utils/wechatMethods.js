import { getIvCodeUrl } from './tools'


const addWechatShare = async function (config = {}) {
  const defaultConfig = {
    title: window.meta_sharetitle || document.title || '格上财富',
    link: location.href,
    desc: window.meta_description || '最新大佬访谈，最热机构路演，权威数据实时呈现，一手研报尽在掌握，了解私募就是这么简单，格上财富，精选好私募！',
    imgUrl: "/././././static/img/licai_h5/logo_wechat.png"
  }

  const _config = {
    ...defaultConfig,
    ...config
  }

  //获取设置iv_code的url getIvCodeUrl为异步函数 需要await
  _config.link = await getIvCodeUrl(_config.link, { utm_medium: 'wechat', utm_source: 'share' })

  //设置微信分享
  const setWechat = () => {
    if (!!window.wx) {
      wx.ready(function () {
        wx.onMenuShareTimeline(
          _config
        );

        wx.onMenuShareAppMessage(
          _config
        );
      });
    } else {
      setTimeout(() => {
        setWechat()
      }, 100);
    }
  }

  setWechat()
};

export {
  addWechatShare
}