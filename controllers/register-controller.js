/*
Functions:
-Display the register.hbs (Admin: Add Employee Page)
-Create new employee and weekly payroll
*/

const employee = require('../models/employee_model.js');
const payroll = require('../models/payroll_model.js');

const register_controller = {
    get_register: function(req, res){
        res.render('register');
    }, 

    post_register: async function(req, res){
        const {firstName, lastName, address, contactNumber, email, password, employee_type} = req.body;

        const user_exists = await employee.findOne({Email: email});
        if(user_exists){
            return res.status(400).json({message: "Email Already Exists!"});
        }else if(!password){
            return res.status(400).json({message: "Missing Password!"});
        }else{
            try{
                const new_employee = new employee({
                    First_Name: firstName,
                    Last_Name: lastName,
                    Contact_Number: contactNumber,
                    Email: email,
                    Password: password,
                    Address: address,
                    Employee_Type: employee_type,
                    IsTimedIn: false
                });
                await new_employee.save();
                if(employee_type === "Employee" || employee_type === "Work From Home"){
                    //changes: new payroll 
                    // const initial_date = new Date();
                    const new_payroll = new payroll({
                        Email: email,
                        Week: 0,
                        Time_In_Weekday_Index: 0,
                        Mon_Hours: 0,
                        Mon_Minutes: 0,
                        Mon_Date: 0,
                        Mon_Time_In: 0,
                        Mon_Time_Out: 0,
                        Mon_Total_Pay: 0,
                        Tue_Hours: 0,
                        Tue_Minutes: 0,
                        Tue_Date: 0,
                        Tue_Time_In: 0,
                        Tue_Time_Out: 0,
                        Tue_Total_Pay: 0,
                        Wed_Hours: 0,
                        Wed_Minutes: 0,
                        Wed_Date: 0,
                        Wed_Time_In: 0,
                        Wed_Time_Out: 0,
                        Wed_Total_Pay: 0,
                        Thu_Hours: 0,
                        Thu_Minutes: 0,
                        Thu_Date: 0,
                        Thu_Time_In: 0,
                        Thu_Time_Out: 0,
                        Thu_Total_Pay: 0,
                        Fri_Hours: 0,
                        Fri_Minutes: 0,
                        Fri_Date: 0,
                        Fri_Time_In: 0,
                        Fri_Time_Out: 0,
                        Fri_Total_Pay: 0,
                        Sat_Hours: 0,
                        Sat_Minutes: 0,
                        Sat_Date: 0,
                        Sat_Time_In: 0,
                        Sat_Time_Out: 0,
                        Sat_Total_Pay: 0,
                        Sun_Hours: 0,
                        Sun_Minutes: 0,
                        Sun_Date: 0,
                        Sun_Time_In: 0,
                        Sun_Time_Out: 0,
                        Sun_Total_Pay: 0,
                        Weekly_Total_Advance: 0,
                        Weekly_Total_Additional: 0,
                        Weekly_Total_Deduction: 0,
                        Weekly_Total_Pay: 0,
                        Weekly_Hourly_Rate: 10
                    });
                    await new_payroll.save();

                    const new_payroll_1 = new payroll({
                        Email: email,
                        Week: 1,
                        Time_In_Weekday_Index: 0,
                        Mon_Hours: 0,
                        Mon_Minutes: 0,
                        Mon_Date: 0,
                        Mon_Time_In: 0,
                        Mon_Time_Out: 0,
                        Mon_Total_Pay: 0,
                        Tue_Hours: 0,
                        Tue_Minutes: 0,
                        Tue_Date: 0,
                        Tue_Time_In: 0,
                        Tue_Time_Out: 0,
                        Tue_Total_Pay: 0,
                        Wed_Hours: 0,
                        Wed_Minutes: 0,
                        Wed_Date: 0,
                        Wed_Time_In: 0,
                        Wed_Time_Out: 0,
                        Wed_Total_Pay: 0,
                        Thu_Hours: 0,
                        Thu_Minutes: 0,
                        Thu_Date: 0,
                        Thu_Time_In: 0,
                        Thu_Time_Out: 0,
                        Thu_Total_Pay: 0,
                        Fri_Hours: 0,
                        Fri_Minutes: 0,
                        Fri_Date: 0,
                        Fri_Time_In: 0,
                        Fri_Time_Out: 0,
                        Fri_Total_Pay: 0,
                        Sat_Hours: 0,
                        Sat_Minutes: 0,
                        Sat_Date: 0,
                        Sat_Time_In: 0,
                        Sat_Time_Out: 0,
                        Sat_Total_Pay: 0,
                        Sun_Hours: 0,
                        Sun_Minutes: 0,
                        Sun_Date: 0,
                        Sun_Time_In: 0,
                        Sun_Time_Out: 0,
                        Sun_Total_Pay: 0,
                        Weekly_Total_Advance: 0,
                        Weekly_Total_Additional: 0,
                        Weekly_Total_Deduction: 0,
                        Weekly_Total_Pay: 0,
                        Weekly_Hourly_Rate: 10
                    });
                    await new_payroll_1.save();

                    const new_payroll_2 = new payroll({
                        Email: email,
                        Week: 2,
                        Time_In_Weekday_Index: 0,
                        Mon_Hours: 0,
                        Mon_Minutes: 0,
                        Mon_Date: 0,
                        Mon_Time_In: 0,
                        Mon_Time_Out: 0,
                        Mon_Total_Pay: 0,
                        Tue_Hours: 0,
                        Tue_Minutes: 0,
                        Tue_Date: 0,
                        Tue_Time_In: 0,
                        Tue_Time_Out: 0,
                        Tue_Total_Pay: 0,
                        Wed_Hours: 0,
                        Wed_Minutes: 0,
                        Wed_Date: 0,
                        Wed_Time_In: 0,
                        Wed_Time_Out: 0,
                        Wed_Total_Pay: 0,
                        Thu_Hours: 0,
                        Thu_Minutes: 0,
                        Thu_Date: 0,
                        Thu_Time_In: 0,
                        Thu_Time_Out: 0,
                        Thu_Total_Pay: 0,
                        Fri_Hours: 0,
                        Fri_Minutes: 0,
                        Fri_Date: 0,
                        Fri_Time_In: 0,
                        Fri_Time_Out: 0,
                        Fri_Total_Pay: 0,
                        Sat_Hours: 0,
                        Sat_Minutes: 0,
                        Sat_Date: 0,
                        Sat_Time_In: 0,
                        Sat_Time_Out: 0,
                        Sat_Total_Pay: 0,
                        Sun_Hours: 0,
                        Sun_Minutes: 0,
                        Sun_Date: 0,
                        Sun_Time_In: 0,
                        Sun_Time_Out: 0,
                        Sun_Total_Pay: 0,
                        Weekly_Total_Advance: 0,
                        Weekly_Total_Additional: 0,
                        Weekly_Total_Deduction: 0,
                        Weekly_Total_Pay: 0,
                        Weekly_Hourly_Rate: 10
                    });
                    await new_payroll_2.save();
                }
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
