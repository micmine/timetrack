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
  time: {
    type: Number,
    trim: true,
  },
});

module.exports = mongoose.model('TimeEntry', timeEntrySchema);
