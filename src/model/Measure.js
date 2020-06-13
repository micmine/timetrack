const mongoose = require('mongoose');
require("../controller/Database");

const timeEntrySchema = new mongoose.Schema({
	token: {
		type: String,
	},
	start: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Measure', timeEntrySchema);
