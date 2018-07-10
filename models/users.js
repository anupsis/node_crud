var conn = require('../config/connection');

var all = function (cb) {
  conn.query('select * from users',function(err, rows, fields){
    if (err) throw(err); 
    cb(rows);
  });
}

var detail = function(id,cb){
	conn.query('select * from users where `id` = ?; select * from users',[id],function(err, rows, fields){
		if (err) throw(err); 
		cb(rows);
	});
}

var save = function(data,cb){
	conn.query('insert into users set ?',data,function(err, rows, fields){
		if (err) throw(err); 
		cb(rows);
	});
}

var update = function(data,cb){
	var query = 'update users set username = ?, is_active = ? where id = ? ';
	if(data.count > 2 ){
		var query = 'update users set username = ?, is_active = ?, password = ? where id = ? ';
	}
	console.log(query);
	conn.query(query,data,function(err, rows, fields){
		if (err) throw(err); 
		cb(rows);
	});
}

var delete_post = function(id,cb){
	conn.query('delete from users where id = ? ',id,function(err, rows, fields){
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