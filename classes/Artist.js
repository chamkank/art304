var db = require('../database');

artist = {};

//Generates a random 20 digit id
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

artist.postComment = function (artId, artist_username, commentString){
	var commentId = makeid();
	var utcDate = new Date(date.toUTCString()); //Get time in UTC
	utcDate.setHours(utcDate.getHours()-7);	//Change to PST with current daylight savings
	var date = new Date(utcDate).toISOString().slice(0, 19).replace('T', ' '); //Formats date
	
	database.query("INSERT INTO Comment(comment_id,artist_username,date_posted,comment_text) VALUES (${commentId},${artist_username}, ${date}, ${commentString})", (err, res) => {
		console.log(res.rows[0]);
	})
	database.query("INSERT INTO Comments_On(comment_id,artist_username,art_id) VALUES (${commentId}, ${artist_username},${artId}) ", (err, res) => {
		console.log(res.rows[0]);
	})

}

artist.deleteComment = function (commentId){
	database.query("DELETE FROM Comment WHERE comment_id = ${commentId}", (err, res) => {
		console.log(res.rows[0]);
	})
}

module.exports = artist;