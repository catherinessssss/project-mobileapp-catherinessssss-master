// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args,
	number = args.number,
	price = args.price;

Alloy.Collections.cm_property.fetch();

function dataFilter(collection) {
	var resultCollection = collection.filter(function(model) {
		if(price === 'lower') {
			if(number === 2) {
				return model.get("rent") <= 15000 && model.get("bedrooms") <= 2;
			} else {
				return model.get("rent") <= 15000 && model.get("bedrooms") >= 3;
			}
		} else {
			if(number === 2) {
				return model.get("rent") > 15000 && model.get("bedrooms") <= 2;
			} else {
				return model.get("rent") > 15000 && model.get("bedrooms") >= 3;
			}
		}
	});
	return resultCollection;
}

function transformFunction(model) { 
    var transform = model.toJSON(); 
    
    if (transform.imageUrl == null)
        transform.imageUrl = "http://static.apple.nextmedia.com/images/apple-photos/640pix/20030903/Article_fin/03bc351p.jpg";     // a default picture

    return transform; 
}


function itemClicked(e) {

	var detailModel = Alloy.Collections.cm_property.get(Number(e.itemId));
	
	var propertyDetailController = Alloy.createController('propertyDetail', {
		$model : detailModel
	});
	
	Alloy.Globals.tabGroup.activeTab.open(propertyDetailController.getView());
}

$.itemList.addEventListener("close", function(){ 
    $.destroy();
});

