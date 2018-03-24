var artist = require('../artist');

username = 'test3'
password = 'testpass'
email_address = 'email@email.com'
birth_date = '2018-05-17'

var createUser = artist.createArtist(username, password, email_address, birth_date)
createUser.then(function(res){
    if (res){
        console.log('Successfully added user!');
    }
}, function(err){
    console.log(err);
});
