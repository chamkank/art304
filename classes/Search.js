var db = require('../database');
var art = require('./Art');
var tag = require('./Tag');

search = {}

/* Returns all art that contain ALL of the tags specified */
search.getArtByTags = function (tags){
    // WITH ids as (SELECT art_id FROM Has WHERE tag_name = 'painting' INTERSECT ...) SELECT * FROM ids, Art where Art.art_id = ids.art_id;
    let selects = [];
    for (let tag of tags){
        select = `SELECT art_id FROM Has WHERE tag_name = '${tag}'`;
        selects.push(select); 
    }
    let query = selects.join(' INTERSECT ');
    query = 'WITH ids as' + '(' + query + ') SELECT * FROM ids, Art where Art.art_id = ids.art_id;';
    console.log(query)
    return new Promise(function(resolve, reject){
        db.query(query, function(err, res){
            if (err) {
                reject(console.log(err.detail));
            }
            resolve(res.rows);
        });  
    });
    
    // Promise-based version:
    /** return new Promise(function(resolve, reject){
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
    }); **/
}





module.exports = search;