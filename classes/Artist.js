var db = require('../database');

artist = {};

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

artist.postComment = function (artId, artist_username, commentString){
	var commentId = makeid();
	var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
	
	database.query("INSERT INTO Comment(comment_id,artist_username,date_posted,comment_text) VALUES (${commentId},${artist_username}, ${date}, ${commentString})", (err, res) => {
		console.log(res.rows[0]);
	})
	database.query("INSERT INTO On(comment_id,artist_username,art_id) VALUES (${commentId}, ${artist_username},${artId}) ", (err, res) => {
		console.log(res.rows[0]);
	})

}

module.exports = artist;