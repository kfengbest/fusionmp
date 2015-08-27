var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    partials = require('express-partials'),
    session = require('express-session'),
    helpers     = require('./helpers.js'); // our custom middleware


module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  var userRouter = express.Router();
  var projectRouter = express.Router();
  
function allowCrossDomain(req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Credentials', true);
    //res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");

    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.send(200);
    } else {
        next();
    }
}


  app.use(morgan('dev'));
  //app.use(bodyParser.urlencoded({extended: true}));
  //app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'ejs');
  app.use(partials());
  app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(session({ secret: 'nase_tajne_heslo', cookie: {}, resave: true, saveUninitialized: true }));
  app.use(allowCrossDomain);


  app.use('/api/users', userRouter); // use user router for all user request

  // authentication middleware used to decode token and made available on the request
  //app.use('/api/links', helpers.decode);
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  app.use('/api/projects', projectRouter); 


  // inject our routers into their respective route files
  require('../users/userRoutes.js')(userRouter);
  require('../projects/projectRoutes.js')(projectRouter);


};
