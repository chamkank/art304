var db = require('../database');

comment = {};

comment.getInfo = function (comment_id){
	database.query("SELECT * FROM comment WHERE comment_id = ${comment_id}", (err, res) => {
		console.log(res.rows[0]);
	})
}

module.exports = comment;