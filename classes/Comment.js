var db = require('../database');

comment = {};

//Generates a random 20 digit id
// Attribution: https://stackoverflow.com/a/1349426
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

comment.getInfo = function (comment_id){
	return new Promise(function (resolve, reject) {
        db.query(`SELECT * FROM comment WHERE comment_id = '${comment_id}' ORDER BY date_posted`, (err, res) => {
            if (err) {
                reject(err.detail);
            } else {
                resolve(res.rows);
            }
        })
    });
}
comment.postComment = function (art_id, owner_username, comment_text){
    return new Promise(function (resolve, reject) {
        var datetime = new Date().toLocaleString();
        comment_id = makeid();

        query = `INSERT INTO Comment(comment_id,artist_username, art_id, date_posted,comment_text) VALUES('${comment_id}','${owner_username}', '${art_id}', '${datetime}','${comment_text}');`
        db.query(query, function(err, res){
            if (err) {
                reject(err.detail);
            } else {
                resolve(true);
            }
        })
    });
}
module.exports = comment;