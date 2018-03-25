var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

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
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(path.dirname(__dirname),'art');
    form.parse(req, function(err, fields, files){
        if(err)
            return res.redirect('/art');

        console.log("FIELDS:");
        console.log(fields);
        console.log("FILES:");
        console.log(files);

        res.redirect('/art');
    });
})

module.exports = router;