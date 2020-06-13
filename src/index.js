var express = require("express");
var Validator = require("jsonschema").Validator;

const app = express();
app.use(express.json());

function validate(data) {
	var v = new Validator();
	var schema = {
		"id": "/Timeentry",
		"type": "object",
		"properties": {
			"name": { "type": "number"},
			"mode": { "type": "string"},
			"time": { "type": "number"}
		}
	};
	var result = v.validate(data, schema);

	if (result.valid) {
		return true;
	} else {
		return result;
	}
}

app.post("/", (req, res) => {
	req.body;
	console.log(req.body);
	var validation = validate(req.body);
	if (validation == true) {
		return res.json(validation);
	} else {
		return res.json(validation.errors);
	}
});

app.listen(8000, () => console.log(`Example app listening on port 8000`));
