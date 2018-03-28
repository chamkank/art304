var art = require('../Art');

var postArt = art.postArt('joe', 'art/football_fish.JPG', "Football Fish", "A fish for which to play football", 5);

postArt.then(function(res){
    if(res){
        console.log("succesfully posted art");
        console.log(res);
    }
}).catch(function(err){
    console.log(err);
})




/*

var updateTag = art.updateTag('i071PlEHxgpsGknfrqUY', 'Super Pat');



updateTag.then(function (res) {
    if (res) {

        console.log('Successfully updated tag!');
        console.log(res);
    }
}).catch(function (err) {
    console.log(err);
});

var getComments = art.getComments('i071PlEHxgpsGknfrqUY');

getComments.then(function (res) {
    if (res) {

        console.log('Successfully got comment info: ');
        console.log(res);
    }
}).catch(function (err) {
    console.log(err);
});

var getInfo = art.getInfo('i071PlEHxgpsGknfrqUY');

getInfo.then(function(res){
    if(res){
        console.log('Successfully got info');
        console.log(res);
    }

}).catch(function(err){
    console.log(err);
});
*/