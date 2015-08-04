var fs = require('fs');

var express = require('express'); // require Express
var lessCSS = require('less-middleware');
var morgan = require('morgan');
var loggly = require('loggly');


var routes = require('./routes/index');
var pizza = require('./routes/pizza');

var app = express(); // executes Express, save as app

// settings
app.set('view engine', 'ejs');  // sets the settings for EJS

app.locals.title = 'aweso.me';

// middlewares
app.use(lessCSS('public'));

var logStream = fs.createWriteStream('access.log', {flags: 'a'});
//output to access.log file in Apache format
app.use(morgan('combined', {stream: logStream}));
//output to console in Dev format
app.use(morgan('dev'));

var client = loggly.createClient({
  token: '4f8af67e-dbee-44e2-9e41-a785f6edfadf',
  subdomain: 'BryanDuplantis',
  tags: ['NodeJS'],
  json: true
});

app.use(function(err, req, res, next) {
  client.log({
    ip: req.ip,
    date: new Date(),
    url: req.url,
    status: res.statusCode,
    method: req.method,
    err: err
  });
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
