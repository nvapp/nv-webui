/**
 * listPane - NvUI
 *
 * Copyright(c) 2015 lexloo [ lexloo@nv-app.com ]
 *
 */

(function($) {
	function parseData(jq) {
		var r = {};
		var data = jq.attr('data') || '';

		$.each(data.split(';'), function() {
			var item = this.split(':');

			r[$.trim(item[0])] = $.trim(item[1]);
		});

		return r;
	};

	function init(container) {
		var cc = $(container);

		var data = parseData(cc);

		var content = $('.nv-listpane-items', cc);
		if (!content.length) {
			content = $('<div class="nv-listpane-items"></div>').appendTo(cc);
		}

		var title = $(".nv-listpane-title", cc);
		if (!title.length) {
			title = $('<div class="nv-listpane-title"></div>').text(data['title']).insertBefore(content);
		}

		var query = $('.nv-listpane-search', cc);
		if (!query.length) {
			query = $('<div class="nv-listpane-search nv-input-search"></div>').insertBefore(content);
		}

		/*初始化Query面板*/
		initQuery(query, data);
		initItems(cc, data);

		var resizeFn = function() {
			content.height(cc.height() - title.height() - query.height() - 2);
		};

		$(document).on("ui_loaded", function() {
			$(window).resize(resizeFn).resize();
		});
	};


	function initQuery(query, opts) {
		var input = $('<input/>').attr('placeHolder', opts['placeHolder'] || '这里输入查询条件');
		var enter = $('<a/>').attr('title', opts['searchTips'] || '点击查询');

		query.append('<span/>').append(input).append(enter);

		var defaultCallback = function(value) {
			if (value == '') {}
		};
		var callback = opts['callback'] || defaultCallback;
		input.keyup(function(event) {
			if (event.keyCode == 13) {
				callback(input.val().trim());
			}
		});
		enter.click(function() {
			callback(input.val());
		});

		var fnResize = function() {
			/*总长度-其它组件(长度+margin+padding)*/
			input.width(query.width() - 52);
		};

		fnResize();
		$(window).resize(fnResize);
	}

	function initItems(container, data) {
		var dataUrl = data['dataUrl'];
	
		container.data("renderFn", window[data["renderFn"]]);

		loadData(container, dataUrl);
	};

	function loadData(container, dataUrl){
		if (dataUrl) {
			var rfn = container.data("renderFn");
			var fn = (function() {			
				if (rfn) {
					return function(req) {
						rfn($(".nv-listpane-items", container), req);
					}
				} else {
					return function() {
						alert("缺少renderFn函数");
					};
				}
			})();

			$.post($.contextPath() + dataUrl, fn, "json");
		}
	};

	$.fn.listpane = function(options, param) {
		if (typeof options == 'string') {
			return $.fn.listpane.methods[options](this, param);
		}

		init(this);
	};

	$.fn.listpane.methods = {
		loadData: function(jq, params) {
			loadData(jq, params['dataUrl']);
		}
	};
})(jQuery);