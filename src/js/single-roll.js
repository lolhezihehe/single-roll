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
			notice: false, // show icon notice
			ellipsis: false, // overflow ellipsis
			close: false // can close
		}, options);
		var ret = {
			createElems: function () {
				var Elems = '';
				$self.addClass('cos-single-roll');
				Elems += '<ul class="cos-single-swap">'+ $self.html() + '</ul>';
				$self.html(Elems);
			},

			notice: function () {
				if (settings.notice) {
					$self.addClass('notice');
					$self.prepend('<div class="cos-single-notice"><i></i></div>');
				}
			},

			close: function () {
				if (settings.close) {
					var $closeElem = $('<div class="cos-single-close"><i></i></div>');
					$closeElem.click(function () {
						$self.remove();
					})
					$self.addClass('close');
					$self.append($closeElem);
				}
			},

			ellipsis: function () {
				if (settings.ellipsis) {
					$self.find('.cos-single-swap').addClass('ellipsis');
				}
			},

			rolling: function () {
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
				this.notice();
				this.close();
				this.ellipsis();
				this.rolling();
			}

		}

		ret.init();
	}
});