var router = require('express').Router();
var upload = require('multer')({ dest: 'uploads/'});

router.get('/', function (req, res) {
  res.render('templates/imgur');
});

router.post('/upload', function (req, res) {
  res.redirect('/imgur');
});

module.exports = router;
