(function (root = window, factory) {
	if (typeof define === 'function' && define.amd) {
		define(function () {
			return factory(root);
		});
	} else if (typeof exports === 'object') {
		module.exports = factory;
	} else {
		root.mlazy = factory(root);
	}
})(this, function (root) {

	function mlazy(selector, options) {

		var imgList = [],  // 页面所有img元素集合
			delay,   // setTimeout 对象
			offset,  //偏移量，用于指定图片距离可视区域多少距离，进行加载
			lazyTime,  // 延迟载入时间
			isImg, // img 标签 or background-image 属性（默认img）
			_selector; // 选择器 默认为 .m-lazyload



		var _isShow = function (el) {
			var coords = el.getBoundingClientRect();
			return ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight) + parseInt(offset));
		}

		var _loadImage = function () {
			for (var i = imgList.length; i--;) {
				var el = imgList[i];
				if (_isShow(el)) {
					var data_src = el.getAttribute('data-src');
					if (isImg) {
						el.src = data_src;
					} else {
						el.style.backgroundImage = 'url(' + data_src + ')';
					}
					el.className = el.className.replace(new RegExp("(\\s|^)" + _selector.substring(1, _selector.length) + "(\\s|$)"), " ");
					imgList.splice(i, 1);
				}
			}
		}

		var _delay = function () {
			clearTimeout(delay);
			delay = setTimeout(function () {
				_loadImage();
			}, lazyTime);
		}

		var getNode = function () {
			imgList = [];
			var nodes = document.querySelectorAll(_selector);
			for (var i = 0, l = nodes.length; i < l; i++) {
				imgList.push(nodes[i]);
			}
		};


		var defaults = options || {};
		offset = defaults.offset || 100;
		lazyTime = defaults.lazyTime || 100;
		isImg = defaults.isImg;
		_selector = selector || '.m-lazyload';
		getNode();
		_delay();//避免首次加载未触发touch事件,主动触发一次加载函数
		if (defaults.iScroll) {
			defaults.iScroll.on('scrollEnd', _delay);
		} else {
			root.addEventListener('scroll', _delay, false);
		}
	}

	return mlazy;
});