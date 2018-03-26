var tag = require('./Tag');
var db = require('../database');

art = {};

art.getComments = function (art_id){
	    return new Promise(function (resolve, reject) {
        db.query(`SELECT * FROM Comment, Comments_On WHERE Comments_On.comment_id = Comment.comment_id AND Comments_On.art_id = '${art_id}' ORDER BY date_posted`, (err, res) => {
            if (err) {
                reject(err.detail);
            } else {
                resolve(res.rows);
            }
        })
    });
};

art.postArt = function (username, imgLocation, title, description, content_rating){
	return new Promise(function (resolve, reject) {
		var art_id = makeid();
		var date_posted = new Date().toLocaleString();
        db.query(`INSERT INTO Art(art_id, img_location, num_likes, date_posted, owner_username, description, content_rating, title) VALUES ('${art_id}', '${imgLocation}', '${0}', '${date_posted}','${username}','${description}','${content_rating}','${title}')`, (err, res) => {
            if (err) {
                reject(err.detail);
            } else {
                resolve(true);
            }
        })
	});
};

art.updateTag = function (art_id, tag_name){

    return new Promise(function (resolve, reject) {
        db.query(`INSERT INTO Tag(tag_name) VALUES ('${tag_name}') ON CONFLICT (tag_name) DO NOTHING; INSERT INTO Has(art_id, tag_name) VALUES ('${art_id}', '${tag_name}') ON CONFLICT (art_id, tag_name) DO NOTHING`, (err, res) => {
            if (err) {
                reject(err.detail);
            } else {
                resolve(true);
            }
        })
    });
};





module.exports = art;