const { Router } = require('express');
const trainersRoute = Router();
const controller = require('../controllers/trainersController');

trainersRoute.get('/', controller.listTrainers);

module.exports = trainersRoute