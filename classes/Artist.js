var database = require('../database');

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
	var datetime = new Date().toLocaleString();

	database.query(`INSERT INTO Comment(comment_id,artist_username,date_posted,comment_text) VALUES ('${commentId}', '${artist_username}', '${datetime}', '${commentString}')`, (err, res) => {
		console.log(res.rows[0]);
	})
	database.query(`INSERT INTO Comments_On(comment_id,artist_username,art_id) VALUES ('${commentId}', '${artist_username}','${artId}')`, (err, res) => {
		console.log(res.rows[0]);
	})

}

artist.deleteComment = function (commentId){
	database.query(`DELETE FROM Comment WHERE comment_id = '${commentId}'`, (err, res) => {
		console.log(res.rows[0]);
	})
}

artist.getArt = function (username){
	database.query(`SELECT * FROM Art WHERE owner_username = '${username}'`, (err, res) => {
		console.log(res.rows[0]);
	})
}

artist.createArtist = function(username, password, email_address, birth_date){
	return new Promise(function(resolve, reject) {
		var datetime = new Date().toLocaleString();
		database.query(`INSERT INTO Artist_Wall(username, password, email_address, date_joined, birth_date) VALUES ('${username}', '${password}', '${email_address}', '${datetime}', '${birth_date}')`, (err, res) => {
			if (err) { 
				reject(err.detail); 
			} else {
				resolve(true);
			}
		})
	});
}

module.exports = artist;