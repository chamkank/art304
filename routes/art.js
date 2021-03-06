var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var art = require('../classes/Art');
var db_comment = require('../classes/Comment');
var passport = require('../passport');
var artist = require('../classes/Artist');
var taggle = require('taggle');

router.use(passport.initialize());
router.use(passport.session());
router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

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
            if (req.user){
                artist.hasLiked(req.user.username, art_id).then((res)=>{            
                    if (Object.keys(art_info).length == 0){
                        return state.render('404');
                    } else {
                        if (req.user.username == art_info.owner_username){
                            owner = true;
                        }
                        return state.render('art', { art_info : art_info, comments : comments, owner : owner, user : req.user, liked : res});
                    }
                }, (err) => {
                    return state.render('error');
                })
            } else {
                return state.render('art', { art_info : art_info, comments : comments, owner : owner});
            }
        },(err)=>{
            return state.render('404');
        })
    })
})

// DELETE art by ID
router.post('/:id/delete', passport.ensureLoggedIn(), function(req, res, next){
    // Call function to delete a piece of art by its ID
    // Redirect user to their wall
	state = res;
    art_id = req.params.id;
	art_info = {};
	art.getInfo(art_id).then((res)=>{
        art_info = res;
		if(art_info.owner_username == req.user.username){
			art.delete(art_id).then((res)=>{
				state.redirect('/artists/'+req.user.username);
			},  (err)=>{
				console.log(err);
			});
		}
		else {
			state.render('unauthorized');
		}
    }, (err)=>{
        console.log(err);
    });
});

// POST art
router.post('/', function(req, res, next){
    // Call function create art
    // Redirect user to that art
    var user = req.session.passport.user;
    //console.log(user);
    var form = new formidable.IncomingForm();
    var artDirectory = path.join(path.dirname(__dirname),'public////art');
    form.uploadDir = artDirectory;
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files){
        if(err)
            return res.render('error');

        var fileName = (path.basename(files.art.path)).replace("upload_", "");
        var filePathUpdate = "public\\\\art\\\\"+fileName;
        fs.renameSync(files.art.path,filePathUpdate);
        var imgLocation = fileName;
        var state = res;

        // check if tags are valid
        let tags = fields.tags;
        var all_tags = tags.split(',');
        if (all_tags) {
            for (let tag of all_tags) {
                tag = tag.trim();
                if (tag.length > 20){
                    return res.render("error", { error : "one or more of your tags were too long"});
                }
            }
        }

        art.postArt(user, imgLocation, fields.title, fields.description, tags, fields.rating).then(function (res) {
            if (res) {
                console.log('Art added succesfully');
                state.redirect('/art');
            }
        }).catch(function (err) {
            res.render('error', { error : err });
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