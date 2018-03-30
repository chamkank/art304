var express = require('express');
var router = express.Router();
var artist = require('../classes/Artist');
var registry = require('../classes/Registry');
var passport = require('../passport');

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

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
       var art = res;
        var owner = false;
        if(req.user){
            artist.hasFollowed(req.user.username, username).then((res)=>{
                if(req.user.username == username){
                    owner = true;
                }
                return state.render('artist', {art : art, username : username, owner : owner, follows : res});
            }, (err) => {
                return state.render('404');
            })
        } else {
            return state.render('artist', {art : art, username : username, owner : owner});
        }
    }).catch(function(err){
        console.log(err);
        return state.render('404')
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
      state.render('signup', { failed : true, error : err });
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

router.get('/:username/followers', passport.ensureLoggedIn(), function(req, res, next){
    var username = req.params.username;
    req = req.body;
    state = res;

    var followers = artist.getFollowers(username);
    followers.then(function(res){
        if(res){
            console.log("Successfully retrieved followers!");
            state.render('followers', {artists : res});
        }
    }).catch(function(err){
        console.log(err);
        state.render('errpr');
    })
});




router.post('/:username/follow', passport.ensureLoggedIn(), function(req, res, next){
    var followee_username = req.params.username;
    var follower_username = req.user.username;
    state = res;
    artist.followArtist(follower_username, followee_username).then((res)=>{
        state.redirect('/artists/'+followee_username); // refresh page
    }, (err)=>{
        console.log(err);
    })
});

module.exports = router;
