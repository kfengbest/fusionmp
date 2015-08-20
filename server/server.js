var express     = require('express');
var mongoose    = require('mongoose');
var express = require('express');
var partials = require('express-partials');
var session = require('express-session');
var bodyParser = require('body-parser');

var userController = require('./users/userController.js');


var app = express();

mongoose.connect('mongodb://fusion:fusion@ds031883.mongolab.com:31883/fusionmarketplace'); // connect to mongo database named shortly

// configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client'));
app.use(session({ secret: 'nase_tajne_heslo', cookie: {}, resave: true, saveUninitialized: true }));

//checking function - it just check the existence of the
function checkAuth(req, res, next){
    if(req.session.user_id != null){
        next();
    }
    else{
        res.redirect(302, '/login');
    }
}

app.get('/ox_response', function(req, res, next){
    //console.log(JSON.stringify(req.query));
    if(req != null && req.query != null && req.query['openid.mode'] != null && req.query['openid.identity'] != null){
        // logged in
        if(req.query['openid.mode'] === 'id_res'){ // setup_needed = is not loged in
            var uid = req.query['openid.identity'];
            var idx = uid.lastIndexOf('/');
            if (idx > 0) {
                uid = uid.substr(idx+1);
            }
            req.session.user_id = uid;
            req.session.userName = req.query['openid.alias3.value.alias1'];
            req.session.userImage = req.query['openid.alias3.value.alias2'];

            // save to db
            //userController.updateUser(req, res, next);


            console.log('Oxygen user: ' + req.session.userName + "(" + uid + ")");
            return res.render('oxygenOk');
        }
    }

    req.session.user_id = null;
    req.session.userName = null;
    req.session.userImage = null;
    res.render('oxygenFail');
});

app.get('/login', function (req, res) {
    return res.render('login');
});


app.get('/', checkAuth, function(req, res) {
    res.render('index', { 'userName': req.session.userName, 'userImage': req.session.userImage });
});

app.listen(8000);


// var server = app.listen(3000, function () {
//     var host = server.address().address;
//     var port = server.address().port;

//     console.log('Example app listening at http://%s:%s', host, port);
// });


module.exports = app;


/* Walkthrough of the server

  Express, mongoose, and our server are initialzed here
  Next, we then inject our server and express into our config/middleware.js file for setup.
    We also exported our server for easy testing

  middleware.js requires all express middleware and sets it up
  our authentication is set up there as well
  we also create individual routers for are two main features, links and users
  each feature has its own folder with a model, controller, and route file
    the respective file is required in middleware.js and injected with its mini router
    that route file then requires the respective controller and sets up all the routes
    that controller then requires the respective model and sets up all our endpoints which respond to requests

*/
