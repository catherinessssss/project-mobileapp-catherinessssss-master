var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        adapter: {
            type: "sql",
            collection_name: "estates",
            db_file: "/privateEstates.sqlite",
            idAttribute: "Name"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            comparator: function(model) {
                return model.get("District");
            }
        });
        return Collection;
    }
};

model = Alloy.M("estates", exports.definition, []);

collection = Alloy.C("estates", exports.definition, model);

exports.Model = model;

exports.Collection = collection;