var express = require('express');
var router = express.Router();
var model = require('../models/posts');
var modelCategories = require('../models/categories');
var modelPostCategories = require('../models/post_categories');


var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET users listing. */
router.get('/', function(req, res, next) {
	records = modelCategories.getAll(function(result){
  		res.render('posts/index.ejs',{data:result});
	});
});

/* GET users listing. */
router.get('/all', function(req, res, next) {
	records = modelPostCategories.getAll(function(result){
  		res.render('posts/all.ejs',{data:result});
	});
});

// detail
router.get('/view/:id', function(req, res, next) {
  	records = modelPostCategories.detail(req.params.id,function(result){
  		var selected = [];
  		for(var i=0; i<result[1].length;i++){
  			selected.push({
  				text:result[1][i].text,
  				id:result[1][i].id,
  				selected:result[1][i].selected,
  			});
  		}
  		selected = JSON.stringify(selected);
  		res.render('posts/edit.ejs',{detail:result[0], selected_categories:selected});
	});
});

// save
router.post('/save', function(req, res, next) {
	var data = { title : req.body.title, content : req.body.posting, created : "now()", updated : "now()" };
	var categories = req.body.categories;
	model.save(data,function(result){
		for (var i = categories.length - 1; i >= 0; i--) {
			var post_categories_data = { category_id : categories[i], post_id : result.insertId };
			modelPostCategories.save(post_categories_data,function(result_post){

			});
		}
		res.redirect('/posts');
	});
});

// update
router.post('/update/:id', function(req, res, next) {

	// delete post categories
	modelPostCategories.delete(req.params.id,function(result){});

	// update
	var data = [req.body.title, req.body.posting,req.params.id];
	var categories = req.body.categories;
	model.update(data,function(result){
		for (var i = categories.length - 1; i >= 0; i--) {
			var post_categories_data = { category_id : categories[i], post_id : req.params.id };
			modelPostCategories.save(post_categories_data,function(result_post){
			});
		}
		res.redirect('/posts/all');
	});
});

module.exports = router;
