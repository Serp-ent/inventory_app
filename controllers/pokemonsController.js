const db = require('../db/queries');
const asyncHandler = require('express-async-handler');

const listPokemons = asyncHandler(async (req, res) => {
  const pokemons = await db.getAllPokemons();
  res.render('pokemons', {
    title: 'List of Pokemons',
    pokemons,
  });
});

module.exports = {
  listPokemons,
}