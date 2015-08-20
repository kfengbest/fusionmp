var express = require('express');
var partials = require('express-partials');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

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

app.get('/ox_response', function(req, res){
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


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});