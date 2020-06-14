var compression = require('compression');
var express = require("express");

var Validator = require("jsonschema").Validator;
var mongoose = require('mongoose');

require("./model/TimeEntry").TimeEntry;
var TimeEntry = mongoose.model("TimeEntry");

var app = express();
app.use(express.json());
app.use(compression());

function validate_TimeEntry(data) {
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
}

function validate_Masure(data) {
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

app.post("/", (req, res) => {
	req.body;
	const data = req.body;
	console.log(data);
	var validation = validate_TimeEntry(data);
	if (validation == true) {
		const timeEntry = new TimeEntry(data);
		timeEntry.save().then(() => {
			res.status(201);
			res.send("Ok");
			console.log("Create TimeEntry:  " + data);
		}).catch((err) => {
			console.log(err);
			res.status(409);
			res.send(err);
		});
	} else {
		return res.json(validation.errors);
	}
});

app.get("/masure", (req, res) => {
	req.body;
	const data = req.body;

	var validation = validate_Masure(data);
	if (validation == true) {
		const output = {
			user: data.user,
			mode: data.mode,
			start: new Date(),
			end: null
		};
		const timeEntry = new TimeEntry(output);
		timeEntry.save().then(() => {
			res.status(201);
			res.send("Ok");
			console.log("Create TimeEntry:  " + data);
		}).catch((err) => {
			console.log(err);
			res.status(409);
			res.send(err);
		});
	} else {
		return res.json(validation.errors);
	}
});

app.post("/masure", (req, res) => {
	req.body;
	const data = req.body;
	console.log(data);
	var validation = validate_Masure(data);

	if (validation == true) {
		TimeEntry.update({ user: data.user, mode: data.mode, end: null}, { end: new Date() }, (err, response) => {
			if (response.nModified === 1) {
				res.status(201);
				res.send("Updated TimeEntry");
				console.log("Updated TimeEntry");
			} else {
				res.status(409);
				res.send("Failed");
				console.log("Failed to Update TimeEntry");
			}
		});
	} else {
		return res.json(validation.errors);
	}
});

app.listen(8000, () => console.log(`Example app listening on port 8000`));
