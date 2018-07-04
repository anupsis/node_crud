var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'node_blog',
  multipleStatements: true
});
// var connection = mysql.createConnection({multipleStatements: true});


connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;