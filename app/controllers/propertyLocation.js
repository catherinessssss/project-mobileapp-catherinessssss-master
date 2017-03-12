// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var estateName = args.estate;

Alloy.Collections.estates.fetch();

function mapTransform(model){
	var transform = model.toJSON();
	
	transform.title = transform.Name;
	transform.subtitle = transform.ChineseName;
	
	return transform;
}

function filterFunction(collection) {
	return collection.where({Name:estateName});
}

$.location.addEventListener("close", function(){ 
    $.destroy();
});
