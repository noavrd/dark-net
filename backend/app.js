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
    const searchText = req.query.searchText;

    if (!searchText) {
      const allPastes = await Paste.find({});
      res.send(allPastes);
      return;
    }
    if (searchText.toLowerCase()) {
      const expectedPaste = await Paste.find({
        title: { $regex: searchText.toLowerCase(), $options: 'i' },
      });

      if (expectedPaste.length === 0) {
        res.status(404).send('No such title');
        return;
      }

      res.json(expectedPaste);
    }
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
