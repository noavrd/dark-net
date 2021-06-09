const express = require('express');
const app = express();
const cors = require('cors');
const paste = require('./models/paste');

app.use(cors());
// app.use(express.json());

app.get('/', (req, res) => {
  res.send('API server');
});

module.exports = app;
