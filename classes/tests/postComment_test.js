var artist = require('../artist');




var artId = 'i071PlEHxgpsGknfrqUY';
var artist_username = 'jo';
var commentString = "Databases are fun!";


var postComment = artist.postComment(artId, artist_username, commentString);

postComment.then(function (res) {
    if (res) {

        console.log('Successfully posted comment!');
    }
}).catch(function (err) {
    console.log(err);
});


