var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY",
            title: "text",
            estate: "text",
            imageUrl: "url",
            bedrooms: "INTEGER",
            grossArea: "INTEGER",
            expectedTenants: "INTEGER",
            rent: "INTEGER"
        },
        URL: "http://localhost:1337/property/json",
        debug: 1,
        adapter: {
            type: "sqlrest",
            collection_name: "cm_property",
            idAttribute: "id",
            addModifedToUrl: true,
            lastModifiedColumn: "modified"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

model = Alloy.M("cm_property", exports.definition, []);

collection = Alloy.C("cm_property", exports.definition, model);

exports.Model = model;

exports.Collection = collection;