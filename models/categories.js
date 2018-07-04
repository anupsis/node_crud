var conn = require('../config/connection');

var all = function (cb) {
  conn.query('select * from categories',function(err, rows, fields){
    if (err) throw(err); 
    cb(rows);
  });
}

var detail = function(id,cb){
	conn.query('select * from categories where `id` = ?; select * from categories',[id],function(err, rows, fields){
		if (err) throw(err); 
		cb(rows);
	});
}

var save = function(data,cb){
	conn.query('insert into categories set ?',data,function(err, rows, fields){
		if (err) throw(err); 
		cb(rows);
	});
}

var update = function(data,cb){
	conn.query('update categories set name = ?, is_active = ? where id = ? ',data,function(err, rows, fields){
		if (err) throw(err); 
		cb(rows);
	});
}

var delete_post = function(id,cb){
	conn.query('delete from categories where id = ? ',id,function(err, rows, fields){
		if (err) throw(err); 
		cb(rows);
	});
}

module.exports={
	getAll : all,
	detail : detail,
	save : save,
	update : update,
	delete : delete_post,
};