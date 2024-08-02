const { Router } = require('express');
const rootRouter = Router();
const controller = require('../controllers/rootController');

rootRouter.get('/', controller.listItems)

module.exports = rootRouter;