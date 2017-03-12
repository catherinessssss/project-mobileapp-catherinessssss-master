function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function toMap(e) {
        var propertyLocationController = Alloy.createController("propertyLocation", {
            estate: e.source.estate
        });
        Alloy.Globals.tabGroup.activeTab.open(propertyLocationController.getView());
    }
    function declareLike(e) {
        if (0 == e.index) if (Alloy.Globals.user) {
            var xhrInterested = Ti.Network.createHTTPClient({
                onload: function() {
                    var interestedProperties = JSON.parse(this.responseData), url = "http://localhost:1337/member/declareInterested/" + propertyId;
                    for (var property in interestedProperties) if (interestedProperties[property].id == propertyId) {
                        url = "http://localhost:1337/member/declareUninterested/" + propertyId;
                        break;
                    }
                    var xhr = Ti.Network.createHTTPClient({
                        onload: function() {
                            alert(this.responseText);
                        },
                        onerror: function(e) {
                            Ti.API.debug(e.error);
                            alert("error2");
                        },
                        timeout: 5e3
                    });
                    xhr.open("GET", url);
                    xhr.send();
                },
                onerror: function(e) {
                    Ti.API.debug(e.error);
                    alert("error1");
                },
                timeout: 5e3
            });
            var xhrInterestedUrl = "http://localhost:1337/member/myIntPropertiesJSON/" + Alloy.Globals.user.id;
            xhrInterested.open("GET", xhrInterestedUrl);
            xhrInterested.send();
        } else alert("Please log in first.");
    }
    function showDialog() {
        $.dialog.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "propertyDetail";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        var $model = __processArg(arguments[0], "$model");
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.detail = Ti.UI.createWindow({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "10dp",
        bottom: "10dp",
        id: "detail"
    });
    $.__views.detail && $.addTopLevelView($.__views.detail);
    $.__views.__alloyId107 = Ti.UI.createButton({
        title: "Like/Unlike",
        id: "__alloyId107"
    });
    showDialog ? $.addListener($.__views.__alloyId107, "click", showDialog) : __defers["$.__views.__alloyId107!click!showDialog"] = true;
    $.__views.detail.rightNavButton = $.__views.__alloyId107;
    var __alloyId109 = [];
    __alloyId109.push("Yes");
    __alloyId109.push("No");
    $.__views.dialog = Ti.UI.createAlertDialog({
        buttonNames: __alloyId109,
        id: "dialog",
        title: "Are you sure?",
        cancel: 1
    });
    declareLike ? $.addListener($.__views.dialog, "click", declareLike) : __defers["$.__views.dialog!click!declareLike"] = true;
    $.__views.__alloyId112 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId112"
    });
    $.__views.detail.add($.__views.__alloyId112);
    $.__views.__alloyId113 = Ti.UI.createImageView({
        left: "10dp",
        right: " 10dp",
        image: $model.__transform.imageUrl,
        id: "__alloyId113"
    });
    $.__views.__alloyId112.add($.__views.__alloyId113);
    $.__views.__alloyId114 = Ti.UI.createLabel({
        top: "10dp",
        left: "10dp",
        font: {
            fontSize: 20
        },
        text: $model.__transform.title,
        id: "__alloyId114"
    });
    $.__views.__alloyId112.add($.__views.__alloyId114);
    $.__views.__alloyId115 = Ti.UI.createTextArea({
        left: "5dp",
        font: {
            fontSize: 16
        },
        editable: false,
        scrollable: false,
        value: "Estate:" + $model.__transform.estate + " \nRent: " + $model.__transform.rent + " \nGross Area: " + $model.__transform.grossArea,
        id: "__alloyId115"
    });
    $.__views.__alloyId112.add($.__views.__alloyId115);
    $.__views.link = Ti.UI.createLabel({
        color: "blue",
        left: "10dp",
        touchEnabled: true,
        estate: $model.__transform.estate,
        id: "link",
        text: "Address"
    });
    $.__views.__alloyId112.add($.__views.link);
    toMap ? $.addListener($.__views.link, "click", toMap) : __defers["$.__views.link!click!toMap"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    var propertyId = args.propertyId;
    var propertyCollection = Alloy.Collections.cm_property;
    var estatesCollection = Alloy.Collections.estates;
    propertyCollection.fetch();
    estatesCollection.fetch();
    $.detail.addEventListener("close", function() {
        $.destroy();
    });
    __defers["$.__views.__alloyId107!click!showDialog"] && $.addListener($.__views.__alloyId107, "click", showDialog);
    __defers["$.__views.dialog!click!declareLike"] && $.addListener($.__views.dialog, "click", declareLike);
    __defers["$.__views.link!click!toMap"] && $.addListener($.__views.link, "click", toMap);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;