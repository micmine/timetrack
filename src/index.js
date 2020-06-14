var compression = require('compression');
var express = require("express");

var Validator = require("jsonschema").Validator;
var mongoose = require('mongoose');

require("./model/TimeEntry").TimeEntry;
var TimeEntry = mongoose.model("TimeEntry");

var Validation = require("./controller/Validation");

var app = express();
app.use(express.json());
app.use(compression());

app.post("/", (req, res) => {
	req.body;
	const data = req.body;
	console.log(data);
	var validation = Validation.timeEntry(data);
	if (validation == true) {
		const timeEntry = new TimeEntry(data);
		timeEntry.save().then(() => {
			res.status(201);
			res.send("Created TimeEntry");
			console.log("Created TimeEntry:  " + data);
		}).catch((err) => {
			console.log(err);
			res.status(500);
			res.send(err);
		});
	} else {
		res.status(409);
		res.json(validation.errors);
	}
});

app.get("/measure", (req, res) => {
	req.body;
	const data = req.body;

	var validation = Validation.measure(data);
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
			res.status(500);
			res.send(err);
		});
	} else {
		res.status(409);
		res.json(validation.errors);
	}
});

app.post("/measure", (req, res) => {
	req.body;
	const data = req.body;
	console.log(data);
	var validation = Validation.measure(data);

	if (validation == true) {
		TimeEntry.update({ user: data.user, mode: data.mode, end: null}, { end: new Date() }, (err, response) => {
			if (response.nModified === 1) {
				res.status(201);
				res.send("Updated TimeEntry");
				console.log("Updated TimeEntry");
			} else {
				res.status(500);
				res.send("Failed");
				console.log("Failed to Update TimeEntry");
			}
		});
	} else {
		res.status(409);
		res.json(validation.errors);
	}
});

app.listen(8000, () => console.log(`Example app listening on port 8000`));
