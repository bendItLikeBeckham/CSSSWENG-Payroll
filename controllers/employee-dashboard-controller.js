const payroll = require('../models/payroll_model.js'); // to be implemented later
const employee = require('../models/employee_model.js'); // to be implemented later
const database = require('../models/database.js');

const employee_dashboard_controller = {
    get_employee_dashboard: function (req, res){
        res.render("employee-dashboard", {email: req.session.Email, emp_type: req.session.Employee_type, ETI_weekdayIndex: req.session.ETI_weekdayIndex});
    },

    get_employee_details: async function (req, res){//employee dashboard details
        console.log("get_employee_details part here");
        employee_email = req.session.Email;
        selectedWeek = req.body.week
        console.log(selectedWeek);
        console.log(employee_email);
        try{
            const emp_det = await database.findOne(payroll, {Email: employee_email, Week : selectedWeek});
            
            console.log("emp_det data: " + emp_det);
            
            emp_det.Mon_Total_Pay = emp_det.Mon_Total_Pay.toFixed(2);
            emp_det.Tue_Total_Pay = emp_det.Tue_Total_Pay.toFixed(2);
            emp_det.Wed_Total_Pay = emp_det.Wed_Total_Pay.toFixed(2);
            emp_det.Thu_Total_Pay = emp_det.Thu_Total_Pay.toFixed(2);
            emp_det.Fri_Total_Pay = emp_det.Fri_Total_Pay.toFixed(2);
            emp_det.Sat_Total_Pay = emp_det.Sat_Total_Pay.toFixed(2);
            emp_det.Sun_Total_Pay = emp_det.Sun_Total_Pay.toFixed(2);
            emp_det.Weekly_Total_Pay = emp_det.Weekly_Total_Pay.toFixed(2);
        
            res.render("employee-dashboard", {email: req.session.Email, emp_type: req.session.Employee_type, ETI_weekdayIndex: req.session.ETI_weekdayIndex, emp_det});
        }catch(error){
            console.error("Error processing employee details: ", error);
            res.status(500).send("Internal Server Error!");
        }
    }
}

module.exports = employee_dashboard_controller;