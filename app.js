require('dotenv').config();

const express = require('express');

const pokemonsRoute = require('./routes/pokemonsRoute');
const trainersRoute = require('./routes/trainersRoute');
const rootRoute = require('./routes/rootRoute');

const app = express();

app.set('view engine', 'ejs');

app.use('/pokemons', pokemonsRoute);
app.use('/trainers', trainersRoute);
app.use('/', rootRoute);

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