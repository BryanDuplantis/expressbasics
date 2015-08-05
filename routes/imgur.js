var fs = require('fs');

var imgur = require('imgur');
var multer = require('multer');
var router = require('express').Router();

var upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 200 * 1000 * 1000
  },
  fileFilter: function (req, file, cb) {
    cb(null, file.mimetype.slice(0,6) === 'image/');
  }
});

router.get('/', function (req, res) {
  res.render('templates/imgur');
});

router.post('/upload', upload.single('image'), function (req, res) {
  console.log(req.file);

  if (req.file) {
    imgur
      .uploadFile(req.file.path)
      .then(function (json) {
        fs.unlink(req.file.path, function () {
          res.redirect(json.data.link);
        });
      })
      .catch(function (err) {
        res.send(err);
      });
  } else {
    res.status(415).send('Must upload an image!');
  }
});

module.exports = router;
