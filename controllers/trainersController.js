const db = require('../db/queries');
const asyncHandler = require('express-async-handler');

const listTrainers = asyncHandler(async (req, res) => {
  const trainers = await db.getAllTrainers();
  res.render('trainers', {
    title: 'list of trainers',
    trainers
  });
});

module.exports = {
  listTrainers,
}