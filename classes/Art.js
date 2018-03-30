var tag = require('./Tag');
var db = require('../database');

art = {};

//Generates a random 20 digit id
// Attribution: https://stackoverflow.com/a/1349426
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

art.getComments = function (art_id){
	    return new Promise(function (resolve, reject) {
        db.query(`SELECT * FROM Comment WHERE Comment.art_id = '${art_id}' ORDER BY date_posted`, (err, res) => {
            if (err) {
                reject(err.detail);
            } else {
                resolve(res.rows);
            }
        })
    });
};

art.postArt = function (username, imgLocation, title, description, tags, content_rating){
	return new Promise(function (resolve, reject) {
		var art_id = makeid();
		var date_posted = new Date().toLocaleString();

        var all_tags = tags.split(',');
        if (all_tags) {
            var temp_tags = new Array();
            for (let tag of all_tags) {
                tag = tag.trim();
                temp_tags.push('\'' + tag + '\'');
            }
            all_tags = temp_tags;
        }

        var all_tags_string = all_tags.join(',');
        //console.log(all_tags_string);
        //var test_string = ["painting","food"];
        db.query(`INSERT INTO Art(art_id, img_name, num_likes, date_posted, owner_username, description, content_rating, title) VALUES ('${art_id}', '${imgLocation}', '${0}', '${date_posted}','${username}','${description}','${content_rating}','${title}')`, (err, res) => {
            if (err) {
                reject(err.detail);
            } else {
                db.query(`INSERT INTO Tag(tag_name) VALUES (unnest(ARRAY[` + all_tags_string + `])) ON CONFLICT (tag_name) DO NOTHING; INSERT INTO Has(art_id,tag_name) VALUES ('${art_id}', unnest(ARRAY[` + all_tags_string + `]));`, (err2, res2) => {
                    if (err2) {
                        reject(err2.detail);
                    }
                    else {
                        resolve(true);
                    }
                });
            }
        });
	});
};

art.getInfo = function (art_id){
    return new Promise(function(resolve, reject){
        db.query(`SELECT * FROM Art WHERE art_id = '${art_id}'`, (err, res) => {
            if (err){ reject(err.detail) }
            else {resolve(res.rows[0]) }
        });
    })
};

art.getTags = function (art_id){
    return new Promise(function (resolve, reject){
        db.query(`SELECT * FROM Has WHERE art_id = '${art_id}'`, (err, res) => {
            if (err) {
                reject(err.detail);
            } else {
                resolve(res.rows);
            }
        });
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

art.delete = function(art_id){
    return new Promise(function (resolve, reject) {
        var deleteArt = `DELETE FROM Art WHERE Art.art_id = '${art_id}';`;
        //var deleteHas = `DELETE FROM Has WHERE Has.art_id = '${art_id}';`;
        //var deleteComment = `DELETE FROM Comment WHERE EXISTS (SELECT * FROM Comments_On WHERE Comments_On.art_id = '${art_id}' AND Comment.comment_id = Comments_On.comment_id);`;
        //var deleteCommentsOn = `DELETE FROM Comments_On WHERE Comments_On.art_id = '${art_id}';`;
        db.query(deleteArt, (err, res) => {
            if (err) {
                reject(err.detail);
            } else {
                resolve(true);
            }
        })
    });
};


// get art that is liked by every artist!!

art.allLike = function(){
    return new Promise(function(resolve, reject){
        db.query(`SELECT * FROM Art WHERE NOT EXISTS(SELECT * FROM Artist_Wall WHERE NOT EXISTS (SELECT * FROM Likes WHERE Art.art_id = Likes.art_id AND Artist_Wall.username = Likes.username))`, (err, res) => {
            if (err) {
                reject(err.detail);
            } else {
                resolve(true);
            }
        })
    });
};

module.exports = art;