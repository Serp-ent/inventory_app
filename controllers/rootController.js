const db = require('../db/queries');
const asyncHandler = require('express-async-handler');

const listItems = asyncHandler(async (req, res) => {
  const rows = await db.getAllTrainersWithPokemons();
  const trainers = {};

  rows.forEach(row => {
    if (!trainers[row.trainer_name]) {
      trainers[row.trainer_name] = [];
    }

    if (row.pokemon_name) {
      trainers[row.trainer_name].push(row.pokemon_name);
    }
  });

  console.log(trainers);

  res.render('index', {
    title: 'Trainers list',
    trainers
  });
});

module.exports = {
  listItems,
}