var tag = require('../Art');




var updateTag = art.updateTag('i071PlEHxgpsGknfrqUY', 'Super Pat');



updateTag.then(function (res) {
    if (res) {

        console.log('Successfully updated tag!');
        console.log(res);
    }
}).catch(function (err) {
    console.log(err);
});