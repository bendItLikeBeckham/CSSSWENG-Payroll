//const payroll = require('../models/payroll_model.js'); // to be implemented later
//const employee = require('../models/employee_model.js'); // to be implemented later

const employee_dashboard_controller = {
    get_employee_dashboard: function (req, res){
        res.render("employee-dashboard");
    }
}

module.exports = employee_dashboard_controller;