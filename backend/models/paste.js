const mongoose = require('mongoose');

const pastesSchema = new mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  author: { type: String },
  creationDate: { type: Date, require: true },
  creationTime: { type: Number, require: true },
});

const paste = mongoose.model('paste', pastesSchema);

module.exports = paste;
