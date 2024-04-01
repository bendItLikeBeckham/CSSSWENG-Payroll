/*
Functions: 
-Display the admin-notifs.hbs (Admin: Notifications Page)
-Populate the page with employees with Forgot Password
*/

const forgot_password = require('../models/forgot_password_model.js'); 
const database = require('../models/database.js');

const admin_notifs_controller = {
    get_admin_notifs: function (req, res){
        res.render("admin-notifs");
    },

    get_forgot_password: async function (req, res){
        try{
            var emp_forgot_password = await database.findMany(forgot_password);
            emp_forgot_password.sort((a, b) => a.Forgot_Password_Number - b.Forgot_Password_Number);

            res.render("admin-notifs", {emp_forgot_password});
        }catch(error){
            console.error("Error processing forgot password: ", error);
            res.status(500).send("Internal Server Error!");
        }
    }
}

module.exports = admin_notifs_controller;