/**
 * parser - NvUI
 *
 * Copyright(c) 2014 lexloo [ lexloo@nv-app.com ]
 *
 */

(function($) {
	$.parser = {
		auto: true,
		onComplete: function(context) {},
		plugins: ['input', "layout", 'splitpane', 'ztreewrapper', 'listpane'],
		parse: function(context) {
			var aa = [];
			for (var i = 0; i < $.parser.plugins.length; i++) {
				var name = $.parser.plugins[i];
				var r = $('.nv-' + name, context);
				if (r.length) {
					if (r[name]) {
						r[name]();
					} else {
						aa.push({
							name: name,
							jq: r
						});
					}
				}
			}
			if (aa.length && window.loader) {
				var names = [];
				for (var i = 0; i < aa.length; i++) {
					names.push(aa[i].name);
				}
				loader.load(names, function() {
					for (var i = 0; i < aa.length; i++) {
						var name = aa[i].name;
						var jq = aa[i].jq;
						jq[name]();
					}
					$.parser.onComplete.call($.parser, context);
				});
			} else {
				$.parser.onComplete.call($.parser, context);
			}
		}
	};
	$(function() {
		if (!window.loader && $.parser.auto) {
			$.parser.parse();
		}
	});
})(jQuery);