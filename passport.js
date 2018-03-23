// Handles artist authentication

var passport = require('passport-local');
var db = require("./database");

passport.use(new LocalStrategy((username, password, done) => {
    db.query('SELECT username, password, FROM Artist_Wall WHERE username=$1', [username], (err, result) => {
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
    db.query('SELECT username FROM Artist_Wall WHERE id = $1', [username], (err, results) => {
        if (err) {
            console.error('Error when deserializing user', err);
            return done(err);
        } 
        done(null, results.rows[0]);
    })
})