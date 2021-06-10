const express = require('express');
const app = express();
const cors = require('cors');
const paste = require('./models/paste');
const scraper = require('./scraper/scraper');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API server');
});

app.get('/api/pastes', async (req, res) => {
  try {
    const allPastes = await paste.find({});

    res.send(allPastes);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/addPaste', async (req, res) => {
  try {
    const newPastes = await scraper();
    res.send(newPastes);
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = app;
