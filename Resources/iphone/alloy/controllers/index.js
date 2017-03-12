function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId31(e) {
        if (e && e.fromAdapter) return;
        __alloyId31.opts || {};
        var models = __alloyId30.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId19 = models[i];
            __alloyId19.__transform = transformFunction(__alloyId19);
            var __alloyId21 = Ti.UI.createTableViewRow({
                width: Titanium.UI.SIZE,
                height: "300",
                layout: "vertical",
                propertyId: __alloyId19.__transform.id
            });
            rows.push(__alloyId21);
            goDetail ? $.addListener(__alloyId21, "click", goDetail) : __defers["__alloyId21!click!goDetail"] = true;
            var __alloyId23 = Ti.UI.createView({
                top: "10",
                bottom: "10",
                layout: "vertical",
                borderColor: "gray",
                borderRadius: "10",
                borderWidth: "1"
            });
            __alloyId21.add(__alloyId23);
            var __alloyId25 = Ti.UI.createImageView({
                height: "180",
                top: "10",
                left: "10",
                right: "10",
                image: __alloyId19.__transform.imageUrl
            });
            __alloyId23.add(__alloyId25);
            var __alloyId27 = Ti.UI.createLabel({
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                color: "#000",
                font: {
                    fontSize: 20,
                    fontFamily: "Helvetica Neue"
                },
                textAlign: "center",
                top: "10",
                left: "15",
                text: __alloyId19.__transform.title
            });
            __alloyId23.add(__alloyId27);
            var __alloyId29 = Ti.UI.createTextArea({
                left: "10",
                editable: false,
                scrollable: false,
                value: "Estate:" + __alloyId19.__transform.estate + " \nRent: " + __alloyId19.__transform.rent + " \nGross Area: " + __alloyId19.__transform.grossArea
            });
            __alloyId23.add(__alloyId29);
        }
        $.__views.__alloyId18.setData(rows);
    }
    function __alloyId61(e) {
        if (e && e.fromAdapter) return;
        __alloyId61.opts || {};
        var models = __alloyId60.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId55 = models[i];
            __alloyId55.__transform = addressTransform(__alloyId55);
            var __alloyId59 = Ti.UI.createTableViewSection({
                headerTitle: __alloyId55.__transform.section
            });
            rows.push(__alloyId59);
            var __alloyId58 = Ti.UI.createTableViewRow({
                width: Titanium.UI.SIZE,
                height: Titanium.UI.FILL,
                left: "10dp",
                estateName: __alloyId55.__transform.Name,
                title: __alloyId55.__transform.Name
            });
            __alloyId59.add(__alloyId58);
            addressClicked ? $.addListener(__alloyId58, "click", addressClicked) : __defers["__alloyId58!click!addressClicked"] = true;
        }
        $.__views.__alloyId54.setData(rows);
    }
    function __alloyId68(e) {
        if (e && e.fromAdapter) return;
        __alloyId68.opts || {};
        var models = __alloyId67.models;
        var len = models.length;
        for (var i = 0; len > i; i++) {
            var __alloyId66 = models[i];
            __alloyId65.push(require("ti.map").createAnnotation(mapTransform(__alloyId66)));
        }
        $.__views.__alloyId64.annotations = __alloyId65;
    }
    function transformFunction(model) {
        var transform = model.toJSON();
        null == transform.imageUrl && (transform.imageUrl = "http://static.apple.nextmedia.com/images/apple-photos/640pix/20030903/Article_fin/03bc351p.jpg");
        return transform;
    }
    function goDetail(e) {
        var detailModel = Alloy.Collections.cm_property.get(e.row.propertyId);
        var propertyDetailController = Alloy.createController("propertyDetail", {
            $model: detailModel,
            propertyId: e.row.propertyId
        });
        Alloy.Globals.tabGroup.activeTab.open(propertyDetailController.getView());
    }
    function filterByPrice(e) {
        var price = "lower", number = 2;
        if (0 == e.sectionIndex) {
            price = "lower";
            number = 0 == e.itemIndex ? 2 : 3;
        } else {
            price = "higher";
            number = 0 == e.itemIndex ? 2 : 3;
        }
        var itemsListController = Alloy.createController("itemsList", {
            price: price,
            number: number
        });
        Alloy.Globals.tabGroup.activeTab.open(itemsListController.getView());
    }
    function mapTransform(model) {
        var transform = model.toJSON();
        transform.title = transform.Name;
        transform.subtitle = transform.ChineseName;
        transform.rightButton = Titanium.UI.iPhone.SystemButton.DISCLOSURE;
        return transform;
    }
    function addressTransform(model) {
        var transform = model.toJSON();
        var district = transform.District;
        if (district != lastDistrict) {
            transform.section = district;
            lastDistrict = district;
        } else transform.section = "";
        return transform;
    }
    function addressClicked(e) {
        var estateName = e.source.estateName;
        if ("Festival City" != estateName && "Tin Ma Court" != estateName && "City One Shatin" != estateName) return alert("Cannot find any properties at this location");
        var addressListController = Alloy.createController("addressList", {
            estate: estateName
        });
        Alloy.Globals.tabGroup.activeTab.open(addressListController.getView());
    }
    function mapClicked(e) {
        var title = e.annotation.title;
        if ("rightButton" == e.clicksource) {
            if ("Festival City" != title && "City One Shatin" != title && "Tin Ma Court" != title) return alert("Cannot find any properties at this location");
            var addressListController = Alloy.createController("addressList", {
                estate: title
            });
            Alloy.Globals.tabGroup.activeTab.open(addressListController.getView());
        }
    }
    function personItemsClicked(e) {
        if ("login" == e.itemId) if (Alloy.Globals.user) {
            Alloy.Globals.user = null;
            $.username.text = "Visitor";
            alert("Logout sucessfully");
        } else {
            var loginController = Alloy.createController("login");
            Alloy.Globals.tabGroup.activeTab.open(loginController.getView());
        } else if ("interested" == e.itemId) {
            if (!Alloy.Globals.user) return alert("Please log in first");
            var xhrInterested = Ti.Network.createHTTPClient({
                onload: function() {
                    var interestedProperties = JSON.parse(this.responseData);
                    var interestedController = Alloy.createController("interestedProperties", {
                        interestedProperties: interestedProperties
                    });
                    Alloy.Globals.tabGroup.activeTab.open(interestedController.getView());
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
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    Alloy.Collections.instance("estates");
    var __alloyId15 = [];
    $.__views.__alloyId17 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "10dp",
        bottom: "10dp",
        left: "10dp",
        right: "10dp",
        title: "Property",
        id: "__alloyId17"
    });
    $.__views.__alloyId18 = Ti.UI.createTableView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId18"
    });
    $.__views.__alloyId17.add($.__views.__alloyId18);
    var __alloyId30 = Alloy.Collections["cm_property"] || cm_property;
    __alloyId30.on("fetch destroy change add remove reset", __alloyId31);
    $.__views.__alloyId16 = Ti.UI.createTab({
        window: $.__views.__alloyId17,
        title: "Home",
        icon: "KS_nav_home.png",
        id: "__alloyId16"
    });
    __alloyId15.push($.__views.__alloyId16);
    $.__views.__alloyId33 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "10dp",
        bottom: "10dp",
        left: "10dp",
        right: "10dp",
        title: "Price",
        id: "__alloyId33"
    });
    $.__views.__alloyId38 = Ti.UI.createView({
        top: "10",
        bottom: "10",
        layout: "vertical",
        borderColor: "gray",
        borderRadius: "10",
        borderWidth: "1",
        backgroundColor: "#2a6496",
        height: "30dp",
        id: "__alloyId38"
    });
    $.__views.__alloyId39 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "$15000-",
        id: "__alloyId39"
    });
    $.__views.__alloyId38.add($.__views.__alloyId39);
    var __alloyId40 = [];
    $.__views.__alloyId41 = {
        properties: {
            height: Titanium.UI.SIZE,
            image: "images/bedroom.png",
            title: "2 bedrooms-",
            id: "__alloyId41"
        }
    };
    __alloyId40.push($.__views.__alloyId41);
    $.__views.__alloyId42 = {
        properties: {
            height: Titanium.UI.SIZE,
            image: "images/bedroom.png",
            title: "3 bedrooms+",
            id: "__alloyId42"
        }
    };
    __alloyId40.push($.__views.__alloyId42);
    $.__views.__alloyId35 = Ti.UI.createListSection({
        headerView: $.__views.__alloyId38,
        id: "__alloyId35"
    });
    $.__views.__alloyId35.items = __alloyId40;
    var __alloyId43 = [];
    __alloyId43.push($.__views.__alloyId35);
    $.__views.__alloyId47 = Ti.UI.createView({
        top: "10",
        bottom: "10",
        layout: "vertical",
        borderColor: "gray",
        borderRadius: "10",
        borderWidth: "1",
        backgroundColor: "#2a6496",
        height: "30dp",
        id: "__alloyId47"
    });
    $.__views.__alloyId48 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "$15000-",
        id: "__alloyId48"
    });
    $.__views.__alloyId47.add($.__views.__alloyId48);
    var __alloyId49 = [];
    $.__views.__alloyId50 = {
        properties: {
            height: Titanium.UI.SIZE,
            image: "images/bedroom.png",
            title: "2 bedrooms-",
            id: "__alloyId50"
        }
    };
    __alloyId49.push($.__views.__alloyId50);
    $.__views.__alloyId51 = {
        properties: {
            height: Titanium.UI.SIZE,
            image: "images/bedroom.png",
            title: "3 bedrooms+",
            id: "__alloyId51"
        }
    };
    __alloyId49.push($.__views.__alloyId51);
    $.__views.__alloyId44 = Ti.UI.createListSection({
        headerView: $.__views.__alloyId47,
        id: "__alloyId44"
    });
    $.__views.__alloyId44.items = __alloyId49;
    __alloyId43.push($.__views.__alloyId44);
    $.__views.__alloyId34 = Ti.UI.createListView({
        height: Titanium.UI.FILL,
        sections: __alloyId43,
        id: "__alloyId34"
    });
    $.__views.__alloyId33.add($.__views.__alloyId34);
    filterByPrice ? $.addListener($.__views.__alloyId34, "itemclick", filterByPrice) : __defers["$.__views.__alloyId34!itemclick!filterByPrice"] = true;
    $.__views.__alloyId32 = Ti.UI.createTab({
        window: $.__views.__alloyId33,
        title: "Price",
        icon: "KS_nav_price.png",
        id: "__alloyId32"
    });
    __alloyId15.push($.__views.__alloyId32);
    $.__views.__alloyId53 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "10dp",
        bottom: "10dp",
        left: "10dp",
        right: "10dp",
        title: "Address",
        id: "__alloyId53"
    });
    $.__views.__alloyId54 = Ti.UI.createTableView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId54"
    });
    $.__views.__alloyId53.add($.__views.__alloyId54);
    var __alloyId60 = Alloy.Collections["estates"] || estates;
    __alloyId60.on("fetch destroy change add remove reset", __alloyId61);
    $.__views.__alloyId52 = Ti.UI.createTab({
        window: $.__views.__alloyId53,
        title: "Address",
        icon: "KS_nav_house.png",
        id: "__alloyId52"
    });
    __alloyId15.push($.__views.__alloyId52);
    $.__views.__alloyId63 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "10dp",
        bottom: "10dp",
        left: "10dp",
        right: "10dp",
        navBarHidden: true,
        title: "Map",
        id: "__alloyId63"
    });
    var __alloyId65 = [];
    $.__views.__alloyId64 = (require("ti.map").createView || Ti.UI.createView)({
        top: "10",
        bottom: "10",
        layout: "vertical",
        borderColor: "gray",
        borderRadius: "10",
        borderWidth: "1",
        annotations: __alloyId65,
        userLocation: true,
        id: "__alloyId64"
    });
    $.__views.__alloyId63.add($.__views.__alloyId64);
    var __alloyId67 = Alloy.Collections["estates"] || estates;
    __alloyId67.on("fetch destroy change add remove reset", __alloyId68);
    mapClicked ? $.addListener($.__views.__alloyId64, "click", mapClicked) : __defers["$.__views.__alloyId64!click!mapClicked"] = true;
    $.__views.__alloyId62 = Ti.UI.createTab({
        window: $.__views.__alloyId63,
        title: "Map",
        icon: "KS_nav_map.png",
        id: "__alloyId62"
    });
    __alloyId15.push($.__views.__alloyId62);
    $.__views.__alloyId70 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "10dp",
        bottom: "10dp",
        left: "10dp",
        right: "10dp",
        title: "Personal",
        id: "__alloyId70"
    });
    $.__views.__alloyId75 = Ti.UI.createView({
        top: "10",
        bottom: "10",
        layout: "horizontal",
        borderColor: "gray",
        borderRadius: "10",
        borderWidth: "1",
        height: "120dp",
        id: "__alloyId75"
    });
    $.__views.__alloyId76 = Ti.UI.createImageView({
        height: "100dp",
        top: "10",
        left: "10dp",
        right: "10",
        width: Titanium.UI.SIZE,
        image: "images/person_photo.png",
        id: "__alloyId76"
    });
    $.__views.__alloyId75.add($.__views.__alloyId76);
    $.__views.username = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        left: "10dp",
        id: "username"
    });
    $.__views.__alloyId75.add($.__views.username);
    var __alloyId77 = [];
    $.__views.__alloyId78 = {
        properties: {
            height: Titanium.UI.SIZE,
            title: "Logoff/Login",
            itemId: "login",
            id: "__alloyId78"
        }
    };
    __alloyId77.push($.__views.__alloyId78);
    $.__views.__alloyId79 = {
        properties: {
            height: Titanium.UI.SIZE,
            title: "Interested Property",
            itemId: "interested",
            id: "__alloyId79"
        }
    };
    __alloyId77.push($.__views.__alloyId79);
    $.__views.__alloyId80 = {
        properties: {
            height: Titanium.UI.SIZE,
            title: "About Us",
            id: "__alloyId80"
        }
    };
    __alloyId77.push($.__views.__alloyId80);
    $.__views.__alloyId72 = Ti.UI.createListSection({
        headerView: $.__views.__alloyId75,
        id: "__alloyId72"
    });
    $.__views.__alloyId72.items = __alloyId77;
    var __alloyId81 = [];
    __alloyId81.push($.__views.__alloyId72);
    $.__views.__alloyId71 = Ti.UI.createListView({
        height: Titanium.UI.FILL,
        sections: __alloyId81,
        id: "__alloyId71"
    });
    $.__views.__alloyId70.add($.__views.__alloyId71);
    personItemsClicked ? $.addListener($.__views.__alloyId71, "itemclick", personItemsClicked) : __defers["$.__views.__alloyId71!itemclick!personItemsClicked"] = true;
    $.__views.__alloyId69 = Ti.UI.createTab({
        window: $.__views.__alloyId70,
        title: "Personal",
        icon: "KS_nav_person.png",
        id: "__alloyId69"
    });
    __alloyId15.push($.__views.__alloyId69);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId15,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {
        __alloyId30 && __alloyId30.off("fetch destroy change add remove reset", __alloyId31);
        __alloyId60 && __alloyId60.off("fetch destroy change add remove reset", __alloyId61);
        __alloyId67 && __alloyId67.off("fetch destroy change add remove reset", __alloyId68);
    };
    _.extend($, $.__views);
    $.index.open();
    $.username.text = Alloy.Globals.user ? Alloy.Globals.user.username : "Visitor";
    Alloy.Globals.tabGroup = $.index;
    Alloy.Collections.cm_property.fetch();
    Alloy.Collections.estates.fetch();
    var lastDistrict = "";
    $.index.addEventListener("close", function() {
        $.destroy();
    });
    __defers["__alloyId21!click!goDetail"] && $.addListener(__alloyId21, "click", goDetail);
    __defers["$.__views.__alloyId34!itemclick!filterByPrice"] && $.addListener($.__views.__alloyId34, "itemclick", filterByPrice);
    __defers["__alloyId58!click!addressClicked"] && $.addListener(__alloyId58, "click", addressClicked);
    __defers["$.__views.__alloyId64!click!mapClicked"] && $.addListener($.__views.__alloyId64, "click", mapClicked);
    __defers["$.__views.__alloyId71!itemclick!personItemsClicked"] && $.addListener($.__views.__alloyId71, "itemclick", personItemsClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;