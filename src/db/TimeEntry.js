require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

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
