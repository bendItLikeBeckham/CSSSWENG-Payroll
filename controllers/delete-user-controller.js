/*
Functions:
-Display the delete-user.hbs (Admin: Delete Employee Page)
-Populate the page with employee details corresponding to the chosen employee
-Delete the documents in the mongodb regarding the chosen employee
*/

const employee = require('../models/employee_model.js');
const forgot_password = require('../models/forgot_password_model.js');
const database = require('../models/database.js');

const delete_user_controller = {
    get_delete_user_page: function(req, res){
        res.render("delete-user");
    },

    get_delete_user: async function(req, res){
        const emp_emails = await database.findMany(employee, {$or: [{Employee_Type: "Employee"},{Employee_Type: "Work From Home"},{Employee_Type: "Admin"}]});
        emp_emails.sort((a, b) => {
            const emailA = (a.Email || '').toLowerCase();
            const emailB = (b.Email || '').toLowerCase();
            
            return emailA.localeCompare(emailB);
        });
        try{
            
            res.render("delete-user", {emp_emails}); 
        }catch (error){
            console.error("Error processing employee summary: ", error);
            res.status(500).send("Internal Server Error!");
        }
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
            const user_exists_forgot_password = await forgot_password.findOne({Email: email});
            if(user_exists_forgot_password){
                const curr_forgot_password_number = user_exists_forgot_password.Forgot_Password_Number;
                try {                
                    await forgot_password.deleteOne({Email: email});
                    await forgot_password.updateMany({Forgot_Password_Number: {$gt: curr_forgot_password_number}}, {$inc: {Forgot_Password_Number: -1}})
    
                    await employee.deleteOne(user_exists);
                    
                    res.json({success: true, message: "Deletion successful!"})
                } catch (error) {
                    console.error('Error updating data in MongoDB:', error);     
                    res.status(500).render('error', { message: 'Internal Server Error' }); 
                }
            }else{
                try {                
                    await employee.deleteOne(user_exists);   
                    res.json({success: true, message: "Deletion successful!"})
                } catch (error) {
                    console.error('Error updating data in MongoDB:', error);     
                    res.status(500).render('error', { message: 'Internal Server Error' }); 
                }
            }
        }
        else{
            return res.status(400).json({message: "There are no Existing Users!"});
        }
    }
}

module.exports = delete_user_controller;
