// Handles artist authentication

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
var db = require("./database");
var connect = require('connect-ensure-login');

passport.use(new LocalStrategy((username, password, done) => {
    db.query('SELECT * FROM Artist_Wall WHERE username=$1', [username], (err, result) => {
        if (err) {
            console.error('User not found', err);
            return done(err)
        }
        if (result.rows.length > 0) {
            const artist = result.rows[0];
            if (artist.password == password) {
                done(null, { username: artist.username });
            } else {
                done(null, false); // failed
            }
        } else {
            done(null, false); // failed
        }
    });
}));

// for maintaining user sessions

passport.serializeUser((artist, done) => {
    done(null, artist.username);
});

passport.deserializeUser((username, done) => {
    db.query('SELECT * FROM Artist_Wall WHERE username = $1', [username], (err, results) => {
        if (err) {
            console.error('Error when deserializing user', err);
            return done(err);
        } 
        done(null, results.rows[0]);
    })
})

passport.ensureLoggedIn = connect.ensureLoggedIn;

module.exports = passport;