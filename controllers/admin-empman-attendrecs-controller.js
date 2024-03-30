const employee = require('../models/employee_model.js');
const payroll = require('../models/payroll_model.js');
const database = require('../models/database.js');

const admin_empman_attendrecs_controller = {
    get_admin_empman_attendrecs: function(req, res){
        res.render("admin-empman-attendrecs");
    },

    get_emp_total: async function(req, res){
        console.log("get_emp_total_ar part here"); //remove later
        try{
            const emp_total = await database.findMany(employee, {$or: [{Employee_Type: "Employee"},{Employee_Type: "Work From Home"}]});

            console.log("emp_total data: " + emp_total);

            res.render("admin-empman-attendrecs", {emp_total});
        }catch(error){
            console.error("Error processing employee total: ", error);
            res.status(500).send("Internal Server Error!");
        }
    },

    get_emp_pay: async function(req, res){
        console.log("get_emp_pay part here"); //remove later
        const selected_employee = req.query.employee;
        console.log("employee email: "+selected_employee); //remove later
        try{
            //const emp_det = await database.findOne(employee, {Email: selected_employee});
            const emp_pay = await database.findOne(payroll, {Email: selected_employee});
            const emp_total = await database.findMany(employee, {$or: [{Employee_Type: "Employee"},{Employee_Type: "Work From Home"}]});


            console.log("emp_pay data: " + emp_pay); //remove later

            // res.render("admin-empman-attendrecs", {emp_det, emp_pay, emp_total});
            res.render("admin-empman-attendrecs", {emp_pay, emp_total});
        }catch(error){
            console.error("Error processing employee payroll: ", error);
            res.status(500).send("Internal Server Error!");
        }
    }
}

module.exports = admin_empman_attendrecs_controller;