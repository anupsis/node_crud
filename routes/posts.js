var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/index.ejs');
});

// detail
router.get('/view/:id', function(req, res, next) {
  res.send('respond with a resource '+req.params.id);
});

// save
router.post('/save', function(req, res, next) {
  res.send('respond with a resource');
});

// update
router.post('/update/:id', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
