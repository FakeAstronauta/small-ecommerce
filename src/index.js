const express = require('express');
const path = require('path')

const app = express();

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')); // views folder location
app.engine('html', require('ejs').renderFile);  // to allow html usage from ejs
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false})); // body data is filtered, maybe just security
app.use(express.json());

app.use(require('./routes'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

