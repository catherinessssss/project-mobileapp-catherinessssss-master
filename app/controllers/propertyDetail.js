// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var propertyId = args.propertyId;

var propertyCollection = Alloy.Collections.cm_property;
var estatesCollection = Alloy.Collections.estates;

propertyCollection.fetch();
estatesCollection.fetch();

$.detail.addEventListener("close", function(){ 
    $.destroy();
});

function toMap(e) {

	var propertyLocationController = Alloy.createController('propertyLocation', {
		estate : e.source.estate
	});
	
	Alloy.Globals.tabGroup.activeTab.open(propertyLocationController.getView());
}

function declareLike(e) {
	//YES
	if(e.index == 0) {
		if(Alloy.Globals.user) {
			var xhrInterested = Ti.Network.createHTTPClient({
				onload: function(e) {

					var interestedProperties = JSON.parse(this.responseData),
						url = "http://localhost:1337/member/declareInterested/"+propertyId;
					
					for(var property in interestedProperties) {

						if(interestedProperties[property].id == propertyId) {
							url = "http://localhost:1337/member/declareUninterested/"+propertyId;
							break;
						}
					}
	
					var xhr = Ti.Network.createHTTPClient({
						onload : function(e) {
							alert(this.responseText);
						},
						// function called when an error occurs, including a timeout
					    onerror : function(e) {
					        Ti.API.debug(e.error);
					        alert('error2');
					    },
					    timeout : 5000  // in milliseconds
					});
					
					xhr.open("GET", url);
					xhr.send();
				},
				onerror : function(e) {
			        Ti.API.debug(e.error);
			        alert('error1');
			    },
			    timeout : 5000  // in milliseconds
			});

			var xhrInterestedUrl = "http://localhost:1337/member/myIntPropertiesJSON/" + Alloy.Globals.user.id;
			xhrInterested.open("GET", xhrInterestedUrl);
			xhrInterested.send();
		} else {
			alert("Please log in first.");
		}
	}
	
}

function showDialog() {
	$.dialog.show();
}
