function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function login() {
        var user = {
            username: $.username.value,
            password: Titanium.Utils.md5HexDigest($.password.value)
        };
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                var result = JSON.parse(this.responseText);
                if (!result.success) return alert(result.message);
                Alloy.Globals.user = result.data;
                var indexController = Alloy.createController("index");
                Alloy.Globals.tabGroup.setActiveTab(4);
                Alloy.Globals.tabGroup.open(indexController.getView());
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
                alert("error");
            },
            timeout: 5e3
        });
        xhr.open("POST", "http://localhost:1337/member/login");
        xhr.send({
            user: user
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
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
    $.__views.login = Ti.UI.createWindow({
        top: "10",
        left: "10",
        right: "10",
        id: "login"
    });
    $.__views.login && $.addTopLevelView($.__views.login);
    $.__views.__alloyId104 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId104"
    });
    $.__views.login.add($.__views.__alloyId104);
    $.__views.username = Ti.UI.createTextField({
        width: Titanium.UI.FILL,
        height: "40",
        bottom: "10",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        focusable: true,
        hintText: "Username",
        id: "username"
    });
    $.__views.__alloyId104.add($.__views.username);
    $.__views.password = Ti.UI.createTextField({
        width: Titanium.UI.FILL,
        height: "40",
        bottom: "10",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        hintText: "Password",
        passwordMask: true,
        id: "password"
    });
    $.__views.__alloyId104.add($.__views.password);
    $.__views.__alloyId105 = Ti.UI.createButton({
        width: Titanium.UI.FILL,
        height: "40",
        backgroundColor: "#336699",
        color: "#fff",
        borderRadius: "10",
        title: "Login",
        id: "__alloyId105"
    });
    $.__views.__alloyId104.add($.__views.__alloyId105);
    login ? $.addListener($.__views.__alloyId105, "click", login) : __defers["$.__views.__alloyId105!click!login"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    $.login.addEventListener("close", function() {
        $.destroy();
    });
    __defers["$.__views.__alloyId105!click!login"] && $.addListener($.__views.__alloyId105, "click", login);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;