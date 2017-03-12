function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId122(e) {
        if (e && e.fromAdapter) return;
        __alloyId122.opts || {};
        var models = filterFunction(__alloyId121);
        var len = models.length;
        for (var i = 0; len > i; i++) {
            var __alloyId120 = models[i];
            __alloyId119.push(require("ti.map").createAnnotation(mapTransform(__alloyId120)));
        }
        $.__views.__alloyId118.annotations = __alloyId119;
    }
    function mapTransform(model) {
        var transform = model.toJSON();
        transform.title = transform.Name;
        transform.subtitle = transform.ChineseName;
        return transform;
    }
    function filterFunction(collection) {
        return collection.where({
            Name: estateName
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "propertyLocation";
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
    Alloy.Collections.instance("estates");
    $.__views.location = Ti.UI.createWindow({
        title: "Map",
        id: "location"
    });
    $.__views.location && $.addTopLevelView($.__views.location);
    var __alloyId119 = [];
    $.__views.__alloyId118 = (require("ti.map").createView || Ti.UI.createView)({
        annotations: __alloyId119,
        userLocation: true,
        id: "__alloyId118"
    });
    $.__views.location.add($.__views.__alloyId118);
    var __alloyId121 = Alloy.Collections["estates"] || estates;
    __alloyId121.on("fetch destroy change add remove reset", __alloyId122);
    exports.destroy = function() {
        __alloyId121 && __alloyId121.off("fetch destroy change add remove reset", __alloyId122);
    };
    _.extend($, $.__views);
    var args = $.args;
    var estateName = args.estate;
    Alloy.Collections.estates.fetch();
    $.location.addEventListener("close", function() {
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;