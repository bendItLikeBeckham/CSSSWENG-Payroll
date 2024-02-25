//const employee = require('../models/employee_model.js');
const payroll = require('../models/payroll_model.js');
const database = require('../models/database.js');

const admin_dash_logs_controller = {
    get_admin_dash_logs: function(req, res){
        res.render("admin-dash-logs");
    },

    get_employee_summary: async function(req, res){
        console.log("get_employee_summary part here");
        try{
            const emp_sum = await database.findMany(payroll, {});

            console.log("emp_sum data: " + emp_sum);

            res.render("admin-dash-logs", {emp_sum});
        }catch(error){
            console.error("Error processing employee summary: ", error);
            res.status(500).send("Internal Server Error!");
        }
    }
}

module.exports = admin_dash_logs_controller;