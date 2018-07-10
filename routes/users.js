var express = require('express');
var router = express.Router();
var model = require('../models/users');

var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET users listing. */
router.get('/', function(req, res, next) {
	records = model.getAll(function(result){
  		res.render('users/index',{data:result});
	});

});

// detail
router.get('/view/:id', function(req, res, next) {
  	records = model.detail(req.params.id,function(result){
  		res.render('users/edit',{detail:result[0],data:result[1]});
	});
});

// save
router.post('/save', urlencodedParser, function(req, res, next) {
	if (!req.body) return res.redirect('/users')
	var crypt = require('crypto');
	var password = crypt.createHash('md5').update(req.body.password).digest('hex');
	var data = { username : req.body.username, password : password , is_active:'1' };
	save = model.save(data,function(result){
		res.redirect('/users');
	});
});

// update
router.post('/update/:id', function(req, res, next) {
  	if (!req.body) return res.redirect('/users')

  	var password = "";
  	if(req.body.password.length > 0){
  		var crypt = require('crypto');
		password = crypt.createHash('md5').update(req.body.password).digest('hex');
		var data = [req.body.username,(req.body.status=="on"?'1':'0'),password,req.params.id];
  	}else{
		var data = [req.body.username,(req.body.status=="on"?'1':'0'),req.params.id];
  	}

	save = model.update(data,function(result){
		res.redirect('/users');
	});
});

// delete
router.get('/delete/:id', function(req, res, next) {
  	records = model.delete(req.params.id,function(result){
  		res.redirect('/users');
	});
});

module.exports = router;
