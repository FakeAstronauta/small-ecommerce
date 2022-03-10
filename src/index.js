const express = require('express');
const path = require('path')
const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');

let {database} = require('./keys')

// Initialization
const app = express();
require('./lib/passport')

//  Server settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')); // views folder location
app.engine('html', require('ejs').renderFile);  // to allow html usage from ejs
app.set('view engine', 'ejs');

// Session config
app.use(session({
    secret: "sqlnodesession",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));

/**
 * middlewares
 */
// recognize the incomig request object
app.use(express.urlencoded({extended: false})); // body data is filtered, maybe just security
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

