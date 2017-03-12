// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var estate = args.estate;

Alloy.Collections.cm_property.fetch();

function transformFunction(model) { 
    var transform = model.toJSON(); 
    
    if (transform.imageUrl == null)
        transform.imageUrl = "http://static.apple.nextmedia.com/images/apple-photos/640pix/20030903/Article_fin/03bc351p.jpg";     // a default picture

    return transform; 
}

function dataFilter(collection) {
	var resultCollection = collection.filter(function(model) {
		return model.get('estate') == estate;
	});
	return resultCollection;
}

function itemClicked(e) {

	var detailModel = Alloy.Collections.cm_property.get(e.itemId);
	
	var propertyDetailController = Alloy.createController('propertyDetail', {
		$model : detailModel
	});
	
	Alloy.Globals.tabGroup.activeTab.open(propertyDetailController.getView());
}

$.address.addEventListener("close", function(){ 
    $.destroy();
});
