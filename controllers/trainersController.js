const db = require('../db/queries');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const listTrainers = asyncHandler(async (req, res) => {
  const trainers = await db.getAllTrainers();
  res.render('trainers', {
    title: 'list of trainers',
    trainers
  });
});


const addTrainerGet = (req, res) => {
  res.render('addTrainer', { title: "Add new trainer" });
};

const validateTrainer = [
  body('trainerName').trim()
    .notEmpty().withMessage('Trainer name cannot be empty')
    .isAlpha().withMessage('Trainer name should contain only letters')
    .isLength({ min: 1, max: 50 }).withMessage('Trainer name length should be between 1 and 50'),
  body('trainerAge').trim()
    .notEmpty().withMessage("Trainer age cannot be empty")
    .isInt({ min: 1, max: 1000 }).withMessage('Trainer age must be number must be between 1 and 1000'),
];

const addTrainerPost = [
  validateTrainer,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('addTrainer', {
        title: "Add new trainer",
        errors: errors.array(),
      });
    }

    const { trainerName, trainerAge } = req.body;
    await db.addTrainer(trainerName, trainerAge);

    res.redirect('/');
  }),
];

const addPokemonToTrainerGet = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const trainerNameQuery = db.getTrainerNameFromId(id);
  const pokemonTypesQuery = db.getPokemonTypes();

  const [trainerName, pokemonTypes] = await Promise.all([trainerNameQuery, pokemonTypesQuery]);
  if (!trainerName) {
    return res.status(404).send('No trainer with given id');
  }

  res.render('addPokemon', {
    title: 'Add pokemon to ' + trainerName,
    trainerId: id,
    trainerName,
    pokemonTypes,
  });
});

// TODO add validation
// TODO: handle adding pokemons without trainerId (wild ones)
const addPokemonToTrainerPost = asyncHandler(async (req, res) => {
  const { pokemonName, pokemonType: pokemonTypeId } = req.body;

  const trainerId = req.params.id;
  await db.addPokemon(pokemonName, pokemonTypeId, trainerId);
  res.redirect('/');
})

module.exports = {
  listTrainers,
  addTrainerPost,
  addTrainerGet,
  addPokemonToTrainerGet,
  addPokemonToTrainerPost,
}