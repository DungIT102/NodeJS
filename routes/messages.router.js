const messagesController = require('../controllers/messages.controller');
const { Router } = require('express');
const messagesRouter = Router();

messagesRouter.get('/', messagesController.getMessages);

module.exports = messagesRouter;
