function sendResponse(res, payload) {
  const { status, data } = payload;
  return res.status(status).json(data);
}

module.exports = { sendResponse };
