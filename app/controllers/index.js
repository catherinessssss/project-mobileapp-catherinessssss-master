$.index.open();
$.username.text = Alloy.Globals.user ? Alloy.Globals.user.username : 'Visitor';
Alloy.Globals.tabGroup = $.index;
Alloy.Collections.cm_property.fetch();
Alloy.Collections.estates.fetch();

// transform property data
function transformFunction(model) { 
    var transform = model.toJSON(); 
    
    if (transform.imageUrl == null)
        transform.imageUrl = "http://static.apple.nextmedia.com/images/apple-photos/640pix/20030903/Article_fin/03bc351p.jpg";     // a default picture

    return transform; 
}

// go to detail page
function goDetail(e) {
	var detailModel = Alloy.Collections.cm_property.get(e.row.propertyId);
	
	var propertyDetailController = Alloy.createController('propertyDetail', {
		$model : detailModel,
		propertyId: e.row.propertyId
	});
	
	Alloy.Globals.tabGroup.activeTab.open(propertyDetailController.getView());
}


// Property filter by price and bedrooms
function filterByPrice(e) {
	
	var price= "lower",
		number = 2;
	// sectionIndex == 0 lower, sectionIndex==1 higher
	// itemIndex == 0 , 2 bedrooms, itemIndex == 1, 3 bedrooms
	if(e.sectionIndex == 0) {
		price = "lower";
		if(e.itemIndex == 0) {
			number = 2;
		} else {
			number = 3;
		}
	} else {
		price = "higher";
		if(e.itemIndex == 0) {
			number = 2;
		} else {
			number = 3;
		}
	}

	var itemsListController = Alloy.createController('itemsList', {
		price: price,
		number: number
	});

	Alloy.Globals.tabGroup.activeTab.open(itemsListController.getView());
}


// transform map data
function mapTransform(model) {
	var transform = model.toJSON();
	
	transform.title = transform.Name;
	transform.subtitle = transform.ChineseName;
	transform.rightButton = Titanium.UI.iPhone.SystemButton.DISCLOSURE;
	
	return transform;
}

var lastDistrict = "";
function addressTransform(model) {
	var transform = model.toJSON();
	
	var district = transform.District;
	if(district != lastDistrict) {
		transform.section = district;
		lastDistrict = district;
	} else {
		transform.section = "";
	}
	
	return transform;
}

function addressClicked(e) {
	var estateName = e.source.estateName;

	if(estateName == "Festival City" || estateName == "Tin Ma Court" || estateName == "City One Shatin") {
		var addressListController = Alloy.createController('addressList', {
			estate :estateName
		});
		
		Alloy.Globals.tabGroup.activeTab.open(addressListController.getView());
	} else {
		return alert("Cannot find any properties at this location");
	}
	
	
}

$.index.addEventListener("close", function() {
	$.destroy();
});

function mapClicked(e) {
	var title = e.annotation.title;
	
	if(e.clicksource == "rightButton") {
		if(title == 'Festival City' || title == "City One Shatin" || title == "Tin Ma Court") {
			var addressListController = Alloy.createController('addressList', {
				estate : title
			});
			
			Alloy.Globals.tabGroup.activeTab.open(addressListController.getView());
		} else {
			return alert("Cannot find any properties at this location");
		}
	}
}

function personItemsClicked(e) {
	if(e.itemId == 'login') {
		// logout
		if(Alloy.Globals.user) {
			Alloy.Globals.user = null;
			$.username.text = 'Visitor';
			alert("Logout sucessfully");
		} 
		//login
		else {
			var loginController = Alloy.createController('login');
			Alloy.Globals.tabGroup.activeTab.open(loginController.getView());
		}
	} else if(e.itemId =='interested') {
		if(!Alloy.Globals.user) {
			return alert("Please log in first");
		}
		
		var xhrInterested = Ti.Network.createHTTPClient({
			onload: function(e) {
				var interestedProperties = JSON.parse(this.responseData);
				var interestedController = Alloy.createController('interestedProperties', {
					interestedProperties : interestedProperties
				});
				Alloy.Globals.tabGroup.activeTab.open(interestedController.getView());
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
	}
}
