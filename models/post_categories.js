var conn = require('../config/connection');

// var all = function (cb) {
//   conn.query('select * from post_categories',function(err, rows, fields){
//     if (err) throw(err); 
//     cb(rows);
//   });
// }

var all = function (cb){
	conn.query('SELECT posts.id, posts.user_id, posts.title, posts.content, posts.created, posts.updated, GROUP_CONCAT(" ",categories.`name`) as categories FROM posts INNER JOIN post_categories ON posts.id = post_categories.post_id INNER JOIN categories ON post_categories.category_id = categories.id group by posts.id',function (err, rows, field){
		 if (err) throw(err); 
    	cb(rows);
	})
}

var detail = function(id,cb){
	conn.query('SELECT posts.id, posts.user_id, posts.title, posts.content, posts.created, posts.updated, GROUP_CONCAT(" ",categories.`name`) as categories FROM posts INNER JOIN post_categories ON posts.id = post_categories.post_id INNER JOIN categories ON post_categories.category_id = categories.id where posts.id = ? group by posts.id ; SELECT categories.id as id, categories.`name` as text, (select case when post_categories.post_id is not null then true else false end from post_categories where post_categories.category_id=categories.id and post_categories.post_id=?) as selected  FROM categories ',[id,id],function(err, rows, fields){
		if (err) throw(err); 
		cb(rows);
	});
}

var save = function(data,cb){
	conn.query('insert into post_categories set ?',data,function(err, rows, fields){
		if (err) throw(err); 
		cb(rows);
	});
}

var update = function(data,cb){
	conn.query('update post_categories set title = ?, content = ? where id = ? ',data,function(err, rows, fields){
		if (err) throw(err); 
		cb(rows);
	});
}

var delete_categories = function(id,cb){
	conn.query('delete from post_categories where post_id = ? ',id,function(err, rows, fields){
		if (err) throw(err); 
		cb(rows);
	});
}

module.exports={
	getAll : all,
	detail : detail,
	save : save,
	update : update,
	delete : delete_categories,
};