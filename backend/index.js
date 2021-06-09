require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8080;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, () => console.log(`app listening at ${PORT}`));
  })
  .catch((err) => {
    console.log(`Error connecting to MongoDb: ${err}`);
  });
