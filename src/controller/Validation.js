var Validator = require("jsonschema").Validator;

module.exports = {
	timeEntry: function (data) {
		var v = new Validator();
		var schema = {
			"id": "/Timeentry",
			"type": "object",
			"properties": {
				"user": { "type": "number"},
				"mode": { "type": "string"},
				"start": { "date": "date" },
				"end": { "date": "date" },
			},
			"required": ["user", "mode", "start", "end"]
		};
		var result = v.validate(data, schema);

		if (result.valid) {
			return true;
		} else {
			return result;
		}
	},

	measure: function (data) {
		var v = new Validator();
		var schema = {
			"id": "/Measure",
			"type": "object",
			"properties": {
				"user": { "type": "number" },
				"mode": { "type": "string" },
			},
			"required": ["user", "mode"]
		};
		var result = v.validate(data, schema);

		if (result.valid) {
			return true;
		} else {
			return result;
		}
	}

}
