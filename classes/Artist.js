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

artist.postComment = function (artId, artist_username, commentString) {
	var commentId = makeid();
	var datetime = new Date().toLocaleString();

	return new Promise(function (resolve, reject) {
		database.query(`INSERT INTO Comment(comment_id,artist_username,date_posted,comment_text) VALUES ('${commentId}', '${artist_username}', '${datetime}', '${commentString}')`, (err, res) => {
			if (err) { reject(err.detail) }
			database.query(`INSERT INTO Comments_On(comment_id,artist_username,art_id) VALUES ('${commentId}', '${artist_username}','${artId}')`, (err, res) => {
				if (err) { reject(err.detail) }
				else { resolve(true) }
			});
		});
	});
};

artist.deleteComment = function (commentId) {
	return new Promise(function (resolve, reject) {
		database.query(`DELETE FROM Comment WHERE comment_id = '${commentId}'`, (err, res) => {
			if (err){ reject(err.detail) }
			else { resolve(true) }
		});
	});
}

artist.getArt = function (username) {
	return new Promise(function(resolve, reject){
		database.query(`SELECT * FROM Art WHERE owner_username = '${username}'`, (err, res) => {
			if (err){ reject(err.detail) }
			else { resolve(res.rows) }
		});
	})
}

artist.createArtist = function (username, password, email_address, birth_date) {
	return new Promise(function (resolve, reject) {
		var datetime = new Date().toLocaleString();
		database.query(`INSERT INTO Artist_Wall(username, password, email_address, date_joined, birth_date) VALUES ('${username}', '${password}', '${email_address}', '${datetime}', '${birth_date}')`, (err, res) => {
			if (err) {
				reject(err.detail);
			} else {
				resolve(true);
			}
		})
	});
};

artist.getFollowers = function (username) {
    return new Promise(function(resolve, reject){
        database.query(`SELECT * FROM Artist_Wall WHERE Artist_Wall.username IN (SELECT follower_username from Follows WHERE followee_username = '${username}')`, (err, res) => {
            if (err){ reject(err.detail) }
            else { resolve(res.rows) }
        });
    })
};

artist.getInfo = function (username) {
    return new Promise(function(resolve, reject){
        database.query(`SELECT * FROM Artist_Wall WHERE Artist_Wall.username = '${username}'`, (err, res) => {
            if (err){ reject(err.detail) }
            else { resolve(res.rows) }
        });
    })
};




module.exports = artist;