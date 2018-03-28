var express = require('express');
var router = express.Router();
var passport = require('../passport');
var config = require('config');
var db = require('../database');

router.use(passport.initialize());
router.use(passport.session());

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.user){
    res.render('profile', { user : req.user });
  } else {
    res.render('home');
  }
});

router.get('/loginfailed', function(req, res){
  res.render('login', { failed : true })
});

/* GET login page */
router.get('/login', function(req, res) {
  res.render('login');
});

/* POST login page (used to login) */
router.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/loginfailed' }));

/* POST login page (used to login from failed login page) */
router.post('/loginfailed', passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/loginfailed' }));

router.get('/signup', function(req, res){
  res.render('signup');
});

/* GET profile page (requires that user is logged in) */
router.get('/profile',
  passport.ensureLoggedIn(),
  function (req, res) {
    res.render('profile', { user : req.user });
  });

router.get('/art', function(req, res){
  res.render('upload');
});

//TODO
/* GET stats page */
router.get('/stats', function(req, res){
	//calc variable here vartocalc
	var state = res;
	// Average number of likes per tagged art
	db.query(`SELECT tag_name, AVG(num_likes) AS avg_num_likes FROM Art, Has WHERE Art.art_id = Has.art_id GROUP BY tag_name, num_likes`, (err, res) => {
		if (err) {
			console.log(err);
		}
		avgLikesPerTaggedArt = res.rows;
		// Number of art for each tag
		db.query(`SELECT tag_name, COUNT(tag_name) FROM Has GROUP BY tag_name`, (err, res) => {
			if (err) {
				console.log(err);
			}
			artTagCount = res.rows;
			// Number of tags
			db.query(`SELECT COUNT(tag_name) FROM tag`, (err, res) => {
				if (err) {
					console.log(err);
				}
				tagCount = res.rows;
				// Number of art
				db.query(`SELECT COUNT(art_id) FROM art`, (err, res) => {
					if (err) {
						console.log(err);
					}
					artCount = res.rows;
					// Number of artists
					db.query(`SELECT COUNT(username) FROM artist_wall`, (err, res) => {
						if (err) {
							console.log(err);
						}
						artistCount = res.rows;
						// The most popular tag has this many likes on average (nested aggregation)
						db.query(`SELECT MAX(foo.avg_num_likes) FROM (SELECT tag_name, AVG(num_likes) AS avg_num_likes FROM Art, Has WHERE Art.art_id = Has.art_id GROUP BY tag_name, num_likes) as foo`, (err, res) => {
							if (err) {
								console.log(err);
							}
							avgLikesPopularTag = res.rows;
							console.log(avgLikesPerTaggedArt);
							console.log(tagCount);
							state.render('stats', {avgLikesPerTaggedArt : avgLikesPerTaggedArt, artTagCount : artTagCount, tagCount : tagCount, artCount : artCount, artistCount : artistCount, avgLikesPopularTag : avgLikesPopularTag});
						});
					});
				});
			});
		});
	});
});

module.exports = router;
