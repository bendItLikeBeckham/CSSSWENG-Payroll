/*
Functions:
-Display the admin-dash-logs.hbs (Admin: Time-In/Out Logs Page)
-Populate the page with employee logs depending on the day
*/

const payroll = require('../models/payroll_model.js');
const database = require('../models/database.js');

const admin_dash_logs_controller = {
    get_admin_dash_logs: function(req, res){
        res.render("admin-dash-logs");
    },

    get_employee_summary: async function(req, res){
        const selected_date = req.query.s_date;
        const day_of_the_week = req.query.d_week;

        try{
            const query_days =  {
                $or: [
                    { Mon_Date: selected_date },
                    { Tue_Date: selected_date },
                    { Wed_Date: selected_date },
                    { Thu_Date: selected_date },
                    { Fri_Date: selected_date },
                    { Sat_Date: selected_date },
                    { Sun_Date: selected_date },
                ]
            };
            const emp_sum = await database.findMany(payroll, query_days);

            res.render("admin-dash-logs", {emp_sum, d_week: day_of_the_week});
        }catch(error){
            console.error("Error processing employee summary: ", error);
            res.status(500).send("Internal Server Error!");
        }
    }
}

module.exports = admin_dash_logs_controller;