var express = require('express');
var model = require('../models/categories');
var router = express.Router();

var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET users listing. */
router.get('/', function(req, res, next) {
	records = model.getAll(function(result){
  		res.render('categories/index',{data:result});
	});
});

// detail
router.get('/view/:id', function(req, res, next) {
  res.send('respond with a resource '+req.params.id);
});

// save
router.post('/save', urlencodedParser, function(req, res, next) {
	  if (!req.body) return res.sendStatus(400)
  res.send('respond with a resource');
  console.log(req.body.name);
});

// update
router.post('/update/:id', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
