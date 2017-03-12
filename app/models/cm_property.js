exports.definition = {
	config : {
	    "columns": {
	        "id":"INTEGER PRIMARY KEY",
	        "title":"text", 
	        "estate":"text",
	        "imageUrl":"url",
	        "bedrooms":"INTEGER",
	        "grossArea": "INTEGER",
	        "expectedTenants":"INTEGER",
	        "rent":"INTEGER"
	    },
	    
	    "URL": "http://localhost:1337/property/json", 
	    
	    "debug": 1, //debug mode enabled
	
	    "adapter" : {
	        "type" : "sqlrest",
	        "collection_name" : "cm_property", 
	        "idAttribute" : "id",
	        
	        // optimise the amount of data transfer from remote server to app
	        "addModifedToUrl": true,
	        "lastModifiedColumn": "modified"
	    },
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			// For Backbone v1.1.2, uncomment the following to override the
			// fetch method to account for a breaking change in Backbone.
			/*
			fetch: function(options) {
				options = options ? _.clone(options) : {};
				options.reset = true;
				return Backbone.Collection.prototype.fetch.call(this, options);
			}
			*/
		});

		return Collection;
	}
};