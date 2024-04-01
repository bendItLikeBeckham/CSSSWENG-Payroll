const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const hbs = require('hbs');
const session = require('express-session');
const database = require('./models/database.js');

const schedule = require('node-schedule');//might remove this
const axios = require('axios');

const MongoStore = require('connect-mongo');

const app = express();

dotenv.config();
const port = process.env.PORT;
// const hostname = process.env.HOSTNAME;

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


//not what happens to the fetch values when the payroll website is on render
//what happens when the payroll is opened on monday would it not update the payroll since it is passed sunday 12am
// schedule.scheduleJob('0 0 * * 0', function(){//uncomment this after checking
schedule.scheduleJob('0 16 * * 6', function(){
    //call to routes
    console.log("Updating payroll!!");

    //fetch("/update_employee_payroll");
    // fetch(`http://${hostname}:${port}/update_employee_payroll`, {
    axios.post('https://payroll-os1n.onrender.com/update_employee_payroll')
    // fetch("/update_employee_payroll", {
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

// app.listen(port, hostname, function() {
//     console.log(`Server running at http://${hostname}:${port}`);
// });

app.listen(port, function() {
    console.log('listening on port:' + port);
});