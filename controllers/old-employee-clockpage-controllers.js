const employee = require('../models/employee_model.js');
const payroll = require('../models/payroll_model.js');
const database = require('../models/database.js');

const employee_clockpage_controller = {
    get_employee_clockpage: function (req, res){
        res.render("employee-clockpage", {email: req.session.Email, emp_type: req.session.Employee_type});
    },

    post_employee_time_in: async function (req, res){
        const {TI_hour, TI_minute, TI_weekdayIndex} = req.body;
        req.session.ETI_hour = TI_hour;
        req.session.ETI_minute =  TI_minute;
        //req.session.ETI_weekdayIndex = TI_weekdayIndex;
        req.session.ETI_weekdayIndex = 1;//remove later
        console.log("req session hour: " + req.session.ETI_hour + " req session minute: " + req.session.ETI_minute);
        res.render("employee-dashboard", {email: req.session.Email, emp_type: req.session.Employee_type, ETI_hour: req.session.ETI_hour, ETI_minute:  req.session.ETI_minute, ETI_weekdayIndex: req.session.ETI_weekdayIndex})
    },

    post_employee_time_out: async function (req, res){
        console.log("post_employee_time_out part");
        const {TO_hour, TO_minute} = req.body;

        const TI_hour = parseInt(req.session.ETI_hour);
        const TI_minute = parseInt(req.session.ETI_minute);

        const TO_hour_int = parseInt(TO_hour);
        const TO_minute_int = parseInt(TO_minute);

        const time_in_total_minutes = TI_hour * 60 + TI_minute;
        const time_out_total_minutes = TO_hour_int * 60 + TO_minute_int;

        const total_time = time_out_total_minutes - time_in_total_minutes;

        if(total_time < 0){
            total_time += 24 * 60;
        }

        const total_hours = Math.floor(total_time / 60);
        const total_minutes = total_time % 60;
        const employee_email = req.session.Email;
        
        if(req.session.ETI_weekdayIndex === 1){
            try{
                await database.updateOne(payroll, {Email: employee_email}, {
                    $set: {
                        Mon_Hours: total_hours,
                        Mon_Minutes: total_minutes
                    }
                });
                res.json({ success: true, message: "Time out recorded successfully!" });
                
            }catch(error){
                console.error(error);
                res.status(500).json({ success: false, message: "Error recording time out!" });
            }
        }else if(req.session.ETI_weekdayIndex === 2){
            try{
                await database.updateOne(payroll, {Email: employee_email}, {
                    $set: {
                        Tue_Hours: total_hours,
                        Tue_Minutes: total_minutes
                    }
                });
                res.json({ success: true, message: "Time out recorded successfully!" });
                
            }catch(error){
                console.error(error);
                res.status(500).json({ success: false, message: "Error recording time out!" });
            }
        }else if(req.session.ETI_weekdayIndex === 3){
            try{
                await database.updateOne(payroll, {Email: employee_email}, {
                    $set: {
                        Wed_Hours: total_hours,
                        Wed_Minutes: total_minutes
                    }
                });
                res.json({ success: true, message: "Time out recorded successfully!" });
                
            }catch(error){
                console.error(error);
                res.status(500).json({ success: false, message: "Error recording time out!" });
            }
        }else if(req.session.ETI_weekdayIndex === 4){
            try{
                await database.updateOne(payroll, {Email: employee_email}, {
                    $set: {
                        Thu_Hours: total_hours,
                        Thu_Minutes: total_minutes
                    }
                });
                res.json({ success: true, message: "Time out recorded successfully!" });
                
            }catch(error){
                console.error(error);
                res.status(500).json({ success: false, message: "Error recording time out!" });
            }
        }else if(req.session.ETI_weekdayIndex === 5){
            try{
                await database.updateOne(payroll, {Email: employee_email}, {
                    $set: {
                        Fri_Hours: total_hours,
                        Fri_Minutes: total_minutes
                    }
                });
                res.json({ success: true, message: "Time out recorded successfully!" });
                
            }catch(error){
                console.error(error);
                res.status(500).json({ success: false, message: "Error recording time out!" });
            }
        }else if(req.session.ETI_weekdayIndex === 6){
            try{
                await database.updateOne(payroll, {Email: employee_email}, {
                    $set: {
                        Sat_Hours: total_hours,
                        Sat_Minutes: total_minutes
                    }
                });
                res.json({ success: true, message: "Time out recorded successfully!" });
                
            }catch(error){
                console.error(error);
                res.status(500).json({ success: false, message: "Error recording time out!" });
            }
        }
    }
}

module.exports = employee_clockpage_controller;

//if(req.session.ETI_weekdayIndex === 1)