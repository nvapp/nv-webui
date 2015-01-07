/**
 * splitPane - NvUI
 *
 * Copyright(c) 2014 lexloo [ lexloo@nv-app.com ]
 *
 */

(function($) {
	function parseData(jq) {
		var r = {};
		var data = jq.attr('data') || '';

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

		var data = parseData(cc);
		cc.data('data', data);

		cc.children().height('100%');
		var left = cc.children().eq(0);
		var right = cc.children().eq(1);
		/** 是否可以改变大小 */
		var resizable = data["resizable"];
		var sizeEl;
		var rbSize = 0;
		var sizeRegion = data["sizeRegion"];
		var sizeValue = parseInt(data["sizeValue"] || '200');
		if (resizable) {
			rbSize += 8;
		}
		switch (sizeRegion) {
			case 'left':
				left.css({
					float: 'left',
					overflow: 'auto'
				});
				left.width(sizeValue);
				right.css({
					marginLeft: (sizeValue + rbSize) + 'px',
					overflow: 'auto'
				});

				if (resizable) {
					sizeEl = $('<div class="splitpane-rbar"><a class="splitpane-rbar-box splitpane-rbar-box-left" title="关闭导航"></a></div>').css({
						float: 'left',
						width: '8px',
						height: '100%'
					}).insertBefore(right).toggle(function() {
						sizeEl.find("a").removeClass("splitpane-rbar-box-left").addClass("splitpane-rbar-box-right");
						left.hide();
						right.css("marginLeft", rbSize + 'px');
					}, function() {
						sizeEl.find("a").removeClass("splitpane-rbar-box-right").addClass("splitpane-rbar-box-left");
						left.show();
						right.css("marginLeft", (sizeValue + rbSize) + 'px');
					});
				}
				break;
			case 'right':
				right.insertBefore(left);
				right.css({
					float: 'right',
					overflow: 'auto'
				});
				right.width(sizeValue);

				if (resizable) {
					sizeEl = $('<div class="splitpane-rbar"><a class="splitpane-rbar-box splitpane-rbar-box-right" title="关闭导航"></a></div>').css({
						float: 'right',
						width: '8px',
						height: '100%'
					}).insertBefore(left).toggle(function() {
						sizeEl.find("a").removeClass("splitpane-rbar-box-right").addClass("splitpane-rbar-box-left");
						right.hide();
						left.css("marginRight", rbSize + 'px');
					}, function() {
						sizeEl.find("a").removeClass("splitpane-rbar-box-left").addClass("splitpane-rbar-box-right");
						right.show();
						left.css("marginRight", (sizeValue + rbSize) + 'px');
					});
				}

				left.css({
					marginRight: (sizeValue + rbSize) + 'px',
					overflow: 'auto'
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