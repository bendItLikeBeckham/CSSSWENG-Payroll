/*
Functions:
-Display the delete-user.hbs (Admin: Delete Employee Page)
-Populate the page with employee details corresponding to the chosen employee
-Delete the documents in the mongodb regarding the chosen employee
*/

const employee = require('../models/employee_model.js');
const payroll = require('../models/payroll_model.js');
const database = require('../models/database.js');

const delete_user_controller = {
    get_delete_user: async function(req, res){
        const emp_emails = await database.findMany(employee, {$or: [{Employee_Type: "Employee"},{Employee_Type: "Work From Home"},{Employee_Type: "Admin"}]});
        emp_emails.sort((a, b) => {
            const emailA = (a.Email || '').toLowerCase();
            const emailB = (b.Email || '').toLowerCase();
            
            return emailA.localeCompare(emailB);
        });
        try{
            res.render("delete-user", {emp_emails});
        }catch (err){
            console.error("Error processing employee summary: ", error);
            res.status(500).send("Internal Server Error!");
        }
        res.render('delete-user');
    },

    post_display_info: async function (req,res){
        const emp_emails = await database.findMany(employee, {$or: [{Employee_Type: "Employee"},{Employee_Type: "Work From Home"},{Employee_Type: "Admin"}]});
        const email = req.body.email;
        emp_emails.sort((a, b) => {
            const emailA = (a.Email || '').toLowerCase();
            const emailB = (b.Email || '').toLowerCase();
            
            return emailA.localeCompare(emailB);
        });
        try {
            const emp_sum = await employee.findOne({ Email: email });
    
            res.render("delete-user", {emp_sum, emp_emails});
        } catch (error) {
            console.error("Error processing employee summary: ", error);
            res.status(500).send("Internal Server Error!");
        }
    },

    post_delete_user: async function (req, res){
        const {email} = req.body;
        const user_exists = await employee.findOne({Email: email});
        if(user_exists){
            try {
                const user_payroll0 = await payroll.findOne({Email:email, Week:0});
                const user_payroll1 = await payroll.findOne({Email:email, Week:1});
                const user_payroll2 = await payroll.findOne({Email:email, Week:2});
                await employee.deleteOne(user_exists);
                await payroll.deleteOne(user_payroll0);
                await payroll.deleteOne(user_payroll1);
                await payroll.deleteOne(user_payroll2);
                res.json({success: true, message: "Deletion successful!"})
            } catch (error) {
                console.error('Error updating data in MongoDB:', error);      
        }
         res.status(500).render('error', { message: 'Internal Server Error' });
        }
        else{
            return res.status(400).json({message: "There are no Existing Users!"});
        }
    }
}

module.exports = delete_user_controller;
