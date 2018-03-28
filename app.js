var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var session = require('express-session');
var passport = require('./passport');
var config = require('config');

var index = require('./routes/index');
var artists = require('./routes/artists');
var art = require('./routes/art');

var app = express();


app.engine('handlebars', handlebars({defaultLayout: 'main', layoutsDir: __dirname + '/views'}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('express-session')({ secret: config.get('passport.secret'), resave: false, saveUninitialized: false }));


// Routes
app.use('/', index);
app.use('/artists', artists);
app.use('/art', art);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

port = 3000
app.listen(port, function(){
  console.log('Listening on port ' + 3000);
})

module.exports = app;
