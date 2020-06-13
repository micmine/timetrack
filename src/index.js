const express = require("express");
const Validator = require("jsonschema").Validator;
const mongoose = require('mongoose');

const Validation = require("./controller/Validation").Validation;
require("./model/TimeEntry").TimeEntry;
const TimeEntry = mongoose.model("TimeEntry");

const app = express();
app.use(express.json());

function validate(data) {
	var v = new Validator();
	var schema = {
		"id": "/Timeentry",
		"type": "object",
		"properties": {
			"user": { "type": "number"},
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
	const data = req.body;
	console.log(data);
	var validation = validate(data);
	if (validation == true) {
		const timeEntry = new TimeEntry(data);
		timeEntry.save().then(() => {
			res.status(201);
			res.send("Ok");
		}).catch((err) => {
			console.log(err);
			res.status(409);
			res.send(err);
		});
	} else {
		return res.json(validation.errors);
	}
});

app.listen(8000, () => console.log(`Example app listening on port 8000`));
