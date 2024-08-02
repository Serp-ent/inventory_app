const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.send('Simple pokemon inventory');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server successfully start at port ${PORT}`);
});