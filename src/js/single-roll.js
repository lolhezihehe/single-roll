/*!
 * Single line text scrolling
 * jquery.single-roll - v0.0.1
 * https://github.com/lolhezihehe/single-roll
 * 2017-10-24
 */
(function (factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports !== 'undefined') {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}

})(function ($) {
	$.fn.singleRoll = function (options) {
		var $self = $(this);
		var settings = $.extend({
			height: 30,
			unit: "px",
			interval: 3000, // rolling interval time
			notice: true, // show icon notice
			ellipsis: false, // overflow ellipsis
			canClose: false // can close
		}, options);
		var noData = settings.data === undefined || settings.data.length === 0;
		var ret = {
			createElems: function () {
				var Elems = '';
				$self.addClass('cos-single-roll');
				Elems += '<ul class="cos-single-swap">';
				if (noData) {
					Elems += '<li>暂无公告</li></ul>';
					$self.append('<ul class="cos-single-swap"><li>暂无公告</li></ul>');
					return false;
				}
				for (var i = 0; i < settings.data.length; i++) {
					if (settings.data[i].href) {
						Elems += '<li><a href="' + settings.data[i].href + '">' + settings.data[i].text + '</a></li>';
					} else {
						Elems += '<li>' + settings.data[i].text + '</li>';
					}
				}
				if (settings.data[0].href) {
					Elems += '<li><a href="' + settings.data[0].href + '">' + settings.data[0].text + '</a></li></ul>';
				} else {
					Elems += '<li>' + settings.data[0].text + '</li></ul>';
				}
				$self.append(Elems);
			},

			hasNotice: function () {
				if (settings.notice) {
					$self.addClass('notice');
					$self.append('<div class="cos-single-notice"><i></i></div>');
				}
			},

			hasClose: function () {
				if (settings.canClose) {
					var $closeElem = $('<div class="cos-single-close"><i></i></div>');
					$closeElem.click(function () {
						$self.remove();
					})
					$self.addClass('close');
					$self.prepend($closeElem);
				}
			},

			hasEllipsis: function () {
				if (settings.ellipsis) {
					$self.find('.cos-single-swap').addClass('ellipsis');
				}
			},

			rolling: function () {
				if (noData) return false;
				var top = 0,
					h = settings.height;
				var $swap = $($self.find('.cos-single-swap')[0]);
				var swap_h = $swap.height();

				setInterval(function () {
					top -= h;
					if (Math.abs(top) >= swap_h) {
						$swap.css('top', '0px');
						top = -h;
					}
					$swap.animate({
						top: top + settings.unit
					}, 'slow');
				}, settings.interval);
			},

			init: function () {
				this.createElems();
				this.hasNotice();
				this.hasClose();
				this.hasEllipsis();
				this.rolling();
			}

		}

		ret.init();
	}
});