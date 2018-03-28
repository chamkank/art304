var express = require('express');
var router = express.Router();
var passport = require('../passport');
var config = require('config');
var search = require('../classes/Search');

router.use(passport.initialize());
router.use(passport.session());

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.user){
    res.render('profile', { user : req.user });
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
