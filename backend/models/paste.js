const mongoose = require('mongoose');

const pastesSchema = new mongoose.Schema({
  title: { type: String, require: true },
  content: { type: Array, require: true },
  author: { type: String },
  creationDate: { type: Date, require: true },
  creationTime: { type: String, require: true },
});

const Paste = mongoose.model('pastes', pastesSchema);

module.exports = Paste;
