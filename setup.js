var pool = require("./database");

let tagString = 'CREATE TABLE IF NOT EXISTS Tag(tag_name char(20) primary key);';
let artistWallString = 'CREATE TABLE IF NOT EXISTS Artist_Wall(username varchar(20) primary key, password varchar(20) NOT NULL, email_address varchar(254) unique NOT NULL, date_joined timestamp NOT NULL, birth_date date NOT NULL);';
let likesString = 'CREATE TABLE IF NOT EXISTS Likes(art_id char(20) NOT NULL references Art(art_id) ON DELETE CASCADE ON UPDATE CASCADE, username char(20) NOT NULL references Artist_Wall(username) ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY(art_id, username));';
let artString = 'CREATE TABLE IF NOT EXISTS Art(art_id char(20) primary key, img_location varchar(40) NOT NULL, num_likes int NOT NULL, date_posted timestamp NOT NULL, owner_username varchar(20) NOT NULL references Artist_Wall(username) ON DELETE CASCADE ON UPDATE CASCADE , description varchar(100) NOT NULL, content_rating varchar(20) NOT NULL, title varchar(20) NOT NULL);';
let hasString = 'CREATE TABLE IF NOT EXISTS Has(art_id char(20) NOT NULL references Art(art_id) ON DELETE CASCADE ON UPDATE CASCADE, tag_name char(20) NOT NULL references Tag(tag_name) ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY(art_id, tag_name));';
let followsString = 'CREATE TABLE IF NOT EXISTS Follows(follower_username char(20) NOT NULL references Artist_Wall(username) ON DELETE CASCADE ON UPDATE CASCADE, followee_username char(20) NOT NULL references Artist_Wall(username) ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY(follower_username, followee_username));';
let commentString = 'CREATE TABLE IF NOT EXISTS Comment(comment_id char(20) primary key, artist_username varchar(20) NOT NULL references Artist_Wall(username) ON DELETE CASCADE ON UPDATE CASCADE, art_id varchar(20) NOT NULL references Art(art_id) ON DELETE CASCADE ON UPDATE CASCADE, date_posted timestamp NOT NULL, comment_text varchar(250) NOT NULL);';
//let commentsOnString = 'CREATE TABLE IF NOT EXISTS Comments_On(comment_id char(20) references Comment(comment_id) ON DELETE CASCADE ON UPDATE CASCADE, artist_username varchar(20) references Artist_Wall(username) ON DELETE CASCADE ON UPDATE CASCADE, art_id varchar(20) references Art(art_id) ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY(comment_id, artist_username, art_id));';
// added art_id to comment and got rid of comments_on

let tagInsert2 = 'INSERT INTO Tag(tag_name) VALUES (\'painting\') ON CONFLICT (tag_name) DO NOTHING;';
let tagInsert3 = 'INSERT INTO Tag(tag_name) VALUES (\'renaissance\') ON CONFLICT (tag_name) DO NOTHING;';
let tagInsert4 = 'INSERT INTO tag(tag_name) VALUES (\'water colour\') ON CONFLICT (tag_name) DO NOTHING;';
let tagInsert1 = "INSERT INTO Tag(tag_name) VALUES (\'cats\') ON CONFLICT (tag_name) DO NOTHING;";
let tagInsert5 = "INSERT INTO Tag(tag_name) VALUES ('food');";

let artistWallInsert1 = 'INSERT INTO Artist_Wall(username,password,email_address,date_joined,birth_date) VALUES\n' +
    '(\'jo\',\'apple1234\',\'japple3@fake.mail\',\'2017-05-17 12:0:0.0\',\'2000-05-17\');';
let artistWallInsert2 = 'INSERT INTO Artist_Wall(username,password,email_address,date_joined,birth_date) VALUES\n' +
    '(\'joe\',\'apple1234\',\'japple4@fake.mail\',\'2017-05-09 12:35:0.123\',\'2000-05-09\');';
let artistWallInsert3 = 'INSERT INTO Artist_Wall(username,password,email_address,date_joined,birth_date) VALUES\n' +
    '(\'joseph\',\'apple12345\',\'japple5@fake.mail\',\'2018-01-08 12:35:29.0\',\'2000-01-08\');';
let artistWallInsert4 = 'INSERT INTO Artist_Wall(username,password,email_address,date_joined,birth_date) VALUES\n' +
    '(\'joel\',\'apple123456\',\'japple6@fake.mail\',\'2018-01-08 12:35:29.123\',\'2000-01-08\');';

let artistWallInsert5 = "INSERT INTO Artist_Wall(username,password,email_address,date_joined,birth_date) VALUES (\n" +
    "'jody','apple1234567','japple7@fake.mail','2018-01-08 12:35:29.123','2001-01-08');";


let followsInsert1 = 'INSERT INTO Follows(follower_username, followee_username) VALUES (\'jo\',\'joel\');';
let followsInsert2 = 'INSERT INTO Follows(follower_username,followee_username) VALUES (\'joel\',\'jo\');';
let followsInsert3 = 'INSERT INTO Follows(follower_username,followee_username) VALUES (\'joseph\',\'joel\');';
let followsInsert4 = 'INSERT INTO Follows(follower_username,followee_username) VALUES (\'joel\',\'joseph\');';
let followsInsert5 = "INSERT INTO Follows(follower_username,followee_username) VALUES ('jody','joel');";

let artInsert1 = 'INSERT INTO Art(art_id, img_location, num_likes, date_posted, owner_username,' +
    ' content_rating, title, description) VALUES (\'i071PlEHxgpsGknfrqUY\',' +
    '\'img/i071PlEHxgpsGknfrqUY.jpg\', 5, \'2017-05-17 12:0:0.0\', \'jo\', \'E\', \'Apple\', \'Basic food!\');';

let artInsert2 = "INSERT INTO Art(art_id, img_location, num_likes, date_posted, owner_username,\n" +
    "    content_rating, title, description) VALUES ('Ol3WGWBPyU5hRQ1N6NyO',\n" +
    "'img/Ol3WGWBPyU5hRQ1N6NyO.jpg', 0, '2017-05-09 12:35:0.123', 'jo', 'E', 'Cat!', 'My first\n" +
    "painting');";

let artInsert3 = "INSERT INTO Art(art_id, img_location, num_likes, date_posted, owner_username,\n" +
    "    content_rating, title, description) VALUES ('dvnKPdagczbod4DTB0XG',\n" +
    "'img/dvnKPdagczbod4DTB0XG.png', 0, '2018-01-08 12:35:29.0', 'jo', 'E', 'Coconut', 'Inspired by\n" +
    "my first trip to Hawaii');";

let artInsert4 = "INSERT INTO Art(art_id, img_location, num_likes, date_posted, owner_username,\n" +
    "    content_rating, title, description) VALUES ('ppr9KJ5rWbTxdtr6xVT3',\n" +
    "'img/ppr9KJ5rWbTxdtr6xVT3.png', 0, '2018-01-08 12:35:29.123', 'joseph', 'E', 'Dodo', 'I tried to\n" +
    "draw a bird');";

let artInsert5 = "INSERT INTO Art(art_id, img_location, num_likes, date_posted, owner_username,\n" +
    "    content_rating, title, description) VALUES ('Qe9KNLi6L0CLCT2i68FB',\n" +
    "'img/Qe9KNLi6L0CLCT2i68FB.svg', 0, '2018-01-08 12:35:29.123', 'joel', 'R', 'Renaissance?', 'I\n" +
    "love watercolour!');";


let commentInsert1 = "INSERT INTO Comment(comment_id,artist_username, art_id, date_posted,comment_text) VALUES('YUqrfnkGspgxHElP170i','jo', 'i071PlEHxgpsGknfrqUY', '2017-05-17 12:0:0.0','Wow');";
let commentInsert2 = "INSERT INTO Comment(comment_id,artist_username, art_id, date_posted,comment_text) VALUES('OyN6N1QRh5UyPBWGW3lO','jo', 'i071PlEHxgpsGknfrqUY', '2017-05-09 12:35:0.123','Cool');";
let commentInsert3 = "INSERT INTO Comment(comment_id,artist_username, art_id, date_posted,comment_text) VALUES('GX0BTD4dobzcgadPKnvd','joe', 'Ol3WGWBPyU5hRQ1N6NyO', '2018-01-08 12:35:29.0','Wicked');";
let commentInsert4 = "INSERT INTO Comment(comment_id,artist_username, art_id, date_posted,comment_text) VALUES('i43TVx6rtdxTbWr5JK9r','joseph', 'dvnKPdagczbod4DTB0XG', '2018-01-08 12:35:29.123','Awesome');";
let commentInsert5 = "INSERT INTO Comment(comment_id,artist_username, art_id, date_posted,comment_text) VALUES('3TVx6rtdxTbWr5JK9rp','joel', 'ppr9KJ5rWbTxdtr6xVT3', '2018-01-08 12:35:29.123','Wow this is cool');";

let likesInsert1 = "INSERT INTO Likes(username,art_id) VALUES ('jo', 'i071PlEHxgpsGknfrqUY');";
let likesInsert2 = "INSERT INTO Likes(username,art_id) VALUES ('joe', 'i071PlEHxgpsGknfrqUY');";
let likesInsert3 = "INSERT INTO Likes(username,art_id) VALUES ('joseph', 'i071PlEHxgpsGknfrqUY');";
let likesInsert4 = "INSERT INTO Likes(username,art_id) VALUES ('joel', 'i071PlEHxgpsGknfrqUY');";
let likesInsert5 = "INSERT INTO Likes(username,art_id) VALUES ('jody', 'i071PlEHxgpsGknfrqUY');";
/*
let commmentsOnInsert1 = "INSERT INTO Comments_On(comment_id,artist_username,art_id) VALUES('YUqrfnkGspgxHElP170i','jo','i071PlEHxgpsGknfrqUY');";
let commmentsOnInsert2 = "INSERT INTO Comments_On(comment_id,artist_username,art_id) VALUES('OyN6N1QRh5UyPBWGW3lO','jo','i071PlEHxgpsGknfrqUY');";
let commmentsOnInsert3 = "INSERT INTO Comments_On(comment_id,artist_username,art_id) VALUES('GX0BTD4dobzcgadPKnvd','joe','Ol3WGWBPyU5hRQ1N6NyO');";
let commmentsOnInsert4 = "INSERT INTO Comments_On(comment_id,artist_username,art_id) VALUES('i43TVx6rtdxTbWr5JK9r','joseph','dvnKPdagczbod4DTB0XG');";
let commmentsOnInsert5 = "INSERT INTO Comments_On(comment_id,artist_username,art_id) VALUES('i43TVx6rtdxTbWr7JK9','joel','ppr9KJ5rWbTxdtr6xVT3');";
*/


let hasInsert1 = "INSERT INTO Has(art_id,tag_name) VALUES ('i071PlEHxgpsGknfrqUY', 'cats');";
let hasInsert2 = "INSERT INTO Has(art_id,tag_name) VALUES ('i071PlEHxgpsGknfrqUY', 'painting');";
let hasInsert3 = "INSERT INTO Has(art_id,tag_name) VALUES ('Ol3WGWBPyU5hRQ1N6NyO' ,'cats');";
let hasInsert4 = "INSERT INTO Has(art_id,tag_name) VALUES ('Ol3WGWBPyU5hRQ1N6NyO' ,'renaissance');";
let hasInsert5 = "INSERT INTO Has(art_id,tag_name) VALUES ('dvnKPdagczbod4DTB0XG' ,'water colour');";


pool.query(tagString + artistWallString + followsString + artString + commentString + likesString + hasString, (err, res) => {
    if(err) {
        return console.error('error running query', err);
    }
    pool.query(tagInsert1 + tagInsert2 + tagInsert3 + tagInsert4 + tagInsert5 + artistWallInsert1 + artistWallInsert2 + artistWallInsert3 + artistWallInsert4 + artistWallInsert5 + artInsert1 + artInsert2 + artInsert3 + artInsert4 + artInsert5 + commentInsert1 + commentInsert2 + commentInsert3 + commentInsert4 + commentInsert5 + followsInsert1 + followsInsert2 + followsInsert3 + followsInsert4 + followsInsert5 + hasInsert1 + hasInsert2 + hasInsert3 + hasInsert4 + hasInsert5 + likesInsert1 + likesInsert2 + likesInsert3 + likesInsert4 + likesInsert5, (err, res) => {

        if(err) {
            return console.error('error running query', err);
        }
    });
});





/*
pool.query('DROP TABLE IF EXISTS comment', (err, res) => {

    console.log(err);
    console.log(res);

});

*/



/*
pool.query('DELETE FROM follows', (err, res) => {

    console.log(err);
    console.log(res);

});
*/


















