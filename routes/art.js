var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var art = require('../classes/Art');
var db_comment = require('../classes/Comment');
var passport = require('../passport');
var artist = require('../classes/Artist');

router.use(passport.initialize());
router.use(passport.session());

// GET (render) art by ID
router.get('/:id', function(req, res, next){
    art_id = req.params.id;
    art_info = {};
    comments = {};
    state = res;
    art.getInfo(art_id).then((res)=>{
        art_info = res;
    }, (err)=>{
        console.log(err);
    }).then((res)=>{
        art.getComments(art_id).then((res)=>{
            comments = []
            for (let comment of res){
                comment.date_posted = comment.date_posted.toLocaleDateString() + ' ' + comment.date_posted.toLocaleTimeString()
                comments.push(comment);
            }
            owner = false;
            if (req.user && req.user.username == art_info.owner_username){
                if (req.user.username){
                    artist.hasLiked(req.user.username, art_id).then((res)=>{            
                        if (Object.keys(art_info).length == 0){
                            return state.render('404');
                        } else {
                            return state.render('art', { art_info : art_info, comments : comments, owner : owner, user : req.user, liked : res})
                        }
                    }, (err) => {
                        return state.render('error');
                    })
                }
                owner = true;
            }
        },(err)=>{
            return state.render('404');
        })
    })
})

// DELETE art by ID
router.delete('/:id', function(req, res, next){
    // Call function to delete a piece of art by its ID
    // Redirect user to their wall
    var art_id = req.params.id;
});

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
        // Using jo as a place holder; need to use actual user (done?)
        // res.redirect throws an error
        // database needs to allows more chars form image location path; currently storing image name
        // found in art directory of the root
        // need two different pages for succesful and not succesful adding of art
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

/* Post comment to art */
router.post('/:id/comment', passport.ensureLoggedIn(), function(req, res, next){
    state = res
    comment_text = req.body.comment_text
    comment_owner = req.user.username;
    db_comment.postComment(req.params.id, req.user.username, req.body.comment_text).then(
        (res)=>{    
            state.redirect('/art/'+req.body.art_id); // refresh page
        },
        (err)=>{
            console.log(err);
            state.render('unauthorized');
        }
    );
})

/* Request to like/unlike art */
router.post('/:id/like', passport.ensureLoggedIn(), function(req, res, next){
    state = res;
    artist.likeArt(req.user.username, req.body.art_id).then((res)=>{
        state.redirect('/art/'+req.body.art_id); // refresh page
    }, (err)=>{
        console.log(err);
    })
})

module.exports = router;