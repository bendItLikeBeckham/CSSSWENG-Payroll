const employee = require('../models/employee_model.js');
const payroll = require('../models/payroll_model.js');
const database = require('../models/database.js');

const admin_empman_payroll_controller = {
    get_admin_empman_payroll: function(req, res){
        res.render("admin-empman-payroll");
    },

    get_emp_total: async function(req, res){
        console.log("get_emp_total_wp part here"); //remove later
        const emp_type = "Employee";
        try{
            const emp_total = await database.findMany(employee, {Employee_Type: emp_type});

            console.log("emp_total data: " + emp_total);

            res.render("admin-empman-payroll", {emp_total});
        }catch(error){
            console.error("Error processing employee total: ", error);
            res.status(500).send("Internal Server Error!");
        }
    },

    get_emp_wpay: async function(req, res){
        console.log("get_emp_wpay part here"); //remove later
        const selected_employee = req.query.employee;
        console.log("employee email: "+selected_employee); //remove later
        const emp_type = "Employee";
        try{
            const emp_wpay = await database.findOne(payroll, {Email: selected_employee});
            const emp_total = await database.findMany(employee, {Employee_Type: emp_type});


            console.log("emp_pay data: " + emp_wpay); //remove later

            res.render("admin-empman-payroll", {emp_wpay, emp_total});
        }catch(error){
            console.error("Error processing weekly payroll: ", error);
            res.status(500).send("Internal Server Error!");
        }
    }
}

module.exports = admin_empman_payroll_controller;