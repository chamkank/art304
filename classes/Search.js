var db = require('../database');
var art = require('./Art');
var tag = require('./Tag');

search = {}

/* Returns all art that contain ANY of the tags specified */
search.getArtByTags = function (tags){
    return new Promise(function(resolve, reject){
        var matching_art = [];
        var counter = 0;
        tags.forEach((element, index, array) => {
            tag.getArt(element).then(function(res){
                matching_art.push(res);
                counter++;
                if (counter == array.length){
                    resolve(matching_art);
                }
            }, function(err){
                reject(err);
            })
        });
    });
}

module.exports = search;