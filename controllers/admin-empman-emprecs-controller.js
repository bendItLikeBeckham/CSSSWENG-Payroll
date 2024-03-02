const employee = require('../models/employee_model.js');
//const payroll = require('../models/payroll_model.js');
const database = require('../models/database.js');

const admin_empman_emprecs_controller = {
    get_admin_empman_emprecs: function(req, res){
        res.render("admin-empman-emprecs");
    },

    get_emp_total: async function(req, res){
        console.log("get_emp_total_ei part here"); //remove later
        const emp_type = "Employee";
        try{
            const emp_total = await database.findMany(employee, {Employee_Type: emp_type});

            console.log("emp_total data: " + emp_total);

            res.render("admin-empman-emprecs", {emp_total});
        }catch(error){
            console.error("Error processing employee total: ", error);
            res.status(500).send("Internal Server Error!");
        }
    },

    get_emp_det: async function(req, res){
        console.log("get_emp_det part here"); //remove later
        const selected_employee = req.query.employee;
        console.log("employee email: "+selected_employee); //remove later
        const emp_type = "Employee";
        try{
            const emp_det = await database.findOne(employee, {Email: selected_employee});
            const emp_total = await database.findMany(employee, {Employee_Type: emp_type});

            console.log("emp_det data: " + emp_det); //remove later

            res.render("admin-empman-emprecs", {emp_det, emp_total});
        }catch(error){
            console.error("Error processing employee payroll: ", error);
            res.status(500).send("Internal Server Error!");
        }
    }
}

module.exports = admin_empman_emprecs_controller;