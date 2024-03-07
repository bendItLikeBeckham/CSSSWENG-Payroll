const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const hbs = require('hbs');
const session = require('express-session');
const database = require('./models/database.js')

const app = express();

dotenv.config();
const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('eq', function (a, b){
    return a === b;
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

database.connect();

app.use(session({
    secret: 'session-secret-key', // Replace with your secret key
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true 
    }
}));

app.use('/', routes);

app.use(function(req, res){
    res.status(404).send('Error 404: Page Not Found');
});

app.listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}`);
});