const db = require('../db/queries');

const listTrainers = async (req, res) => {
  const trainers = await db.getAllTrainers();
  res.render('trainers', {
    title: 'list of trainers',
    trainers
  });
}

module.exports = {
  listTrainers,
}