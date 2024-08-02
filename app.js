const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.send('Simple pokemon inventory');
});

app.use((req, res, next) => {
  res.status(404).send('Page not found');;
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server successfully start at port ${PORT}`);
});