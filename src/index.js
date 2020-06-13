const express = require("express");
const Validator = require("jsonschema").Validator;
const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');

require("./model/TimeEntry").TimeEntry;
const TimeEntry = mongoose.model("TimeEntry");

require("./model/Measure").Measure;
const Measure = mongoose.model("Measure");

const app = express();
app.use(express.json());

function validate_TimeEntry(data) {
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

function validate_Masure(data) {
	var v = new Validator();
	var schema = {
		"id": "/Measure",
		"type": "object",
		"properties": {
			"token": { "type": "string"},
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
	var validation = validate_TimeEntry(data);
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

app.get("/masure", (req, res) => {
	const token = uuid();
	const data = {
		"token": token,
		"start": new Date()
	};

	const masure = new Measure(data);
	masure.save().then(() => {
		res.status(201);
		res.send(data);
	}).catch((err) => {
		console.log(err);
		res.status(409);
		res.send(err);
	});

});

app.post("/masure", (req, res) => {
	req.body;
	const data = req.body;
	console.log(data);
	var validation = validate_Masure(data);
	if (validation == true) {
		Measure.findOne({ "token" : data.token }, function (err, masure) {
			if (err) return handleError(err);

			const start = new Date(masure.start);

			const diff = (start.getTime() - new Date().getTime());

			const data = {
				"masurement": diff
			}

			res.json(data);
		});
	} else {
		return res.json(validation.errors);
	}
});

app.listen(8000, () => console.log(`Example app listening on port 8000`));
