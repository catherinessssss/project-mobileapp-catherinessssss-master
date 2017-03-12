// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var interestedProperties = args.interestedProperties;

Alloy.Collections.cm_property.fetch();

function dataFilter1(collection) {
	return collection.filter(function(model) {
		for(var interested in interestedProperties) {
			if(interestedProperties[interested].id == model.id) {
				return model;
			}
		}
	});
}


function itemClicked1(e) {
	var detailModel = Alloy.Collections.cm_property.get(Number(e.itemId));
	
	var propertyDetailController = Alloy.createController('propertyDetail', {
		$model : detailModel,
		propertyId: e.itemId
	});
	
	Alloy.Globals.tabGroup.activeTab.open(propertyDetailController.getView());
}

$.interested.addEventListener("close", function() {
	$.destroy();
});