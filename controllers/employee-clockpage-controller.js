/*
Functions:
-Display the employee-clockpage.hbs (Employee Clockpage) or work-from-home-clockpage.hbs (Work From Home Clock Page) depending on the employee type
-Update the employee time-in status
-Update the payroll with time-in/out logs, date of time-in, and calculations for total hours and minutes per day, total day pay, and weekly total pay
*/

const employee = require('../models/employee_model.js');
const payroll = require('../models/payroll_model.js');
const database = require('../models/database.js');

const employee_clockpage_controller = {
    get_employee_clockpage: function (req, res){
        res.render("employee-clockpage", {email: req.session.Email, emp_type: req.session.Employee_type});
    },

    get_wfh_clockpage: function(req, res){
        res.render("work-from-home-clockpage", {email: req.session.Email, emp_type: req.session.Employee_type});
    },

    get_employee_time_in_status: async function(req, res){
        try{
            const employee_email = req.session.Email;
            
            current_employee = await database.findOne(employee,{Email: employee_email});
            
            const time_in_status = current_employee.IsTimedIn;
    
            res.json({time_in_status});
        }catch(err){
            res.status(500).send("Internal Server Error!");
        }
    },

    post_employee_time_in: async function (req, res){
        const {Time_In, TI_weekdayIndex, Time_In_Date} = req.body;
        const employee_email = req.session.Email;

        await database.updateOne(employee, {Email: req.session.Email}, {IsTimedIn: true})
        if(TI_weekdayIndex === 1){
            await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                $set: {
                    Mon_Time_In: Time_In, 
                    Mon_Date: Time_In_Date,
                    Time_In_Weekday_Index: TI_weekdayIndex,
                }
            });
        }else if(TI_weekdayIndex === 2){
            await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                $set: {
                    Tue_Time_In: Time_In,
                    Tue_Date: Time_In_Date,
                    Time_In_Weekday_Index: TI_weekdayIndex,
                }
            });
        }else if(TI_weekdayIndex === 3){
            await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                $set: {
                    Wed_Time_In: Time_In,
                    Wed_Date: Time_In_Date,
                    Time_In_Weekday_Index: TI_weekdayIndex,
                }
            });
        }else if(TI_weekdayIndex === 4){
            await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                $set: {
                    Thu_Time_In: Time_In,
                    Thu_Date: Time_In_Date,
                    Time_In_Weekday_Index: TI_weekdayIndex,
                }
            });
        }else if(TI_weekdayIndex === 5){
            await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                $set: {
                    Fri_Time_In: Time_In,
                    Fri_Date: Time_In_Date,
                    Time_In_Weekday_Index: TI_weekdayIndex,
                }
            });
        }else if(TI_weekdayIndex === 6){
            await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                $set: {
                    Sat_Time_In: Time_In,
                    Sat_Date: Time_In_Date,
                    Time_In_Weekday_Index: TI_weekdayIndex,
                }
            });
        }else if(TI_weekdayIndex === 0){
            await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                $set: {
                    Sun_Time_In: Time_In,
                    Sun_Date: Time_In_Date,
                    Time_In_Weekday_Index: TI_weekdayIndex,
                }
            });
        }
        res.render("employee-clockpage", {email: req.session.Email, emp_type: req.session.Employee_type, ETI_weekdayIndex: req.session.ETI_weekdayIndex});
        res.render("employee-clockpage", {email: req.session.Email, emp_type: req.session.Employee_type});
    },

    post_employee_time_out: async function (req, res){
        const {TO_hour, TO_minute, TO_weekdayIndex} = req.body;
        const employee_email = req.session.Email;
        const Time_Out = TO_hour + ':' + TO_minute;
        const TO_hour_int = parseInt(TO_hour);
        const TO_minute_int = parseInt(TO_minute);

        const day = await database.findOne(payroll, {Email: employee_email, Week: 0});
        const current_employee = await database.findOne(employee, {Email: employee_email});
        await database.updateOne(employee, {Email: req.session.Email}, {IsTimedIn: false})
        const hr = day.Weekly_Hourly_Rate;
        const mr = (hr/60).toFixed(2);
        const TI_weekdayIndex = day.Time_In_Weekday_Index;

        if(TI_weekdayIndex === 1){
            let [hours, minutes] = day.Mon_Time_In.split(':');
            const TI_hour = parseInt(hours);
            const TI_minute = parseInt(minutes);
            const time_in_total_minutes = TI_hour * 60 + TI_minute;
            var time_out_total_minutes;
            if(TI_weekdayIndex !== TO_weekdayIndex){
                time_out_total_minutes = 23 * 60 + 59;
            }else{
                time_out_total_minutes = TO_hour_int * 60 + TO_minute_int;
            }
            const total_time = time_out_total_minutes - time_in_total_minutes;

            if(total_time < 0){
                total_time += 24 * 60;
            }

            const total_hours = Math.floor(total_time / 60);
            const total_minutes = total_time % 60;

            const total_day_pay = total_hours*hr + total_minutes*mr;
            const Weekly_Pay = day.Weekly_Total_Pay + total_day_pay;

            try{
                await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                    $set: {
                        Mon_Time_Out: Time_Out,
                        Mon_Hours: total_hours,
                        Mon_Minutes: total_minutes,
                        Mon_Total_Pay: total_day_pay,
                        Weekly_Total_Pay: Weekly_Pay
                    }
                });
                if(current_employee.Employee_Type === "Employee"){
                    res.json({ success: true, type: "Emp", message: "Time out recorded successfully!" });
                }else{
                    res.json({ success: true, type: "WFH", message: "Time out recorded successfully!" });
                }
                
                
            }catch(error){
                console.error(error);
                res.status(500).json({ success: false, message: "Error recording time out!" });
            }
        }else if(TI_weekdayIndex === 2){
            let [hours, minutes] = day.Tue_Time_In.split(':');
            const TI_hour = parseInt(hours);
            const TI_minute = parseInt(minutes);
            const time_in_total_minutes = TI_hour * 60 + TI_minute;
            var time_out_total_minutes;
            if(TI_weekdayIndex !== TO_weekdayIndex){
                time_out_total_minutes = 23 * 60 + 59;
            }else{
                time_out_total_minutes = TO_hour_int * 60 + TO_minute_int;
            }
            const total_time = time_out_total_minutes - time_in_total_minutes;

            if(total_time < 0){
                total_time += 24 * 60;
            }

            const total_hours = Math.floor(total_time / 60);
            const total_minutes = total_time % 60;

            const total_day_pay = total_hours*hr + total_minutes*mr;
            const Weekly_Pay = day.Weekly_Total_Pay + total_day_pay;

            try{
                await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                    $set: {
                        Tue_Time_Out: Time_Out,
                        Tue_Hours: total_hours,
                        Tue_Minutes: total_minutes,
                        Tue_Total_Pay: total_day_pay,
                        Weekly_Total_Pay: Weekly_Pay
                    }
                });
                if(current_employee.Employee_Type === "Employee"){
                    res.json({ success: true, type: "Emp", message: "Time out recorded successfully!" });
                }else{
                    res.json({ success: true, type: "WFH", message: "Time out recorded successfully!" });
                }
                
            }catch(error){
                console.error(error);
                res.status(500).json({ success: false, message: "Error recording time out!" });
            }
        }else if(TI_weekdayIndex === 3){
            let [hours, minutes] = day.Wed_Time_In.split(':');
            const TI_hour = parseInt(hours);
            const TI_minute = parseInt(minutes);
            const time_in_total_minutes = TI_hour * 60 + TI_minute;
            var time_out_total_minutes;
            if(TI_weekdayIndex !== TO_weekdayIndex){
                time_out_total_minutes = 23 * 60 + 59;
            }else{
                time_out_total_minutes = TO_hour_int * 60 + TO_minute_int;
            }
            const total_time = time_out_total_minutes - time_in_total_minutes;

            if(total_time < 0){
                total_time += 24 * 60;
            }

            const total_hours = Math.floor(total_time / 60);
            const total_minutes = total_time % 60;

            const total_day_pay = total_hours*hr + total_minutes*mr;
            const Weekly_Pay = day.Weekly_Total_Pay + total_day_pay;

            try{
                await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                    $set: {
                        Wed_Time_Out: Time_Out,
                        Wed_Hours: total_hours,
                        Wed_Minutes: total_minutes,
                        Wed_Total_Pay: total_day_pay,
                        Weekly_Total_Pay: Weekly_Pay
                    }
                });
                if(current_employee.Employee_Type === "Employee"){
                    res.json({ success: true, type: "Emp", message: "Time out recorded successfully!" });
                }else{
                    res.json({ success: true, type: "WFH", message: "Time out recorded successfully!" });
                }
                
            }catch(error){
                console.error(error);
                res.status(500).json({ success: false, message: "Error recording time out!" });
            }
        }else if(TI_weekdayIndex === 4){
            let [hours, minutes] = day.Thu_Time_In.split(':');
            const TI_hour = parseInt(hours);
            const TI_minute = parseInt(minutes);
            const time_in_total_minutes = TI_hour * 60 + TI_minute;
            var time_out_total_minutes;
            if(TI_weekdayIndex !== TO_weekdayIndex){
                time_out_total_minutes = 23 * 60 + 59;
            }else{
                time_out_total_minutes = TO_hour_int * 60 + TO_minute_int;
            }
            const total_time = time_out_total_minutes - time_in_total_minutes;

            if(total_time < 0){
                total_time += 24 * 60;
            }

            const total_hours = Math.floor(total_time / 60);
            const total_minutes = total_time % 60;

            const total_day_pay = total_hours*hr + total_minutes*mr;
            const Weekly_Pay = day.Weekly_Total_Pay + total_day_pay;

            try{
                await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                    $set: {
                        Thu_Time_Out: Time_Out,
                        Thu_Hours: total_hours,
                        Thu_Minutes: total_minutes,
                        Thu_Total_Pay: total_day_pay,
                        Weekly_Total_Pay: Weekly_Pay
                    }
                });
                if(current_employee.Employee_Type === "Employee"){
                    res.json({ success: true, type: "Emp", message: "Time out recorded successfully!" });
                }else{
                    res.json({ success: true, type: "WFH", message: "Time out recorded successfully!" });
                }
                
            }catch(error){
                console.error(error);
                res.status(500).json({ success: false, message: "Error recording time out!" });
            }
        }else if(TI_weekdayIndex === 5){
            let [hours, minutes] = day.Fri_Time_In.split(':');
            const TI_hour = parseInt(hours);
            const TI_minute = parseInt(minutes);
            const time_in_total_minutes = TI_hour * 60 + TI_minute;
            var time_out_total_minutes;
            if(TI_weekdayIndex !== TO_weekdayIndex){
                time_out_total_minutes = 23 * 60 + 59;
            }else{
                time_out_total_minutes = TO_hour_int * 60 + TO_minute_int;
            }
            const total_time = time_out_total_minutes - time_in_total_minutes;

            if(total_time < 0){
                total_time += 24 * 60;
            }

            const total_hours = Math.floor(total_time / 60);
            const total_minutes = total_time % 60;

            const total_day_pay = total_hours*hr + total_minutes*mr;
            const Weekly_Pay = day.Weekly_Total_Pay + total_day_pay;

            try{
                await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                    $set: {
                        Fri_Time_Out: Time_Out,
                        Fri_Hours: total_hours,
                        Fri_Minutes: total_minutes,
                        Fri_Total_Pay: total_day_pay,
                        Weekly_Total_Pay: Weekly_Pay
                    }
                });
                if(current_employee.Employee_Type === "Employee"){
                    res.json({ success: true, type: "Emp", message: "Time out recorded successfully!" });
                }else{
                    res.json({ success: true, type: "WFH", message: "Time out recorded successfully!" });
                }
                
            }catch(error){
                console.error(error);
                res.status(500).json({ success: false, message: "Error recording time out!" });
            }
        }else if(TI_weekdayIndex === 6){
            let [hours, minutes] = day.Sat_Time_In.split(':');
            const TI_hour = parseInt(hours);
            const TI_minute = parseInt(minutes);
            const time_in_total_minutes = TI_hour * 60 + TI_minute;
            var time_out_total_minutes;
            if(TI_weekdayIndex !== TO_weekdayIndex){
                time_out_total_minutes = 23 * 60 + 59;
            }else{
                time_out_total_minutes = TO_hour_int * 60 + TO_minute_int;
            }
            const total_time = time_out_total_minutes - time_in_total_minutes;

            if(total_time < 0){
                total_time += 24 * 60;
            } 

            const total_hours = Math.floor(total_time / 60);
            const total_minutes = total_time % 60;

            const total_day_pay = total_hours*hr + total_minutes*mr;
            const Weekly_Pay = day.Weekly_Total_Pay + total_day_pay;

            try{//add the creation of new payroll here per employee
                await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                    $set: {
                        Sat_Time_Out: Time_Out,
                        Sat_Hours: total_hours,
                        Sat_Minutes: total_minutes,
                        Sat_Total_Pay: total_day_pay,
                        Weekly_Total_Pay: Weekly_Pay
                    }
                });
                if(current_employee.Employee_Type === "Employee"){
                    res.json({ success: true, type: "Emp", message: "Time out recorded successfully!" });
                }else{
                    res.json({ success: true, type: "WFH", message: "Time out recorded successfully!" });
                }
                
            }catch(error){
                console.error(error);
                res.status(500).json({ success: false, message: "Error recording time out!" });
            }
        }else if(TI_weekdayIndex === 0){//sunday keep or remove
            let [hours, minutes] = day.Sun_Time_In.split(':');
            const TI_hour = parseInt(hours);
            const TI_minute = parseInt(minutes);
            const time_in_total_minutes = TI_hour * 60 + TI_minute;
            var time_out_total_minutes;
            if(TI_weekdayIndex !== TO_weekdayIndex){
                time_out_total_minutes = 23 * 60 + 59;
            }else{
                time_out_total_minutes = TO_hour_int * 60 + TO_minute_int;
            }
            const total_time = time_out_total_minutes - time_in_total_minutes;

            if(total_time < 0){
                total_time += 24 * 60;
            } 

            const total_hours = Math.floor(total_time / 60);
            const total_minutes = total_time % 60;

            const total_day_pay = total_hours*hr + total_minutes*mr;
            const Weekly_Pay = day.Weekly_Total_Pay + total_day_pay;

            try{
                await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                    $set: {
                        Sun_Time_Out: Time_Out,
                        Sun_Hours: total_hours,
                        Sun_Minutes: total_minutes,
                        Sun_Total_Pay: total_day_pay,
                        Weekly_Total_Pay: Weekly_Pay
                    }
                });
                if(current_employee.Employee_Type === "Employee"){
                    res.status(200).json({ success: true, type: "Emp", message: "Time out recorded successfully!" });
                }else{
                    res.status(200).json({ success: true, type: "WFH", message: "Time out recorded successfully!" });
                }
                
            }catch(error){
                console.error(error);
                res.status(500).json({ success: false, message: "Error recording time out!" });
            }
        }
    }

}

module.exports = employee_clockpage_controller;
