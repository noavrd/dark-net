const express = require('express');
const app = express();
const cors = require('cors');
const Paste = require('./models/paste');
const scraper = require('./scraper/scraper');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API server');
});

app.get('/api/pastes', async (req, res) => {
  try {
    const allPastes = await Paste.find({});

    res.send(allPastes);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/addPaste', async (req, res) => {
  try {
    const allPastes = await scraper();
    for (let paste of allPastes) {
      const existsPastes = await Paste.findOne({
        title: paste.title,
        content: paste.content,
      });

      if (!existsPastes) {
        const newPaste = new Paste(paste);
        await newPaste.save();
      }
    }
    res.send('Pastes added successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = app;
