const forgot_password = require('../models/forgot_password_model.js'); 
const employee = require('../models/employee_model.js'); 
const database = require('../models/database.js');

const forgot_password_controller = {
    post_add_forgot_password: async function (req, res){
        const email = req.body;
        const user_exists = await employee.findOne({Email: email});
        if(user_exists){
            try {
                
            } catch (error) {
                
            }
        }
    },

    post_delete_forgot_password: async function (req, res){
        const forgot_password_number = req.body;
        const forgot_password_exists = await forgot_password.findOne({Forgot_Password_Number: forgot_password_number});
        if(forgot_password_exists){
            try {
                
            } catch (error) {
                
            }
        }
    }
}

module.exports = forgot_password_controller;