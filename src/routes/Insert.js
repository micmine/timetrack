var mongoose = require('mongoose');

require("../model/TimeEntry").TimeEntry;
var TimeEntry = mongoose.model("TimeEntry");

var Validation = require("../controller/Validation");

module.exports = {
	post: function (app) {
		app.post("/insert", (req, res) => {
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
    }
}
