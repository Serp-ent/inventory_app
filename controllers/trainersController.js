const db = require('../db/queries');
const asyncHandler = require('express-async-handler');

const listTrainers = asyncHandler(async (req, res) => {
  const trainers = await db.getAllTrainers();
  res.render('trainers', {
    title: 'list of trainers',
    trainers
  });
});


const addTrainerGet = asyncHandler(async (req, res) => {
  res.render('addTrainer', { title: "Add new trainer" });
});

const addTrainerPost = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { trainerName, trainerAge } = req.body;
  await db.addTrainer(trainerName, trainerAge);

  res.redirect('/');
});


module.exports = {
  listTrainers,
  addTrainerPost,
  addTrainerGet,
}