import request from '../request.js'

const generateSwiper = function (id, config) {
  const swiperConfig = (!this.isEmptyObject(config) && config) || {
    slidesPerView: "auto",
    spaceBetween: 12,
    observer: true,
    observeParents: true
  };
  setTimeout(function () {
    new Swiper("#" + id, swiperConfig);
  }, 0);
};
const generateBanner = async function generateBanner(url, info) {
  //使用葛琛的swiper.js并且html代码符合该插件的要求
  const bannerRes = await request.get(url);
  let result = bannerRes.result;
  if (Array.isArray(info)) {
    // array的部分尚未完成
    // info.reduce(function (res, item){
    //   res = result[item]
    //   return res
    // })
  } else if (typeof info === "string") {
    window.getad(result[info]);
  } else {
    console.log("wrong info in generateBanner");
  }
};

export {
  generateSwiper,
  generateBanner
}