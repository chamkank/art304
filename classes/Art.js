var db = require('../database');
var tag = require('./Tag');

art = {};

art.getComments = function (art_id){
	database.query("SELECT * FROM Comment, Comments_On WHERE Comments_On.comment_id = Comment.comment_id AND Comments_On.art_id = ${art_id} ORDER BY Date DESC, Time DESC", (err, res) => {
		console.log(res.rows);
		return res.rows;
	})
};


art.updateTag = function (art_id, tag_name){


    return new Promise(function (resolve, reject) {
        db.query(`INSERT INTO Tag(tag_name) VALUES ('${tag_name}') ON CONFLICT (tag_name) DO NOTHING`, (err, res) => {
            if (err) { reject(err.detail) }
            db.query(`INSERT INTO Has(art_id, tag_name) VALUES ('${art_id}', '${tag_name}', ON CONFLICT (art_id, tag_name) DO NOTHING)`, (err, res) => {
                if (err) { reject(err.detail) }
                else { resolve(true) }
            });
        });
    });



};





module.exports = art;