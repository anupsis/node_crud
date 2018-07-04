var conn = require('../config/connection');

var all = function getAll(cb) {
  conn.query('select * from categories',function(err, rows, fields){
    if (err) throw(err); 
    cb(rows);
  });
}

var detail = function getDetail(id,cb){
	conn.query('select * from categories where `id` = ?',[id],function(err, rows, fields){
		if (err) throw(err); 
		cb(rows);
	});
}

module.exports={
	getAll:all,
	detail:detail,

};