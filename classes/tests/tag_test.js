var tag = require('../tag');

var getArt = tag.getArt('painting');

getArt.then(function (res) {
    if (res) {

        console.log('Successfully retrieved art!');
        console.log(res);
    }
}).catch(function (err) {
    console.log(err);
});
