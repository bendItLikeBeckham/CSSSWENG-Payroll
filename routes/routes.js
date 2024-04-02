/*
Functions:
-Routing of the web service pages and CRUD operations
-Routing access limitations depending if the employee is logged in and employee type
*/

const controllers = require('../controllers/controller');
const login_controllers = require('../controllers/login-controller');
const employee_dashboard_controllers = require('../controllers/employee-dashboard-controller');
const employee_clockpage_controllers = require('../controllers/employee-clockpage-controller');
const logout_controllers = require('../controllers/logout-controller');
const otp_controller = require('../controllers/otp-controller');
const admin_dash_logs_controllers = require('../controllers/admin-dash-logs-controller');
const delete_user_controller = require('../controllers/delete-user-controller');
const admin_empman_emprecs_controllers = require('../controllers/admin-empman-emprecs-controller');
const admin_empman_payroll_controllers = require('../controllers/admin-empman-payroll-controller');
const update_payroll_controllers = require('../controllers/update-payroll-controller');
const forgot_password_controllers = require('../controllers/forgot-password-controller');
const admin_notifs_controllers = require('../controllers/admin-notifs-controller');

const register_controllers = require('../controllers/register-controller');
 
const express = require('express');
const app = express();
app.use(express.json());

function initial_process(req, res, next){
    if(!req.session.Email){
        res.redirect('/');
    }else{
        next();
    }
}

function must_be_logged_out(req, res, next){
    if(req.session.Email){
        if(req.session.Employee_Type === "Admin"){
            res.redirect('/admin_dashboard');
        }else if(req.session.Employee_Type === "Employee"){
            res.redirect('/employee_clockpage');
        }else{
            res.redirect('/work_from_home_clockpage');
        }
    }else{
        next();
    }
}

function employee_access(req, res, next){
    if(req.session.Employee_Type === "Work From Home"){
        res.redirect('/work_from_home_clockpage');
    }else{
        next();
    }
}

function wfh_access(req, res, next){
    if(req.session.Employee_Type === "Employee"){
        res.redirect('/employee_clockpage');
    }else{
        next();
    }
}

function employee_wfh_access(req, res, next){
    if(req.session.Employee_Type === "Admin"){
        res.redirect('/admin_dashboard');
    }else{
        next();
    }
}

function admin_access(req, res, next){
    if(req.session.Employee_Type === "Employee"){
        res.redirect('/employee_clockpage');
    }else if(req.session.Employee_Type === "Work From Home"){
        res.redirect('/work_from_home_clockpage');
    }else{
        next();
    }
}

//initial routes access
app.get('/', must_be_logged_out, controllers.get_index);
app.post('/add_forgot_password', must_be_logged_out, forgot_password_controllers.post_add_forgot_password);
app.post('/login_account', must_be_logged_out, login_controllers.post_login);
app.get('/logout', initial_process, logout_controllers.get_logout);

//wfh routes access
app.get('/work_from_home_clockpage', initial_process, employee_wfh_access, wfh_access, employee_clockpage_controllers.get_wfh_clockpage);

//employee routes access
app.get('/employee_clockpage', initial_process, employee_wfh_access, employee_access, employee_clockpage_controllers.get_employee_clockpage);
app.post('/generate_otp', initial_process, employee_wfh_access, employee_access, otp_controller.post_generate_otp);
app.post('/verify_otp', initial_process, employee_wfh_access, employee_access, otp_controller.post_verify_otp); 

//employee and wfh routes access
app.get('/time_in_status', initial_process, employee_wfh_access, employee_clockpage_controllers.get_employee_time_in_status);
app.get('/employee_dashboard', initial_process, employee_wfh_access, employee_dashboard_controllers.get_employee_dashboard);
app.post('/employee_time_in', initial_process, employee_wfh_access, employee_clockpage_controllers.post_employee_time_in);
app.post('/employee_time_out', initial_process, employee_wfh_access, employee_clockpage_controllers.post_employee_time_out);
app.post('/retrieve_employee_payroll',initial_process,  employee_wfh_access, employee_dashboard_controllers.get_employee_details);

//admin routes access
app.get('/admin_dashboard', initial_process, admin_access, admin_dash_logs_controllers.get_admin_dash_logs);
app.get('/register', initial_process, admin_access, register_controllers.get_register);
app.post('/register_employee', initial_process, admin_access, register_controllers.post_register);
app.get('/retrieve_employee_summary', initial_process, admin_access, admin_dash_logs_controllers.get_employee_summary);
app.get('/delete_user', initial_process, admin_access, delete_user_controller.get_delete_user_page);
app.get('/delete_user_employee', initial_process, admin_access, delete_user_controller.get_delete_user);
app.post('/delete_chosen_user', initial_process, admin_access, delete_user_controller.post_delete_user);
app.post('/display_delete_info', initial_process, admin_access, delete_user_controller.post_display_info);
app.get('/admin_empman_payroll', initial_process, admin_access, admin_empman_payroll_controllers.get_admin_empman_payroll);
app.get('/admin_empman_emprecs', initial_process, admin_access, admin_empman_emprecs_controllers.get_emprecs);
app.post('/display_specific_employee_records', initial_process, admin_access, admin_empman_emprecs_controllers.post_specific_emprecs);
app.get('/admin_retrieve_employee_total_wp', initial_process, admin_access, admin_empman_payroll_controllers.get_emp_total);
app.get('/admin_retrieve_emp_wpay', initial_process, admin_access, admin_empman_payroll_controllers.get_emp_wpay);
app.post('/admin_update_payroll', initial_process, admin_access, admin_empman_payroll_controllers.post_update_payroll);
app.get('/admin_notifs', initial_process, admin_access, admin_notifs_controllers.get_admin_notifs);
app.get('/display_forgot_password', initial_process, admin_access, admin_notifs_controllers.get_forgot_password);
app.post('/delete_forgot_password', initial_process, admin_access, forgot_password_controllers.post_delete_forgot_password);

app.post('/update_employee_payroll', update_payroll_controllers.post_update_employee_payroll);

module.exports = app;
