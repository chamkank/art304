var db = require('../database');

registry = {};

// returns all tags in database
registry.getTags = () => {
    return new Promise(function (resolve, reject) {
        db.query("SELECT * from Tag", (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        })
    })
};

// returns all art in database
registry.getArt = () => {
    return new Promise(function (resolve, reject) {
        db.query("SELECT * from Art", (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        })
    })
};


// returns all artists in database

registry.getArtists = () => {
    return new Promise(function (resolve, reject) {
        db.query("SELECT * from Artist_Wall", (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        })

    })
};


// returns all comments in database
registry.getComments = () => {
    return new Promise(function (resolve, reject) {
        db.query("SELECT * from Comment", (err, res) => {
            if (err) {
                reject(err)
            }
        resolve(res.rows);
        })
    })
};

module.exports = registry;