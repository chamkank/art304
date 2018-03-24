

var pool = require("./database");

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
    "'jody','apple1234567','japple7@fake.mail','2018-01-08 12:35:29.123','2001-01-08')";


let followsInsert1 = 'INSERT INTO Follows(follower_username, followee_username) VALUES (\'jo\',\'joel\');';
let followsInsert2 = 'INSERT INTO Follows(follower_username,followee_username) VALUES (\'joel\',\'jo\');';
let followsInsert3 = 'INSERT INTO Follows(follower_username,followee_username) VALUES (\'joseph\',\'joel\');';
let followsInsert4 = 'INSERT INTO Follows(follower_username,followee_username) VALUES (\'joel\',\'joseph\');';
let followsInsert5 = "INSERT INTO Follows(follower_username,followee_username) VALUES ('jody','joel')";

let artInsert1 = 'INSERT INTO Art(art_id, img_location, num_likes, date_posted, owner_username,' +
    ' content_rating, title, description) VALUES (\'i071PlEHxgpsGknfrqUY\',' +
    '\'img/i071PlEHxgpsGknfrqUY.jpg\', 100000, \'2017-05-17 12:0:0.0\', \'jo\', \'E\', \'Apple\', \'Basic food!\');';

let artInsert2 = "INSERT INTO Art(art_id, img_location, num_likes, date_posted, owner_username,\n" +
    "    content_rating, title, description) VALUES ('Ol3WGWBPyU5hRQ1N6NyO',\n" +
    "'img/Ol3WGWBPyU5hRQ1N6NyO.png', 2, '2017-05-09 12:35:0.123', 'jo', 'E', 'Banana', 'My first\n" +
    "painting');";

let artInsert3 = "INSERT INTO Art(art_id, img_location, num_likes, date_posted, owner_username,\n" +
    "    content_rating, title, description) VALUES ('dvnKPdagczbod4DTB0XG',\n" +
    "'img/dvnKPdagczbod4DTB0XG.png', 1, '2018-01-08 12:35:29.0', 'jo', 'E', 'Coconut', 'Inspired by\n" +
    "my first trip to Hawaii');";

let artInsert4 = "INSERT INTO Art(art_id, img_location, num_likes, date_posted, owner_username,\n" +
    "    content_rating, title, description) VALUES ('ppr9KJ5rWbTxdtr6xVT3',\n" +
    "'img/ppr9KJ5rWbTxdtr6xVT3.png', 0, '2018-01-08 12:35:29.123', 'joseph', 'E', 'Dodo', 'I tried to\n" +
    "draw a bird');";

let artInsert5 = "INSERT INTO Art(art_id, img_location, num_likes, date_posted, owner_username,\n" +
    "    content_rating, title, description) VALUES ('Qe9KNLi6L0CLCT2i68FB',\n" +
    "'img/Qe9KNLi6L0CLCT2i68FB.svg', 0, '2018-01-08 12:35:29.123', 'joel', 'R', 'Renaissance?', 'I\n" +
    "love watercolour!');";


let commentInsert1 = "INSERT INTO Comment(comment_id,artist_username,date_posted,comment_text) VALUES('YUqrfnkGspgxHElP170i','jo','2017-05-17 12:0:0.0','Wow');";
let commentInsert2 = "INSERT INTO Comment(comment_id,artist_username,date_posted,comment_text) VALUES('OyN6N1QRh5UyPBWGW3lO','jo','2017-05-09 12:35:0.123','Cool');";
let commentInsert3 = "INSERT INTO Comment(comment_id,artist_username,date_posted,comment_text) VALUES('GX0BTD4dobzcgadPKnvd','joe','2018-01-08 12:35:29.0','Wicked');";
let commentInsert4 = "INSERT INTO Comment(comment_id,artist_username,date_posted,comment_text) VALUES('i43TVx6rtdxTbWr5JK9r','joseph','2018-01-08 12:35:29.123','Awesome');";
let commentInsert5 = "INSERT INTO Comment(comment_id,artist_username,date_posted,comment_text) VALUES('i43TVx6rtdxTbWr7JK9','joseph','2018-01-08 12:35:29.123','Awesome');";
let commentInsert6 = "INSERT INTO Comment(comment_id,artist_username,date_posted,comment_text) VALUES('3TVx6rtdxTbWr5JK9rp','joel','2018-01-08 12:35:29.123','Wow this is cool');";



let likesInsert1 = "INSERT INTO Likes(username,art_id) VALUES ('jo', 'i071PlEHxgpsGknfrqUY');";
let likesInsert2 = "INSERT INTO Likes(username,art_id) VALUES ('jo', 'Ol3WGWBPyU5hRQ1N6NyO');";
let likesInsert3 = "INSERT INTO Likes(username,art_id) VALUES ('joseph', 'i071PlEHxgpsGknfrqUY');";
let likesInsert4 = "INSERT INTO Likes(username,art_id) VALUES ('joel', 'i071PlEHxgpsGknfrqUY');";
let likesInsert5 = "INSERT INTO Likes(username,art_id) VALUES ('jody', 'i071PlEHxgpsGknfrqUY');";

let commmentsOnInsert1 = "INSERT INTO Comments_On(comment_id,artist_username,art_id) VALUES('YUqrfnkGspgxHElP170i','jo','i071PlEHxgpsGknfrqUY');";
let commmentsOnInsert2 = "INSERT INTO Comments_On(comment_id,artist_username,art_id) VALUES('OyN6N1QRh5UyPBWGW3lO','jo','i071PlEHxgpsGknfrqUY');";
let commmentsOnInsert3 = "INSERT INTO Comments_On(comment_id,artist_username,art_id) VALUES('GX0BTD4dobzcgadPKnvd','joe','Ol3WGWBPyU5hRQ1N6NyO');";
let commmentsOnInsert4 = "INSERT INTO Comments_On(comment_id,artist_username,art_id) VALUES('i43TVx6rtdxTbWr5JK9r','joseph','dvnKPdagczbod4DTB0XG');";
let commmentsOnInsert5 = "INSERT INTO Comments_On(comment_id,artist_username,art_id) VALUES('i43TVx6rtdxTbWr7JK9','joel','ppr9KJ5rWbTxdtr6xVT3');";



let hasInsert1 = "INSERT INTO Has(art_id,tag_name) VALUES ('i071PlEHxgpsGknfrqUY', 'cats');";
let hasInsert2 = "INSERT INTO Has(art_id,tag_name) VALUES ('i071PlEHxgpsGknfrqUY', 'painting');";
let hasInsert3 = "INSERT INTO Has(art_id,tag_name) VALUES ('Ol3WGWBPyU5hRQ1N6NyO ' ,'cats')";
let hasInsert4 = "INSERT INTO Has(art_id,tag_name) VALUES ('Ol3WGWBPyU5hRQ1N6NyO ' ,'renaissance');";
let hasInsert5 = "INSERT INTO Has(art_id,tag_name) VALUES ('dvnKPdagczbod4DTB0XG' ,'water colour');";


    pool.query(followsInsert5 , (err, res) => {

    if(err) {
        return console.error('error running query', err);
    }
});



pool.query('select * from comments_on', (err, res) => {

    if(err) {
        return console.error('error running query', err);
    }
    console.log(res.rows);
});




















