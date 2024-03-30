const employee = require('../models/employee_model.js');
const payroll = require('../models/payroll_model.js');
const database = require('../models/database.js');

const admin_empman_emprecs_controller = {
    get_emprecs: async function(req, res){
        const emp_emails = await database.findMany(employee, {$or: [{Employee_Type: "Employee"},{Employee_Type: "Work From Home"},{Employee_Type: "Admin"}]});

        emp_emails.sort((a, b) => {
            const emailA = (a.Email || '').toLowerCase();
            const emailB = (b.Email || '').toLowerCase();
            
            return emailA.localeCompare(emailB);
        });

    try{
        res.render("admin-empman-emprecs", {emp_emails});
    }catch (error){
        console.error("Error processing employee summary: ", error);
        res.status(500).send("Internal Server Error!");
    }
},

    post_specific_emprecs: async function(req, res){
        const emp_emails = await database.findMany(employee, {$or: [{Employee_Type: "Employee"},{Employee_Type: "Work From Home"},{Employee_Type: "Admin"}]});
        const email = req.body.email; // Get the selected email from the request body
    
        emp_emails.sort((a, b) => {
            const emailA = (a.Email || '').toLowerCase();
            const emailB = (b.Email || '').toLowerCase();
            
            return emailA.localeCompare(emailB);
        });

        try {
            const emp_sum = await employee.findOne({ Email: email });
    
            console.log("emp_sum data: " + emp_sum);
    
            res.render("admin-empman-emprecs", { emp_emails, emp_sum }); // Merge into a single object
        } catch (error) {
            console.error("Error processing employee summary: ", error);
            res.status(500).send("Internal Server Error!");
        }
    }
}

module.exports = admin_empman_emprecs_controller;