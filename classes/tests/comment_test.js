var tag = require('../Comment');

var getInfo = comment.getInfo('i43TVx6rtdxTbWr5JK9r');

getInfo.then(function (res) {
    if (res) {

        console.log('Successfully got comment info: ');
        console.log(res);
    }
}).catch(function (err) {
    console.log(err);
});