const { idleCount } = require('../db/pool');
const db = require('../db/queries');
const asyncHandler = require('express-async-handler');

const listItems = asyncHandler(async (req, res) => {
  const rows = await db.getAllTrainersWithPokemons();
  const trainers = {};

  rows.forEach(row => {
    if (!trainers[row.trainer_name]) {
      trainers[row.trainer_name] = {
        id: row.trainer_id,
        pokemons: [],
      };
    }

    if (row.pokemon_name) {
      trainers[row.trainer_name].pokemons.push(row.pokemon_name);
    }
  });

  res.render('index', {
    title: 'Trainers list',
    trainers
  });
});

module.exports = {
  listItems,
}