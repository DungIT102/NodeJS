const { sendResponse } = require('../helperFunction.js');
const { httpStatus } = require('../httpStatusConfig.js');
const { friends } = require('../models/friends.model.js');

function postFriend(req, res) {
  const { name } = req.body;

  if (!name) {
    const payload = { status: httpStatus.BAD_REQUEST, data: { message: 'Name is required' } };
    sendResponse(res, payload);
    return;
  }

  const newFriend = { id: friends.length, name };
  friends.push(newFriend);
  const payload = { status: httpStatus.OK, data: newFriend };
  sendResponse(res, payload);
}

function getFriends(req, res) {
  sendResponse(res, { status: httpStatus.OK, data: friends });
}

function getAFriend(req, res) {
  const { id } = req.params;
  const friend = friends[parseInt(id)];

  if (!friend) {
    const payload = { status: httpStatus.NOT_FOUND, data: { message: 'Friend does not exist' } };
    sendResponse(res, payload);
    return;
  }

  sendResponse(res, { status: httpStatus.OK, data: friend });
}

module.exports = {
  postFriend,
  getFriends,
  getAFriend,
};
