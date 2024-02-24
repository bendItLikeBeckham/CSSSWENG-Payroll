const controllers = require('../controllers/controller');
const login_controllers = require('../controllers/login-controller');
const employee_dashboard_controllers = require('../controllers/employee-dashboard-controller');
const employee_clockpage_controllers = require('../controllers/employee-clockpage-controller');
const logout_controllers = require('../controllers/logout-controller');
const otp_controller = require('../controllers/otp-controller')




//to be deleted the dummy_register_controller
const dummy_register_controllers = require('../controllers/dummy-register-controller');
//^

const express = require('express');
const logout_controller = require('../controllers/logout-controller');
const app = express();
app.use(express.json());

//to implement later: disable going to other pages using the url

app.get('/', controllers.get_index); // basically the login page
app.post('/login_account', login_controllers.post_login);//note: change to /login_employee same with logout
app.get('/employee_dashboard', employee_dashboard_controllers.get_employee_dashboard);
app.get('/dummy_register', dummy_register_controllers.get_dummy_register);
app.post('/dummy_register_employee', dummy_register_controllers.post_dummy_register);
app.get('/employee_clockpage', employee_clockpage_controllers.get_employee_clockpage);
app.get('/logout', logout_controllers.get_logout);
app.post('/generate_otp', otp_controller.post_generate_otp);
app.post('/verify_otp', otp_controller.post_verify_otp);



module.exports = app;
