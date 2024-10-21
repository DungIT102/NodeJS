const path = require('path');

function getMessages(req, res) {
  res.render('messages', {
    title: 'My Friends are very clever!',
    caption: "Let's go Skiing!",
  });
}

module.exports = {
  getMessages,
};
