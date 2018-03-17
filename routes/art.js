var express = require('express');
var router = express.Router();

// GET (render) art by ID
router.get('/:id', function(req, res, next){
    // Render a piece of art here
})

// DELETE art by ID
router.delete('/:id', function(req, res, next){
    // Call function to delete a piece of art by its ID
    // Redirect user to their wall
})

// POST art
router.post('/', function(req, res, next){
    // Call function create art
    // Redirect user to that art
})