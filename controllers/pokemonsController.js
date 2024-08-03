const db = require('../db/queries');
const asyncHandler = require('express-async-handler');

const listPokemons = asyncHandler(async (req, res) => {
  const pokemons = await db.getAllPokemons();
  res.render('pokemons', {
    title: 'List of Pokemons',
    pokemons,
  });
});

const addPokemonGet = asyncHandler(async (req, res) => {
  const pokemonTypes = await db.getPokemonTypes();
  res.render('addPokemon', {
    title: 'Add wild pokemon',
    pokemonTypes,
  });
});


// TODO: add validation to pokemon
const addPokemonPost = asyncHandler(async (req, res) => {
  const wild = null;
  const { pokemonName, pokemonType } = req.body;
  await db.addPokemon(pokemonName, pokemonType, wild);

  res.redirect('/');
});


module.exports = {
  listPokemons,
  addPokemonGet,
  addPokemonPost,
}