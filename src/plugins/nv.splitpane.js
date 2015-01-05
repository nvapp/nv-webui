/**
 * splitPane - NvUI
 *
 * Copyright(c) 2014 lexloo [ lexloo@nv-app.com ]
 *
 */

(function($) {
	function parseData(data) {
		var r = {};

		$.each(data.split(";"), function() {
			var item = this.split(":");

			r[$.trim(item[0])] = $.trim(item[1]);
		});

		return r;
	};

	function init(container) {
		var cc = $(container);

		cc.css({
			margin: 0,
			padding: 0,
			height: '100%',
			width: '100%'
		});

		var data = parseData(cc.attr('data') || '');
		cc.data('data', data);

		cc.children().height('100%');
		var left = cc.children().eq(0);
		var right = cc.children().eq(1);
		var sizeRegion = data["sizeRegion"];
		var sizeValue = parseInt(data["sizeValue"] || '200');
		switch (sizeRegion) {
			case 'left':
				left.css({
					float: 'left'
				});
				left.width(sizeValue);
				right.css({
					marginLeft: sizeValue + 'px'
				});
				break;
			case 'right':
				right.insertBefore(left);
				right.css({
					float: 'right'
				});
				right.width(sizeValue);
				left.css({
					marginRight: sizeValue + 'px'
				});
				break;
		}
	};

	$.fn.splitpane = function(options, param) {
		if (typeof options == 'string') {
			return $.fn.splitpane.methods[options](this, param);
		}

		init(this);
	};

	$.fn.splitpane.methods = {

	};
})(jQuery);