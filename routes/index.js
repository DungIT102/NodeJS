const { Router } = require('express');
const friendsRouter = require('./friends.router');
const messagesRouter = require('./messages.router');

const router = Router();

router.use('/api/friends', friendsRouter);
router.use('/messages', messagesRouter);

module.exports = router;
