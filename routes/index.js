var express = require('express');
var router = express.Router();
var passport = require('../passport');
var config = require('config');
var artist = require('../classes/Artist');
var db = require('../database');

var search = require('../classes/Search');

router.use(passport.initialize());
router.use(passport.session());
router.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});


/* GET home page. */
router.get('/', function (req, res, next) {
	state = res;
  if (req.user){
		artist.getArtFeed(req.user.username).then((res)=>{
			console.log(res.slice(0, 10));
			state.render('profile', { user : req.user, art : res.slice(0, 10) });
		}, (err)=>{
			state.render('error');
		})
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

router.get('/signout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/signup', function(req, res){
  res.render('signup');
});

/* GET profile page (requires that user is logged in) */
router.get('/profile',
  passport.ensureLoggedIn(),
  function (req, res) {
    res.render('profile', { user : req.user });
  });

router.get('/art',
    passport.ensureLoggedIn(),
    function (req, res) {
        if(req.user)
          res.render('upload');
        else
          res.render('login');
    });

router.get('/search', function(req, res){
  res.render('search');
});

/* GET stats page */
router.get('/stats', function(req, res){
	//calc variable here vartocalc
	var state = res;
	// Average number of likes per tagged art
	db.query(`SELECT tag_name, AVG(num_likes) AS avg_num_likes FROM Art, Has WHERE Art.art_id = Has.art_id GROUP BY tag_name`, (err, res) => {
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
						db.query(`SELECT MAX(foo.avg_num_likes) FROM (SELECT tag_name, AVG(num_likes) AS avg_num_likes FROM Art, Has WHERE Art.art_id = Has.art_id GROUP BY tag_name) as foo`, (err, res) => {
							if (err) {
								console.log(err);
							}
							avgLikesPopularTag = res.rows;
							db.query(`SELECT MIN(foo.avg_num_likes) FROM (SELECT tag_name, AVG(num_likes) AS avg_num_likes FROM Art, Has WHERE Art.art_id = Has.art_id GROUP BY tag_name) as foo`, (err, res) => {
								if (err) {
									console.log(err);
								}
								avgLikesUnlikedTag = res.rows;
								console.log(artCount);
								state.render('stats', {avgLikesPerTaggedArt : avgLikesPerTaggedArt, artTagCount : artTagCount, tagCount : tagCount, artCount : artCount, artistCount : artistCount, avgLikesPopularTag : avgLikesPopularTag, avgLikesUnlikedTag : avgLikesUnlikedTag});
							});
						});
					});
				});
			});
		});
	});
});

router.post('/search', function(req, res){
  state = res;
  req = req.body;
  tags = req.tags;
  if (tags){
    all_tags = tags.split(',');
    temp_tags = [] 
    for (let tag of all_tags){
      tag = tag.trim();
      temp_tags.push(tag);
    }
    all_tags = temp_tags;
    search.getArtByTags(all_tags).then((res)=>{
      state.render('search', { results : res});
    }, (err)=>{
      console.log(err);
      state.render('search');
    })
  } else {
    state.render('search');
  }
})


module.exports = router;
