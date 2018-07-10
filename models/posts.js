var conn = require('../config/connection');

var all = function (cb) {
  conn.query('select * from posts',function(err, rows, fields){
    if (err) throw(err); 
    cb(rows);
  });
}

var detail = function(id,cb){
	conn.query('select * from posts where `id` = ?; select * from posts',[id],function(err, rows, fields){
		if (err) throw(err); 
		cb(rows);
	});
}

var save = function(data,cb){
	conn.query('insert into posts set ?',data,function(err, rows, fields){
		if (err) throw(err); 
		cb(rows);
	});
}

var update = function(data,cb){
	conn.query('update posts set title = ?, content = ? where id = ? ',data,function(err, rows, fields){
		if (err) throw(err); 
		cb(rows);
	});
}

var delete_post = function(id,cb){
	conn.query('delete from posts where id = ? ',id,function(err, rows, fields){
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