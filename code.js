(function(window, undefined){

	var _placeholderInsert_Replace = "";

	var _placeholderRemove = "[\r\n\
{\r\n\
	\"InternalId\" : \"\"\r\n\
}\r\n\
]";

	var _placeholderGetAll = "";

	String.prototype.replaceAll = function(search, replacement) {
		var target = this;
		return target.replace(new RegExp(search, 'g'), replacement);
	};

    window.Asc.plugin.init = function(text)
    {
		document.getElementById("textareaIR").value = _placeholderInsert_Replace;
		document.getElementById("textareaR").value = _placeholderRemove;
		document.getElementById("textareaG").value = _placeholderGetAll;

    	document.getElementById("buttonIDInsertAndContext").onclick = function() {

    		var _val = document.getElementById("textareaIR").value;
			_val = _val.replaceAll("\r\n", "");
			_val = _val.replaceAll("\n", "");
			var _obj = JSON.parse(_val);
			window.Asc.plugin.executeMethod("InsertAndReplaceContentControls", [_obj]);

		};
		document.getElementById("buttonIDRemove").onclick = function() {

			var _val = document.getElementById("textareaR").value;
			_val = _val.replaceAll("\r\n", "");
			_val = _val.replaceAll("\n", "");
			var _obj = JSON.parse(_val);
			window.Asc.plugin.executeMethod("RemoveContentControls", [_obj]);

		};
		document.getElementById("buttonIDGetAll").onclick = function() {

			window.Asc.plugin.executeMethod("GetAllContentControls");

		};
		document.getElementById("buttonIDChangeState").onclick = function() {

			window.buttonIDChangeState_click = true;
			window.Asc.plugin.executeMethod("GetCurrentContentControl");

		};
		document.getElementById("buttonIDCurrent").onclick = function() {

			window.Asc.plugin.executeMethod("GetCurrentContentControl");

		};
    };

    window.Asc.plugin.button = function(id)
    {
		this.executeCommand("close", "");
    };

	window.Asc.plugin.onMethodReturn = function(returnValue)
	{
		var _plugin = window.Asc.plugin;
		if (_plugin.info.methodName == "GetAllContentControls")
		{
			document.getElementById("textareaG").value = "";

			var _val = JSON.stringify(returnValue);
			_val = _val.split("[").join("[\r\n");
			_val = _val.split(",").join(",\r\n");
			_val = _val.split("]").join("\r\n]");

			document.getElementById("textareaG").value = _val;
		}
		else if (window.buttonIDChangeState_click)
		{
			window.buttonIDChangeState_click = undefined;
			if (null == returnValue)
			{
				window.Asc.plugin.executeMethod("AddContentControl", [1/*1 - block, 2 - inline*/, {"Id" : 7/*own id*/, "Lock" : 0, "Tag" : "{some text}"}]);
			}
			else
			{
				window.Asc.plugin.executeMethod("RemoveContentControl", [returnValue]);
			}
		}
		else
		{
			console.log(returnValue);
		}
	};

})(window, undefined);
