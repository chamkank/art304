var tag = require('../tag');


var tagName = 'Patrick Fan Club';

var createTag = tag.createTag(tagName);

createTag.then(function (res) {
    if (res) {
        console.log('Successfully added Tag!');
    }
}).catch(function (err) {
    console.log(err);
});



var getArt = tag.getArt('painting');



getArt.then(function (res) {
    if (res) {

        console.log('Successfully retrieved art!');
        console.log(res);
    }
}).catch(function (err) {
    console.log(err);
});

