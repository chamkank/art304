var database = require("../database");

// query example
database.query("SELECT * from films;", (err, res) => {
    console.log(res.rows[0]);
});




/*
var pg = require('pg');
var config = require('config');
var { Pool, ___ } = require('pg');
var conString = config.get('db.conString');


var client = new pg.Client(conString);



function createTable(tableString){
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        client.query(tableString, function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            client.end();
        });
    });
}

function deleteTable(tableName){
    let deleteString = 'DROP TABLE IF EXISTS ';
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        client.query(deleteString + tableName, function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            client.end();
        });
    });


}
*/

//let createTableQuery = `CREATE TABLE IF NOT EXISTS test_table(t_id bigint primary key, co2_field varchar(40) NOT NULL, temp_field int NOT NULL, quality_field decimal NOT NULL, reading_time_field timestamp NULL)`
let tagString = 'CREATE TABLE IF NOT EXISTS Tag(tag_name char(20) primary key);';
let artistString = 'CREATE TABLE IF NOT EXISTS Artist(username varchar(20) primary key, password varchar(20), email_address varchar(254), date_joined timestamp, birthdate timestamp);';
let likesString = 'CREATE TABLE IF NOT EXISTS likes(art_id char(20) primary key references Art(art_id) ON DELETE CASCADE ON UPDATE CASCADE, username char(20) references Artist(username) ON DELETE CASCADE ON UPDATE CASCADE);';
let artString = 'CREATE TABLE IF NOT EXISTS Art(art_id char(20) primary key, img_location varchar(40), num_likes int, date_posted timestamp, username varchar(20) references Artist(username) ON DELETE CASCADE ON UPDATE CASCADE , description varchar(100), content_rating varchar(20), title varchar(20));';
let hasString = 'CREATE TABLE IF NOT EXISTS Has(art_id char(20) references Art(art_id) ON DELETE CASCADE ON UPDATE CASCADE, tag_name char(20) references Tag(tag_name) ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY(art_id, tag_name));';
// let followsString




//deleteTable('testArtist');
//createTable(artistString + tagString + artString + likesString + hasString);















