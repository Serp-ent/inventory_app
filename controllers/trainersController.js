const db = require('../db/queries');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { title } = require('process');

const listTrainers = asyncHandler(async (req, res) => {
  const trainers = await db.getAllTrainers();
  res.render('trainers', {
    title: 'list of trainers',
    trainers
  });
});


const addTrainerGet = (req, res) => {
  res.render('addTrainer', { title: "Add new trainer", trainer: null });
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
    const { trainerName, trainerAge } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('addTrainer', {
        title: "Add new trainer",
        errors: errors.array(),
        trainer: { name: trainerName, age: trainerAge }
      });
    }
    await db.addTrainer(trainerName, trainerAge);

    res.redirect('/');
  }),
];

const addPokemonToTrainerGet = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const trainerQuery = db.getTrainer(id);
  const pokemonTypesQuery = db.getPokemonTypes();

  const [trainer, pokemonTypes] = await Promise.all([trainerQuery, pokemonTypesQuery]);

  if (!trainer) {
    return res.status(404).send('No trainer with given id');
  }

  console.log(trainer);
  res.render('addPokemon', {
    title: 'Add pokemon to ' + trainer.name,
    trainer,
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

const removeTrainerPost = asyncHandler(async (req, res) => {
  await db.removeTrainer(req.params.id);
  res.redirect('/');
});

const editTrainerGet = asyncHandler(async (req, res) => {
  const trainer = await db.getTrainer(req.params.id);
  console.log(trainer);

  res.render('addTrainer', {
    title: 'Update trainer' + trainer.name,
    trainer,
  });
});

const editTrainerPost = [
  validateTrainer,
  (req, res, next) => {
    console.log('user validated');
    next();
  },
  asyncHandler(async (req, res) => {
    const { trainerName, trainerAge, } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render('addTrainer', {
        title: `Edit '${trainerName} trainer`,
        trainer: { name: trainerName, age: trainerAge },
        errors: errors.array(),
      });
    }

    const trainer = await db.updateTrainer(req.params.id, trainerName, trainerAge);
    res.redirect('/');
  })];

module.exports = {
  listTrainers,
  addTrainerPost,
  addTrainerGet,
  addPokemonToTrainerGet,
  addPokemonToTrainerPost,
  removeTrainerPost,
  editTrainerGet,
  editTrainerPost,
}