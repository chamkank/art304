var artist = require('../artist');

username = 'test4';
password = 'testpass';
email_address = 'email@email.com';
birth_date = '2018-05-17';



var likeArt = artist.likeArt('jo','Ol3WGWBPyU5hRQ1N6NyO');

likeArt.then(function(res){
    if(res){
        console.log("like/unliked");
        console.log(res);
    }
}).catch(function(err){
    console.log(err);
    console.log("error")
})


//var createUser = artist.createArtist(username, password, email_address, birth_date);
/*
createUser.then(function (res) {
    if (res) {

        console.log('Successfully added user!');
    }
}).catch(function (err) {
    console.log(err);
});

var getFollowers = artist.getFollowers('jo');

getFollowers.then(function (res) {
    if (res) {

        console.log('Successfully retrieved followers!');
        console.log(res);
    }
}).catch(function (err) {
    console.log(err);
});
*/
/*
var getInfo = artist.getInfo('jo');

getInfo.then(function (res) {
    if (res) {

        console.log('Successfully got info: ');
        console.log(res);
    }
}).catch(function (err) {
    console.log(err);
});
/*
var likeArt = artist.likeArt('jo','Ol3WGWBPyU5hRQ1N6NyO');

likeArt.then(function (res) {
    if (res) {
        console.log('Successfully added the like: ');
        console.log(res);
        console.log(res.length);
    }
}).catch(function (err) {
    console.log(err);
});*/