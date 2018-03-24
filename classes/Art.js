var db = require('../database');

art = {};

art.getComments = function (art_id){
	database.query("SELECT * FROM Comment, Comments_On WHERE Comments_On.comment_id = Comment.comment_id AND Comments_On.art_id = ${art_id} ORDER BY Date DESC, Time DESC", (err, res) => {
		console.log(res.rows);
		return res.rows;
	})
}

module.exports = art;