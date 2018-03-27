var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var art = require('../classes/Art');

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
    var user = req.session.passport.user;
    //console.log(user);
    var form = new formidable.IncomingForm();
    var artDirectory = path.join(path.dirname(__dirname),'art');
    form.uploadDir = artDirectory;
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files){
        if(err)
            return res.redirect('/art');

        // For testing purposes
        console.log("FIELDS:");
        console.log(fields);
        console.log("FILES:");
        console.log(files);

        //var imgLocation = JSON.stringify(path.relative(path.dirname(__dirname),files.art.path));
        //console.log(imgLocation);

        var fileName = (path.basename(files.art.path)).replace("upload_", "");
        var filePathUpdate = "art\\\\"+fileName;
        fs.renameSync(files.art.path,filePathUpdate);
        var imgLocation = fileName;
        var state = res;
        // TODO: Complete implementation
        // Adding tags needs to be taken care of seperately
        // Using jo as a place holder; need to use actual user
        // res.redirect throws an error
        // database needs to allows more chars form image location path; currently storing image name
        // found in art directory of the root
        art.postArt(user, imgLocation, fields.title, fields.description, fields.rating).then(function (res) {
            if (res) {
                console.log('Art added succesfully');
                state.redirect('/art');
            }
        }).catch(function (err) {
            console.log("there is an error");
            res.redirect('/art');
        });
    });
})

module.exports = router;