/**
 * ztreeWrapper - NvUI
 *
 * Copyright(c) 2015 lexloo [ lexloo@nv-app.com ]
 *
 */

(function($) {
	function parseData() {
		var r = {};
		var data = cc.attr('data') || '';
		
		$.each(data.split(";"), function() {
			var item = this.split(":");

			r[$.trim(item[0])] = $.trim(item[1]);
		});

		return r;
	};

	function init(container) {
		var cc = $(container);

		cc.addClass("ztree");
		var data = parseData();
		var url = $.contextPath() + data["url"];
		var setting = {
			check: {
				enable: true,
				chkboxType: {
					"Y": "ps",
					"N": "ps"
				}
			},
			async: {
				enable: true,
				contentType: "application/json",
				url: url
			},
			callback: {
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

		$.fn.zTree.init(cc, setting, null);
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