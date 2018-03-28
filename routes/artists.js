var express = require('express');
var router = express.Router();
var artist = require('../classes/Artist');
var registry = require('../classes/Registry');


/*  (render) artists listing. */
router.get('/', function(req, res, next) {
  // Render the list of artists here.
    state = res;
    var allArtists = registry.getArtists();
    allArtists.then(function(res){
        if(res){
            console.log("Successfully retrieved artists!");
            state.render('artists', {artists : res}); //should be template
        }
    }).catch(function(err){
        console.log(err);
        state.render('error')
    })
});

/* GET (render) specific artist by ID */
router.get('/:username', function(req, res, next) {
  // Render the artist's page (wall) here
    var username = req.params.username;
    state = res;
    artistArt = artist.getArt(username);

    artistArt.then(function(res){
        console.log("successfully got art");
        console.log(res);
        state.render('artist', {art : res, username : username});
    }).catch(function(err){
        console.log(err);
        state.render('error')
    })
});

/* POST to artists (create new artist) */
router.post('/', function(req, res, next) {
  // Call function to create new artist
  // Reroute user to their wall
  req = req.body;
  state = res;
  createArtist = artist.createArtist(req.username, req.password, req.email_address, req.birth_date)
  createArtist.then(function (res) {
    if (res) {
        console.log('Successfully added user!');
        state.redirect('/login');
    }
  }).catch(function (err) {
      console.log(err);
      state.render('signup', { failed : true });
  });
});

/* DELETE an artist by ID */ 
router.delete('/:username', function(req, res, next){
  // Call a function to delete artist

});

router.get('/:username/followees', function(req, res, next){
    var username = req.params.username;
    req = req.body;
    state = res;

    var artistsFollowed = artist.getFollowees(username);
    artistsFollowed.then(function(res){
        if(res){
            console.log("Successfully retrieved followees!");
            state.render('follow', {artists : res});
        }
    }).catch(function(err){
        console.log(err);
        state.render('errpr');
    })
});

module.exports = router;
