var db = require('../database');

artist = {};

artist.postComment = function (artId, commentString){
	database.query("INSERT INTO On", (err, res) => {
		console.log(res.rows[0]);
	})
	database.query("INSERT INTO Comment VALUES ()", (err, res) => {
		console.log(res.rows[0]);
	})
}

module.exports = artist;