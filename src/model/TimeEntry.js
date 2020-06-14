const mongoose = require('mongoose');
require("../controller/Database");

const timeEntrySchema = new mongoose.Schema({
	user: {
		type: Number,
		trim: true,
	},
	mode: {
		type: String,
		trim: true,
	},
	start: {
		type: Date,
	},
	end: {
		type: Date,
	},
});

module.exports = mongoose.model('TimeEntry', timeEntrySchema);
