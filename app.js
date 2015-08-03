var express = require('express'); // require Express
var lessCSS = require('less-middleware');

var routes = require('./routes/index');
var pizza = require('./routes/pizza');

var app = express(); // executes Express, save as app

// settings
app.set('view engine', 'ejs');  // sets the settings for EJS

app.locals.title = 'aweso.me';

// middlewares
app.use(lessCSS('public'));

app.use(function (req, res, next) {
  console.log('Request at ' + new Date().toISOString());
  next();
});
app.use(express.static('public'));

// routes
app.use('/', routes);
app.use('/pizza', pizza);

// errors
app.use(function (req, res) {
  // 400s before 500s
  res.status(403).send('Unauthorized!');
});

app.use(function (err, req, res, next) {
  // Pass 4 arguments to create an error handling middleware
  console.log('ERRRRRRRRR', err.stack);
  res.status(500).send('My Bad!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
