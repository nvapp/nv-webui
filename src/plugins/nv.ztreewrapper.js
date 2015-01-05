/**
 * zTree - NvUI
 *
 * Copyright(c) 2015 lexloo [ lexloo@nv-app.com ]
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
	};

	$.fn.ztree = function(options, param) {
		if (typeof options == 'string') {
			return $.fn.ztree.methods[options](this, param);
		}

		init(this);
	};

	$.fn.ztree.methods = {

	};
})(jQuery);