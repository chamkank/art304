var database = require('../database');

tag = {};


tag.createTag = function (tag_name) {
    return new Promise(function (resolve, reject) {
        database.query(`INSERT INTO Tag(tag_name) VALUES ('${tag_name}')`, (err, res) => {
            if (err) {
                reject(err.detail);
            } else {
                resolve(true);
            }
        })
    });
};


tag.getArt = function (tag_name) {
    return new Promise(function(resolve, reject){
        database.query(`SELECT * FROM Art WHERE EXISTS (SELECT * FROM Has WHERE Has.tag_name = '${tag_name}' AND Has.art_id = Art.art_id)`, (err, res) => {
            if (err){ reject(err.detail) }
            else { resolve(res.rows) }
        });
    })
};


module.exports = tag;