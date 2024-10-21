const express = require('express');
const path = require('path');
const { sendResponse } = require('./helperFunction.js');
const { httpStatus } = require('./httpStatusConfig.js');
const routes = require('./routes');

const app = express();
const PORT = 3000;

/* set view engine */
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

/*  Middleware to handle favicon requests */
app.get('/favicon.ico', (req, res) => res.status(204));

/* Middleware */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

/* Routes */
app.use(routes);

/* Helper error handling middleware */

app.use((err, req, res) => {
  console.log(`error: ${err.message}`);
  const payload = { status: httpStatus.INTERNAL_SERVER_ERROR, data: { message: 'Something went wrong!' } };
  sendResponse(res, payload);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
