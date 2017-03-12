function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId102(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId102.opts || {};
        var models = dataFilter(__alloyId101);
        var len = models.length;
        var __alloyId97 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId98 = models[i];
            __alloyId98.__transform = transformFunction(__alloyId98);
            var __alloyId100 = {
                properties: {
                    font: {
                        fontSize: 16
                    },
                    image: __alloyId98.__transform.imageUrl,
                    title: __alloyId98.__transform.title,
                    itemId: __alloyId98.__transform.id
                }
            };
            __alloyId97.push(__alloyId100);
        }
        opts.animation ? $.__views.__alloyId96.setItems(__alloyId97, opts.animation) : $.__views.__alloyId96.setItems(__alloyId97);
    }
    function dataFilter(collection) {
        var resultCollection = collection.filter(function(model) {
            return "lower" === price ? 2 === number ? model.get("rent") <= 15e3 && model.get("bedrooms") <= 2 : model.get("rent") <= 15e3 && model.get("bedrooms") >= 3 : 2 === number ? model.get("rent") > 15e3 && model.get("bedrooms") <= 2 : model.get("rent") > 15e3 && model.get("bedrooms") >= 3;
        });
        return resultCollection;
    }
    function transformFunction(model) {
        var transform = model.toJSON();
        null == transform.imageUrl && (transform.imageUrl = "http://static.apple.nextmedia.com/images/apple-photos/640pix/20030903/Article_fin/03bc351p.jpg");
        return transform;
    }
    function itemClicked(e) {
        var detailModel = Alloy.Collections.cm_property.get(Number(e.itemId));
        var propertyDetailController = Alloy.createController("propertyDetail", {
            $model: detailModel
        });
        Alloy.Globals.tabGroup.activeTab.open(propertyDetailController.getView());
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "itemsList";
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
    $.__views.itemList = Ti.UI.createWindow({
        id: "itemList"
    });
    $.__views.itemList && $.addTopLevelView($.__views.itemList);
    $.__views.__alloyId96 = Ti.UI.createListSection({
        layout: "vertical",
        id: "__alloyId96"
    });
    var __alloyId101 = Alloy.Collections["cm_property"] || cm_property;
    __alloyId101.on("fetch destroy change add remove reset", __alloyId102);
    var __alloyId103 = [];
    __alloyId103.push($.__views.__alloyId96);
    $.__views.__alloyId95 = Ti.UI.createListView({
        sections: __alloyId103,
        id: "__alloyId95"
    });
    $.__views.itemList.add($.__views.__alloyId95);
    itemClicked ? $.addListener($.__views.__alloyId95, "itemclick", itemClicked) : __defers["$.__views.__alloyId95!itemclick!itemClicked"] = true;
    exports.destroy = function() {
        __alloyId101 && __alloyId101.off("fetch destroy change add remove reset", __alloyId102);
    };
    _.extend($, $.__views);
    var args = $.args, number = args.number, price = args.price;
    Alloy.Collections.cm_property.fetch();
    $.itemList.addEventListener("close", function() {
        $.destroy();
    });
    __defers["$.__views.__alloyId95!itemclick!itemClicked"] && $.addListener($.__views.__alloyId95, "itemclick", itemClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;