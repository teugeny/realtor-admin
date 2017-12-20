let express =           require('express')
    , http =            require('http')
    , passport =        require('passport')
    , path =            require('path')
    , morgan =          require('morgan')
    , bodyParser =      require('body-parser')
    , methodOverride =  require('method-override')
    , cookieParser =    require('cookie-parser')
    , cookieSession =   require('cookie-session')
    , cors      =       require('cors')
    , session =         require('express-session')
    , cons = require('consolidate');

let app = module.exports = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(cors());

require('./routes.js')(app);
app.get('/test', function (req, res) {
    res.status(200).send('ok')
});
app.set('port', process.env.PORT || 3000);
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});