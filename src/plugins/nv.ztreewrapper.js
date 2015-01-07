/**
 * ztreeWrapper - NvUI
 *
 * Copyright(c) 2015 lexloo [ lexloo@nv-app.com ]
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

	function onCheck(event, treeId, treeNode) {
		var treeObj = $.fn.zTree.getZTreeObj(treeId);
		var nodes = treeObj.getCheckedNodes(true);
		var is = [];

		$.each(nodes, function() {
			var id = this["id"];
			if (id > 0 && is.indexOf(id) < 0) {
				is.push(id);
			}
		});

		$(document).trigger("select_ids", [is]);
	};

	function onClick(event, treeId, treeNode) {
		$(document).trigger("select_id", [treeNode["id"]]);
	};

	function init(container) {
		var cc = $(container);

		var search = $("<div class='nv-input-search'/>").appendTo(cc);
		var treeDiv = $("<div/>").appendTo(cc);

		treeDiv.addClass("ztree");
		var data = parseData(cc);
		var url = $.contextPath() + data["url"];
		var setting = {
			async: {
				enable: true,
				contentType: "application/json",
				url: url
			},
			callback: {
				onCheck: onCheck,
				onClick: onClick,
				onAsyncSuccess: function(event, treeId, treeNode, msg) {
					/*var treeObj = $.fn.zTree.getZTreeObj($this.attr('id'));*/
					/*treeObj.expandAll(true);*/
				}
			},
			data: {
				simpleData: {
					enable: true,
					idKey: 'id',
					pIdKey: 'pid'
				}
			}
		};

		if (data["check"]) {
			setting["check"] = {
				enable: true,
				chkboxType: {
					"Y": "ps",
					"N": "ps"
				}
			}
		}

		$.fn.zTree.init(treeDiv, setting, null);

		initSearch(search, {});
		cc.layout("layout", {
			north: search,
			center: treeDiv
		});
	};

	function initSearch(query, opts) {
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

		var resizeFn = function() {
			input.width(query.width() - 52);
		};

		$(document).on("ui_loaded", function() {
			$(window).resize(resizeFn).resize();
		});
	};

	$.fn.ztreewrapper = function(options, param) {
		if (typeof options == 'string') {
			return $.fn.ztreewrapper.methods[options](this, param);
		}

		init(this);
	};

	$.fn.ztreewrapper.methods = {

	};
})(jQuery);