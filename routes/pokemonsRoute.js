const express = require('express');
const pokemonsRoute = express.Router();
const controller = require('../controllers/pokemonsController');


pokemonsRoute.use(express.urlencoded({ extended: true }));

pokemonsRoute.get('/', controller.listPokemons);

pokemonsRoute.get('/add', controller.addPokemonGet)
pokemonsRoute.post('/add', controller.addPokemonPost)

module.exports = pokemonsRoute;