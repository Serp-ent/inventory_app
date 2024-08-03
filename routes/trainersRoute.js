const { Router } = require('express');
const trainersRoute = Router();
const controller = require('../controllers/trainersController');
const express = require('express');

trainersRoute.use(express.urlencoded({ extended: true }));

trainersRoute.get('/', controller.listTrainers);
trainersRoute.get('/add', controller.addTrainerGet);
trainersRoute.post('/add', controller.addTrainerPost);

trainersRoute.get('/:id/add', controller.addPokemonToTrainerGet);
trainersRoute.post('/:id/add', controller.addPokemonToTrainerPost);

trainersRoute.post('/:id/delete', controller.removeTrainerPost);

trainersRoute.get('/:id/edit', controller.editTrainerGet);
trainersRoute.post('/:id/edit', controller.editTrainerPost);

module.exports = trainersRoute