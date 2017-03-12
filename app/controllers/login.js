// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;



function login(e){
	// console.log($.username.value);
	// console.log($.password.value);
	var user = {
		username: $.username.value,
		password: Titanium.Utils.md5HexDigest($.password.value)
	};
	
	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			var result = JSON.parse(this.responseText);

			if(result.success) {

				Alloy.Globals.user = result.data;

				var indexController = Alloy.createController('index');
				Alloy.Globals.tabGroup.setActiveTab(4);
				Alloy.Globals.tabGroup.open(indexController.getView());
				
			} else {
				return alert(result.message);
			}
		},
		// function called when an error occurs, including a timeout
	    onerror : function(e) {
	        Ti.API.debug(e.error);
	        alert('error');
	    },
	    timeout : 5000  // in milliseconds
	});
	
	xhr.open("POST", "http://localhost:1337/member/login");
	xhr.send({
		user: user
	});
	
}

$.login.addEventListener("close", function() {
	$.destroy();
});
