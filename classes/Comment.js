var db = require('../database');

comment = {};

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

module.exports = comment;