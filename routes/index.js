var express = require('express');
var router = express.Router();
var passport = require('../passport');
var config = require('config');

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

/* GET login page */
router.get('/login', function(req, res) {
  res.render('login');
});

/* POST login page (used to login) */
router.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' }));

/* GET profile page (requires that user is logged in) */
router.get('/profile',
  passport.ensureLoggedIn(),
  function (req, res) {
    res.render('profile', { user : req.user });
  });


module.exports = router;
