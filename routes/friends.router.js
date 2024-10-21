const friendsController = require('../controllers/friends.controller');
const { Router } = require('express');
const friendsRouter = Router();

friendsRouter.post('/', friendsController.postFriend);

friendsRouter.get('/', friendsController.getFriends);

friendsRouter.get('/:id', friendsController.getAFriend);

module.exports = friendsRouter;
