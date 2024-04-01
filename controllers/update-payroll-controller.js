/*
Functions:
Updating the payroll on PST: Sunday 12am or UST: Saturday 4pm
Payroll: week 0 to week 1, week 1 to week 2, and week 0 to default values
*/

const payroll = require('../models/payroll_model.js');
const employee = require('../models/employee_model.js');
const database = require('../models/database.js');

const update_payroll_controller = {
    post_update_employee_payroll: async function (req, res){
        const employee_email_data = await database.findMany(employee, {$or: [{Employee_Type: "Employee"},{Employee_Type: "Work From Home"}]});

        if(employee_email_data.length > 0){
            for(let i = 0; i < employee_email_data.length; i++){
                const employee_email = employee_email_data[i].Email;
                const week_1 = await database.findOne(payroll, {Email: employee_email, Week: 1});
                const week_0 = await database.findOne(payroll, {Email: employee_email, Week: 0});
        
                //updating the values of week 2 with week 1 values
                await database.updateOne(payroll, {Email: employee_email, Week: 2}, {
                    $set: {
                        Time_In_Weekday_Index: 0,
                        Mon_Hours: week_1.Mon_Hours,
                        Mon_Minutes: week_1.Mon_Minutes,
                        Mon_Date: week_1.Mon_Date,
                        Mon_Time_In: week_1.Mon_Time_In,
                        Mon_Time_Out: week_1.Mon_Time_Out,
                        Mon_Total_Pay: week_1.Mon_Total_Pay,
                        Tue_Hours: week_1.Tue_Hours,
                        Tue_Minutes: week_1.Tue_Minutes,
                        Tue_Date: week_1.Tue_Date,
                        Tue_Time_In: week_1.Tue_Time_In,
                        Tue_Time_Out: week_1.Tue_Time_Out,
                        Tue_Total_Pay: week_1.Tue_Total_Pay,
                        Wed_Hours: week_1.Wed_Hours,
                        Wed_Minutes: week_1.Wed_Minutes,
                        Wed_Date: week_1.Wed_Date,
                        Wed_Time_In: week_1.Wed_Time_In,
                        Wed_Time_Out: week_1.Wed_Time_Out,
                        Wed_Total_Pay: week_1.Wed_Total_Pay,
                        Thu_Hours: week_1.Thu_Hours,
                        Thu_Minutes: week_1.Thu_Minutes,
                        Thu_Date: week_1.Thu_Date,
                        Thu_Time_In: week_1.Thu_Time_In,
                        Thu_Time_Out: week_1.Thu_Time_Out,
                        Thu_Total_Pay: week_1.Thu_Total_Pay,
                        Fri_Hours: week_1.Fri_Hours,
                        Fri_Minutes: week_1.Fri_Minutes,
                        Fri_Date: week_1.Fri_Date,
                        Fri_Time_In: week_1.Fri_Time_In,
                        Fri_Time_Out: week_1.Fri_Time_Out,
                        Fri_Total_Pay: week_1.Fri_Total_Pay,
                        Sat_Hours: week_1.Sat_Hours,
                        Sat_Minutes: week_1.Sat_Minutes,
                        Sat_Date: week_1.Sat_Date,
                        Sat_Time_In: week_1.Sat_Time_In,
                        Sat_Time_Out: week_1.Sat_Time_Out,
                        Sat_Total_Pay: week_1.Sat_Total_Pay,
                        Sun_Hours: week_1.Sun_Hours,
                        Sun_Minutes: week_1.Sun_Minutes,
                        Sun_Date: week_1.Sun_Date,
                        Sun_Time_In: week_1.Sun_Time_In,
                        Sun_Time_Out: week_1.Sun_Time_Out,
                        Sun_Total_Pay: week_1.Sun_Total_Pay,
                        Weekly_Total_Advance: week_1.Weekly_Total_Advance,
                        Weekly_Total_Additional: week_1.Weekly_Total_Additional,
                        Weekly_Total_Deduction: week_1.Weekly_Total_Deduction,
                        Weekly_Total_Pay: week_1.Weekly_Total_Pay,
                        Weekly_Hourly_Rate: week_1.Weekly_Hourly_Rate
                    }
                });
        
                //updating the values of week 1 with week 0 values
                await database.updateOne(payroll, {Email: employee_email, Week: 1}, {
                    $set: {
                        Time_In_Weekday_Index: 0,
                        Mon_Hours: week_0.Mon_Hours,
                        Mon_Minutes: week_0.Mon_Minutes,
                        Mon_Date: week_0.Mon_Date,
                        Mon_Time_In: week_0.Mon_Time_In,
                        Mon_Time_Out: week_0.Mon_Time_Out,
                        Mon_Total_Pay: week_0.Mon_Total_Pay,
                        Tue_Hours: week_0.Tue_Hours,
                        Tue_Minutes: week_0.Tue_Minutes,
                        Tue_Date: week_0.Tue_Date,
                        Tue_Time_In: week_0.Tue_Time_In,
                        Tue_Time_Out: week_0.Tue_Time_Out,
                        Tue_Total_Pay: week_0.Tue_Total_Pay,
                        Wed_Hours: week_0.Wed_Hours,
                        Wed_Minutes: week_0.Wed_Minutes,
                        Wed_Date: week_0.Wed_Date,
                        Wed_Time_In: week_0.Wed_Time_In,
                        Wed_Time_Out: week_0.Wed_Time_Out,
                        Wed_Total_Pay: week_0.Wed_Total_Pay,
                        Thu_Hours: week_0.Thu_Hours,
                        Thu_Minutes: week_0.Thu_Minutes,
                        Thu_Date: week_0.Thu_Date,
                        Thu_Time_In: week_0.Thu_Time_In,
                        Thu_Time_Out: week_0.Thu_Time_Out,
                        Thu_Total_Pay: week_0.Thu_Total_Pay,
                        Fri_Hours: week_0.Fri_Hours,
                        Fri_Minutes: week_0.Fri_Minutes,
                        Fri_Date: week_0.Fri_Date,
                        Fri_Time_In: week_0.Fri_Time_In,
                        Fri_Time_Out: week_0.Fri_Time_Out,
                        Fri_Total_Pay: week_0.Fri_Total_Pay,
                        Sat_Hours: week_0.Sat_Hours,
                        Sat_Minutes: week_0.Sat_Minutes,
                        Sat_Date: week_0.Sat_Date,
                        Sat_Time_In: week_0.Sat_Time_In,
                        Sat_Time_Out: week_0.Sat_Time_Out,
                        Sat_Total_Pay: week_0.Sat_Total_Pay,
                        Sun_Hours: week_0.Sun_Hours,
                        Sun_Minutes: week_0.Sun_Minutes,
                        Sun_Date: week_0.Sun_Date,
                        Sun_Time_In: week_0.Sun_Time_In,
                        Sun_Time_Out: week_0.Sun_Time_Out,
                        Sun_Total_Pay: week_0.Sun_Total_Pay,
                        Weekly_Total_Advance: week_0.Weekly_Total_Advance,
                        Weekly_Total_Additional: week_0.Weekly_Total_Additional,
                        Weekly_Total_Deduction: week_0.Weekly_Total_Deduction,
                        Weekly_Total_Pay: week_0.Weekly_Total_Pay,
                        Weekly_Hourly_Rate: week_0.Weekly_Hourly_Rate
                    }
                });
        
                //updating the values of week 0 with default values
                await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                    $set: {
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
                    }
                });
            }
        }

    }
} 

module.exports = update_payroll_controller;