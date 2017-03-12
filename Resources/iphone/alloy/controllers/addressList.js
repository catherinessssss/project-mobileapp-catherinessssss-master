function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId9(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId9.opts || {};
        var models = dataFilter(__alloyId8);
        var len = models.length;
        var __alloyId4 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId5 = models[i];
            __alloyId5.__transform = transformFunction(__alloyId5);
            var __alloyId7 = {
                properties: {
                    image: __alloyId5.__transform.imageUrl,
                    title: __alloyId5.__transform.title,
                    itemId: __alloyId5.__transform.id
                }
            };
            __alloyId4.push(__alloyId7);
        }
        opts.animation ? $.__views.__alloyId3.setItems(__alloyId4, opts.animation) : $.__views.__alloyId3.setItems(__alloyId4);
    }
    function transformFunction(model) {
        var transform = model.toJSON();
        null == transform.imageUrl && (transform.imageUrl = "http://static.apple.nextmedia.com/images/apple-photos/640pix/20030903/Article_fin/03bc351p.jpg");
        return transform;
    }
    function dataFilter(collection) {
        var resultCollection = collection.filter(function(model) {
            return model.get("estate") == estate;
        });
        return resultCollection;
    }
    function itemClicked(e) {
        var detailModel = Alloy.Collections.cm_property.get(e.itemId);
        var propertyDetailController = Alloy.createController("propertyDetail", {
            $model: detailModel
        });
        Alloy.Globals.tabGroup.activeTab.open(propertyDetailController.getView());
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "addressList";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("cm_property");
    $.__views.address = Ti.UI.createWindow({
        id: "address"
    });
    $.__views.address && $.addTopLevelView($.__views.address);
    $.__views.__alloyId3 = Ti.UI.createListSection({
        layout: "vertical",
        id: "__alloyId3"
    });
    var __alloyId8 = Alloy.Collections["cm_property"] || cm_property;
    __alloyId8.on("fetch destroy change add remove reset", __alloyId9);
    var __alloyId10 = [];
    __alloyId10.push($.__views.__alloyId3);
    $.__views.__alloyId2 = Ti.UI.createListView({
        sections: __alloyId10,
        id: "__alloyId2"
    });
    $.__views.address.add($.__views.__alloyId2);
    itemClicked ? $.addListener($.__views.__alloyId2, "itemclick", itemClicked) : __defers["$.__views.__alloyId2!itemclick!itemClicked"] = true;
    exports.destroy = function() {
        __alloyId8 && __alloyId8.off("fetch destroy change add remove reset", __alloyId9);
    };
    _.extend($, $.__views);
    var args = $.args;
    var estate = args.estate;
    Alloy.Collections.cm_property.fetch();
    $.address.addEventListener("close", function() {
        $.destroy();
    });
    __defers["$.__views.__alloyId2!itemclick!itemClicked"] && $.addListener($.__views.__alloyId2, "itemclick", itemClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;