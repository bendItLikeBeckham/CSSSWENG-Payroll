/* 
Functions:
-This is the file that will be run during deployment or locally hosted
-Session Creation and uploading to database
-Call to connect to the MongoDB database
-NPM packages utilized
-Trigger update weekly payroll on PST: Sunday 12am/ UTC: Saturday 4pm
-Redirect to login page
*/

const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const hbs = require('hbs');
const session = require('express-session');
const database = require('./models/database.js');
const schedule = require('node-schedule');
const axios = require('axios');
const MongoStore = require('connect-mongo');

const app = express();

dotenv.config();
const port = process.env.PORT;
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
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://Admin_Acc:6rtztqN8cgcS6uwg@payrollcluster.ho2w0w9.mongodb.net/'
    }),
    cookie: { 
        httpOnly: true, 
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use('/', routes);

//PST: Sunday 12am/ UTC: Saturday 4pm
schedule.scheduleJob('0 16 * * 6', function(){
    axios.post('https://payroll-os1n.onrender.com/update_employee_payroll')
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error("Error Updating Payroll:", error);
        });
});

app.use(function(req, res){
    res.status(404).send('Error 404: Page Not Found');
});

app.listen(port, function() {
    console.log('listening on port:' + port);
});