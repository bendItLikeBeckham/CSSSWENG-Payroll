const employee = require('../models/employee_model.js');
const payroll = require('../models/payroll_model.js');

const register_controller = {
    get_register: function(req, res){
        res.render('register');
    }, 

    post_register: async function(req, res){
        const {email, password, address, employee_type} = req.body;

        const user_exists = await employee.findOne({Email: email});
        if(user_exists){
            return res.status(400).json({message: "Email Already Exists!"});
        }else if(!password){
            return res.status(400).json({message: "Missing Password!"});
        }else{
            try{
                const new_employee = new employee({
                    Email: email,
                    Password: password,
                    Address: address,
                    Employee_Type: employee_type,
                    IsTimedIn: 0
                });
                await new_employee.save();
                //changes: new payroll 
                const initial_date = new Date();
                const new_payroll = new payroll({
                    Email: email,
                    Initial_date: initial_date,
                    Mon_Hours: 0,
                    Mon_Minutes: 0,
                    Mon_Time_In: 0,
                    Mon_Time_Out: 0,
                    Mon_Total_Pay: 0,
                    Tue_Hours: 0,
                    Tue_Minutes: 0,
                    Tue_Time_In: 0,
                    Tue_Time_Out: 0,
                    Tue_Total_Pay: 0,
                    Wed_Hours: 0,
                    Wed_Minutes: 0,
                    Wed_Time_In: 0,
                    Wed_Time_Out: 0,
                    Wed_Total_Pay: 0,
                    Thu_Hours: 0,
                    Thu_Minutes: 0,
                    Thu_Time_In: 0,
                    Thu_Time_Out: 0,
                    Thu_Total_Pay: 0,
                    Fri_Hours: 0,
                    Fri_Minutes: 0,
                    Fri_Time_In: 0,
                    Fri_Time_Out: 0,
                    Fri_Total_Pay: 0,
                    Sat_Hours: 0,
                    Sat_Minutes: 0,
                    Sat_Time_In: 0,
                    Sat_Time_Out: 0,
                    Sat_Total_Pay: 0,
                    Weekly_Total_Bale: 0,
                    Weekly_Total_Bonus: 0,
                    Weekly_Total_Deductions: 0,
                    Weekly_Total_Pay: 0,
                });
                await new_payroll.save();

                //changes: end here
                res.json({success: true, message: "Registration Successful!"});
            }catch(error){
                console.error(error);
                res.status(500).json({success: false, message: "Registration Controller Error!"});
            }
        }
    }
}

module.exports = register_controller;
