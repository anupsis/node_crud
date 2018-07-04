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
  	records = model.detail(req.params.id,function(result){
  		res.render('categories/edit',{detail:result[0],data:result[1]});
	});
});

// save
router.post('/save', urlencodedParser, function(req, res, next) {
	if (!req.body) return res.redirect('/categories')
	var data = { name : req.body.name, is_active:'1' };
	save = model.save(data,function(result){
		res.redirect('/categories');
	});
});

// update
router.post('/update/:id', function(req, res, next) {
  	if (!req.body) return res.redirect('/categories')
	var data = [req.body.name,(req.body.status=="on"?'1':'0'),req.params.id];
	save = model.update(data,function(result){
		res.redirect('/categories');
	});
});

// delete
router.get('/delete/:id', function(req, res, next) {
  	records = model.delete(req.params.id,function(result){
  		res.redirect('/categories');
	});
});

module.exports = router;
