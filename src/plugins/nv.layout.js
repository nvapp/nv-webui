/**
 * layout - NvUI
 *
 * Copyright(c) 2015 lexloo [ lexloo@nv-app.com ]
 *
 */

(function($) {
	function init(container, opts) {
		var cc = $(container);

		var north = $(opts["north"]) || $(">div[region='north'", cc);
		var south = $(opts["south"]) || $(">div[region='south'", cc);
		var east = $(opts["east"]) || $(">div[region='east'", cc);
		var west = $(opts["west"]) || $(">div[region='west'", cc);
		var center = $(opts["center"]) || $(">div[region='center'", cc);
		var northProxy;
		var southProxy;
		var eastProxy;
		var westProxy;
		var cenerProxy;

		if (north.length) {
			northProxy = $("<div/>").addClass("nv-layout-north-proxy").append(north).appendTo(cc);
		}

		if (west.length) {
			westProxy = $("<div/>").addClass("nv-layout-west-proxy").css({
				float: "left"
			}).append(west).appendTo(cc);
		}

		if (east.length) {
			eastProxy = $("<div/>").addClass("nv-layout-east-proxy").css({
				float: "right"
			}).append(east).appendTo(cc);
		}

		if (center.length) {
			centerProxy = $("<div/>").addClass("nv-layout-center-proxy").append(center).appendTo(cc);
		}

		if (south.length) {
			southProxy = $("<div/>").addClass("nv-layout-south-proxy").append(south).appendTo(cc);
		}

		var resizeFn = function() {
			var np = $(">div.nv-layout-north-proxy", cc);
			var sp = $(">div.nv-layout-south-proxy", cc);
			var ep = $(">div.nv-layout-east-proxy", cc);
			var wp = $(">div.nv-layout-west-proxy", cc);
			var cp = $(">div.nv-layout-center-proxy", cc);

			var h = cc.height() - (np.height() || 0) - (sp.height() || 0);
			cp.css({
				marginLeft: wp.width(),
				marginRight: ep.width()
			});

			$([wp, cp, ep]).each(function() {
				this.height(h);
			});
		};

		$(document).on("ui_loaded", function() {
			$(window).resize(resizeFn).resize();
		});
	};

	$.fn.layout = function(options, param) {
		if (typeof options == "string") {
			return $.fn.layout.methods[options](this, param);
		}

		$.each(this, function() {
			init(this);
		});
	};

	$.fn.layout.methods = {
		layout: function(jq, param) {
			return jq.each(function(){
				init(this, param);
			});
		}
	};
})(jQuery);