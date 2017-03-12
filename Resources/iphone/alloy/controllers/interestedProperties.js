function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId91(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId91.opts || {};
        var models = dataFilter1(__alloyId90);
        var len = models.length;
        var __alloyId86 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId87 = models[i];
            __alloyId87.__transform = _.isFunction(__alloyId87.transform) ? __alloyId87.transform() : __alloyId87.toJSON();
            var __alloyId89 = {
                properties: {
                    image: __alloyId87.__transform.imageUrl,
                    title: __alloyId87.__transform.title,
                    itemId: __alloyId87.__transform.id
                }
            };
            __alloyId86.push(__alloyId89);
        }
        opts.animation ? $.__views.__alloyId85.setItems(__alloyId86, opts.animation) : $.__views.__alloyId85.setItems(__alloyId86);
    }
    function dataFilter1(collection) {
        return collection.filter(function(model) {
            for (var interested in interestedProperties) if (interestedProperties[interested].id == model.id) return model;
        });
    }
    function itemClicked1(e) {
        var detailModel = Alloy.Collections.cm_property.get(Number(e.itemId));
        var propertyDetailController = Alloy.createController("propertyDetail", {
            $model: detailModel,
            propertyId: e.itemId
        });
        Alloy.Globals.tabGroup.activeTab.open(propertyDetailController.getView());
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "interestedProperties";
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
    $.__views.interested = Ti.UI.createWindow({
        id: "interested",
        title: "Interest Property"
    });
    $.__views.interested && $.addTopLevelView($.__views.interested);
    $.__views.__alloyId85 = Ti.UI.createListSection({
        layout: "vertical",
        id: "__alloyId85"
    });
    var __alloyId90 = Alloy.Collections["cm_property"] || cm_property;
    __alloyId90.on("fetch destroy change add remove reset", __alloyId91);
    var __alloyId92 = [];
    __alloyId92.push($.__views.__alloyId85);
    $.__views.__alloyId84 = Ti.UI.createListView({
        sections: __alloyId92,
        id: "__alloyId84"
    });
    $.__views.interested.add($.__views.__alloyId84);
    itemClicked1 ? $.addListener($.__views.__alloyId84, "itemclick", itemClicked1) : __defers["$.__views.__alloyId84!itemclick!itemClicked1"] = true;
    exports.destroy = function() {
        __alloyId90 && __alloyId90.off("fetch destroy change add remove reset", __alloyId91);
    };
    _.extend($, $.__views);
    var args = $.args;
    var interestedProperties = args.interestedProperties;
    Alloy.Collections.cm_property.fetch();
    $.interested.addEventListener("close", function() {
        $.destroy();
    });
    __defers["$.__views.__alloyId84!itemclick!itemClicked1"] && $.addListener($.__views.__alloyId84, "itemclick", itemClicked1);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;