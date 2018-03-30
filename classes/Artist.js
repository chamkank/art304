var database = require('../database');

artist = {};

//Generates a random 20 digit id
// Attribution: https://stackoverflow.com/a/1349426
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

		database.query(`INSERT INTO Comment(comment_id,artist_username, art_id, date_posted,comment_text) VALUES ('${commentId}', '${artist_username}', '${artId}', '${datetime}', '${commentString}')`, (err, res) => {
            if (err){ reject(err.detail) }
            else { resolve(true) }
        });
    });
}

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

artist.getFollowees = function (username) {
    return new Promise(function(resolve, reject){
        database.query(`SELECT * FROM Artist_Wall WHERE Artist_Wall.username IN (SELECT followee_username from Follows WHERE follower_username = '${username}')`, (err, res) => {
            if (err){ reject(err.detail) }
            else { resolve(res.rows) }
        });
    })
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
    });
};

artist.hasLiked = function (username, art_id){
	return new Promise(function(resolve, reject){
		database.query(`SELECT * FROM Likes WHERE username = '${username}' and art_id = '${art_id}'`, function(err, res){
			if (err) { reject(err.detail) }
			else { 
				if (res.rows.length == 0){
					resolve(false);
				} else {
					resolve(true);
				}
			}
		})
	})
};

artist.followArtist = function(follower, followee){
	return new Promise(function (resolve, reject){
        database.query(`SELECT * FROM follows WHERE follower_username = '${follower}' AND followee_username = '${followee}';`, (err, res) => {
            if (err) {
                reject(err.detail)
            } else if(res.rows.length == 0) {

                database.query(`INSERT INTO follows(follower_username,followee_username) VALUES ('${follower}','${followee}');`, (err2, res2) => {
                    if (err2) {
                        reject(err2.detail);
                    }
                    else {
                        resolve(true);
                    }
                });
            } else if(res.rows.length > 0) {
                database.query(`DELETE FROM follows WHERE follower_username = '${follower}' AND followee_username = '${followee}';`, (err3, res3) => {
                    if (err3){
                        reject(err3.detail);
                    } else {
                        resolve(true);
                    }
                });
            }
        });
    });
};

artist.hasFollowed = function (follower, followee){
    return new Promise(function(resolve, reject){
        database.query(`SELECT * FROM follows WHERE follower_username = '${follower}' AND followee_username = '${followee}'`, function(err, res){
            if (err) {
                console.log(err)
                reject(err.detail) }
            else {
                if (res.rows.length == 0){
                    resolve(false);
                } else {
                    resolve(true);
                }
            }
        })
    })
};

artist.likeArt = function(username, art_id){
    return new Promise(function (resolve, reject) {
        database.query(`SELECT * FROM likes WHERE art_id = '${art_id}' AND likes.username = '${username}';`, (err, res) => {
            if (err) {
            	reject(err.detail)
            } else if(res.rows.length == 0) {

                database.query(`INSERT INTO likes(art_id,username) VALUES ('${art_id}','${username}'); UPDATE Art SET num_likes = num_likes + 1 WHERE art_id = '${art_id}';`, (err2, res2) => {
                    if (err2) {
                        reject(err2.detail);
                    }
                    else {
                        resolve(true);
                    }
                });
            } else if(res.rows.length > 0) {
                database.query(`DELETE FROM likes WHERE art_id = '${art_id}' AND username = '${username}'; UPDATE Art SET num_likes = num_likes - 1 WHERE art_id = '${art_id}';`, (err3, res3) => {
                    if (err3){
                    	reject(err3.detail);
                    } else {
                    	resolve(true);
                    }
                });
			}
        });
    });
};

artist.getArtFeed = function(username){
    followingQuery = `(SELECT followee_username FROM Follows WHERE follower_username='${username}')`
    artQuery = `SELECT * FROM Art, following WHERE Art.owner_username = following.followee_username`
    return new Promise(function (resolve, reject){
        database.query(`WITH following AS ${followingQuery} ${artQuery} ORDER BY date_posted desc`, function(err, res){
            if (err) { reject(err) }
            resolve(res.rows);
        })
    });
}

artist.updateBirthDate = function (username, birth_date) {
	return new Promise(function (resolve, reject) {
		database.query(`UPDATE Artist_Wall SET birth_date = '${birth_date}' WHERE username='${username}';`, (err, res) => {
			if (err) {
				reject(err.detail);
			} else {
				resolve(true);
			}
		})
	});
};


module.exports = artist;