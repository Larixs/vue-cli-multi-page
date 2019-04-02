const config = require("../config");
const assetsPublicPath = config.build.assetsPublicPath;

function setAssetsPublicPath(obj) {
	"use strict";
	let result = {};
	for (let key in obj) {
		if (Array.isArray(obj[key])) {
			result[key] = obj[key].map(function (link) {
				if (/^pf\/mobile\/static\//.test(link)) {
					return assetsPublicPath + link;
				} else {
					return link;
				}
			});
		}
	}
	return result;
}

exports.jsLink = setAssetsPublicPath({
	test_base_comp: [
    "/static/lib/highstock/highstock.js",
  ],
});
exports.cssLink = setAssetsPublicPath({
});
exports.title = {
	//请按项目的首字母顺序进行排序，方便以后查漏补缺
  test_base_comp: "测试用例"
};
exports.defaultTitle = " ";
exports.app = {};
exports.defaultApp = "app";
