/**
 * input - NvUI
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

		$.each(cc, function(){
			var $this  = $(this);
			var data =  parseData($this);
			var type = data["type"] || 'text';

			$.fn.input.methods['_init' + type]($this, data);			
		});
	};

	$.fn.input = function(options, param) {
		if (typeof options == 'string') {
			return $.fn.input.methods[options](this, param);
		}

		init(this);
	};

	$.fn.input.methods = {
		_inittext: function(container, data) {

		},
		_initdate: function(container, data) {
			container.datepicker({
				onSelect: function(dateText, inst) {
					container.trigger("selectDate", [dateText]);
				}
			}).datepicker("setDate", new Date());
		}
	};
})(jQuery);