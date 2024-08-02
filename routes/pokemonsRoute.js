const { Router } = require('express');
const pokemonsRoute = Router();
const controller = require('../controllers/pokemonsController');

pokemonsRoute.get('/', controller.listPokemons);

module.exports = pokemonsRoute;