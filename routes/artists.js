var express = require('express');
var router = express.Router();
var artist = require('../classes/Artist');

/*  (render) artists listing. */
router.get('/', function(req, res, next) {
  // Render the list of artists here.
});

/* GET (render) specific artist by ID */
router.get('/:id', function(req, res, next) {
  // Render the artist's page (wall) here
})

/* POST to artists (create new artist) */
router.post('/', function(req, res, next) {
  // Call function to create new artist
  // Reroute user to their wall
  req = req.body;
  state = res
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
})

/* DELETE an artist by ID */ 
router.delete('/:id', function(req, res, next){
  // Call a function to delete artist
})

module.exports = router;
