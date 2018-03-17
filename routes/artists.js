var express = require('express');
var router = express.Router();

/* GET artists listing. */
router.get('/', function(req, res, next) {
  // Render the list of artists here.
});

/* GET specific artist by ID */
router.get('/:id', function(req, res, next) {
  // Render the artist's page (wall) here
})

/* POST to artists (create new artist) */
router.post('/', function(req, res, next) {
  // Call function to create new artist
  // Reroute user to their wall
})

/* DELETE an artist by ID */ 
router.delete('/:id', function(req, res, next){
  // Call a function to delete artist
})

module.exports = router;
