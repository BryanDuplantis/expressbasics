var express = require('express');
// var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;

var Order = require('../models/ChickenNuggets');

var router = express.Router();


// Angular Services: use constructors
// Angular Factories: return simple objects without inheritance

router.get('/', function (req, res) {
  Order.findAll(function (err, orders) {
      res.render('templates/chicken-index', {orders: orders});
    });
});

router.get('/order', function (req, res) {
  res.render('templates/chicken-new');
});

router.post('/order', function (req, res) {
  var collection = global.db.collection('chickenNuggets');

  collection.save(req.body, function () {
      res.redirect('/chickennuggets')
  });
});

router.post('/order/:id/complete', function (req, res) {
  var collection = global.db.collection('chickenNuggets');

  collection.update(
      {_id: ObjectID(req.params.id)},
      {$set: {complete: true}},
      function () {
        res.redirect('/chickennuggets')
      });
});

module.exports = router;
