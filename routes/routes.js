const controllers = require('../controllers/controller');
const login_controllers = require('../controllers/login-controller');
const employee_dashboard_controllers = require('../controllers/employee-dashboard-controller');
const employee_clockpage_controllers = require('../controllers/employee-clockpage-controller');
const logout_controllers = require('../controllers/logout-controller');
const otp_controller = require('../controllers/otp-controller');
const admin_dash_logs_controllers = require('../controllers/admin-dash-logs-controller');
const delete_user_controller = require('../controllers/delete-user-controller');
const admin_empman_attendrecs_controllers = require('../controllers/admin-empman-attendrecs-controller');
const admin_empman_emprecs_controllers = require('../controllers/admin-empman-emprecs-controller');
const admin_empman_payroll_controllers = require('../controllers/admin-empman-payroll-controller');

const register_controllers = require('../controllers/register-controller');
 
const express = require('express');
const logout_controller = require('../controllers/logout-controller');
const app = express();
app.use(express.json());

//to implement later: disable going to other pages using the url

app.get('/', controllers.get_index); // basically the login page
app.post('/login_account', login_controllers.post_login);//note: change to /login_employee same with logout
app.get('/employee_dashboard', employee_dashboard_controllers.get_employee_dashboard);
app.get('/register', register_controllers.get_register);
app.post('/register_employee', register_controllers.post_register);
app.get('/employee_clockpage', employee_clockpage_controllers.get_employee_clockpage);
app.get('/time_in_status', employee_clockpage_controllers.get_employee_time_in_status)
app.get('/logout', logout_controllers.get_logout);
app.post('/generate_otp', otp_controller.post_generate_otp);
app.post('/verify_otp', otp_controller.post_verify_otp);
app.get('/get_otp', otp_controller.get_current_otp);
app.post('/employee_time_in', employee_clockpage_controllers.post_employee_time_in);
app.post('/employee_time_out', employee_clockpage_controllers.post_employee_time_out);
app.get('/admin_dashboard', admin_dash_logs_controllers.get_admin_dash_logs);
app.post('/retrieve_employee_payroll', employee_dashboard_controllers.get_employee_details);
app.get('/retrieve_employee_summary', admin_dash_logs_controllers.get_employee_summary);
app.get('/delete_user', delete_user_controller.get_delete_user );
app.post('/delete_chosen_user', delete_user_controller.post_delete_user);
app.post('/display_delete_info', delete_user_controller.post_display_info);
app.get('/admin_empman_attendrecs', admin_empman_attendrecs_controllers.get_admin_empman_attendrecs);
//app.get('/admin_empman_emprecs', admin_empman_emprecs_controllers.get_admin_empman_emprecs);
app.get('/admin_empman_payroll', admin_empman_payroll_controllers.get_admin_empman_payroll);
app.get('/admin_retrieve_employee_total_ar', admin_empman_attendrecs_controllers.get_emp_total);
app.get('/admin_retrieve_emp_pay', admin_empman_attendrecs_controllers.get_emp_pay);
//app.get('/admin_retrieve_employee_total_ei', admin_empman_emprecs_controllers.get_emp_total);
//app.get('/admin_retrieve_emp_det', admin_empman_emprecs_controllers.get_emp_det);
app.get('/admin_empman_emprecs', admin_empman_emprecs_controllers.get_emprecs);
app.post('/display_specific_employee_records', admin_empman_emprecs_controllers.post_specific_emprecs);
app.get('/admin_retrieve_employee_total_wp', admin_empman_payroll_controllers.get_emp_total);
app.get('/admin_retrieve_emp_wpay', admin_empman_payroll_controllers.get_emp_wpay);
app.post('/admin_update_payroll', admin_empman_payroll_controllers.post_update_payroll);

module.exports = app;
