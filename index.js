const http = require('http');

const PORT = 3000;

const server = http.createServer();

/* some dummy data and functions */
const friends = [
  {
    id: 0,
    name: 'John Doe',
    ages: 25,
    address: 'New York',
    description: 'I am John Doe, I am 25 years old, I live in New York',
  },
  {
    id: 1,
    name: 'Jane Doe',
    ages: 30,
    address: 'Los Angeles',
    description: 'I am Jane Doe, I am 30 years old, I live in Los Angeles',
  },
  {
    id: 2,
    name: 'Jim Doe',
    ages: 35,
    address: 'Chicago',
    description: 'I am Jim Doe, I am 35 years old, I live in Chicago',
  },
];

const httpStatus = {
  OK: 200,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
};

function sendResponse(res, statusCode, contentType, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', contentType);
  res.end(data);
}

/* request handler */

server.on('request', (req, res) => {
  const items = req.url.split('/');
  const requestMethod = req.method;
  const [, path, id] = items;

  if (requestMethod === 'GET') {
    switch (path) {
      case '':
        sendResponse(res, httpStatus.OK, 'text/html', '<h1>Home Page</h1>');
        break;
      case 'friends':
        if (!id) {
          sendResponse(res, httpStatus.OK, 'application/json', JSON.stringify(friends));
          return;
        }

        if (!friends[Number(id)]) {
          sendResponse(res, httpStatus.NOT_FOUND, 'text/html', '<h1>Not Found</h1>');
          return;
        }

        sendResponse(res, httpStatus.OK, 'application/json', JSON.stringify(friends[Number(id)]));
        break;

      case 'message':
        sendResponse(res, httpStatus.OK, 'application/json', '<h1>Hello World</h1>');
        break;
      default:
        sendResponse(res, httpStatus.NOT_FOUND, 'text/html', '<h1>Not Found</h1>');
        break;
    }
  } else if (requestMethod === 'POST') {
    switch (path) {
      case 'friends':
        req.on('data', (data) => {
          const friend = data.toString();
          console.log(friend);

          friends.push(JSON.parse(data));
          req.pipe(res);
        });
        break;
      default:
        sendResponse(res, httpStatus.BAD_REQUEST, 'text/html', '<h1>Bad Request</h1>');
        break;
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
