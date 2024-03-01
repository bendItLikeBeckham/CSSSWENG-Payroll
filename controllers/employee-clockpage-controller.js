const employee = require('../models/employee_model.js');
const payroll = require('../models/payroll_model.js');
const database = require('../models/database.js');

const employee_clockpage_controller = {
    get_employee_clockpage: function (req, res){
        res.render("employee-clockpage", {email: req.session.Email, emp_type: req.session.Employee_type});
    },

    post_employee_time_in: async function (req, res){
        const {Time_In, TI_weekdayIndex} = req.body;
        req.session.ETI_weekdayIndex = TI_weekdayIndex;// uncomment this later
        //req.session.ETI_weekdayIndex = 1;//remove later
        const employee_email = req.session.Email;

        console.log(employee_email)

        await database.updateOne(employee, {Email: req.session.Email}, {IsTimedIn: true})

        if(TI_weekdayIndex === 1){//change this later to TI_weekdayIndex
            await database.updateOne(payroll, {Email: employee_email}, {
                $set: {
                    Mon_Time_In: Time_In
                }
            });
        }else if(TI_weekdayIndex === 2){
            await database.updateOne(payroll, {Email: employee_email}, {
                $set: {
                    Tue_Time_In: Time_In
                }
            });
        }else if(TI_weekdayIndex === 3){
            await database.updateOne(payroll, {Email: employee_email}, {
                $set: {
                    Wed_Time_In: Time_In
                }
            });
        }else if(TI_weekdayIndex === 4){
            await database.updateOne(payroll, {Email: employee_email}, {
                $set: {
                    Thu_Time_In: Time_In
                }
            });
        }else if(TI_weekdayIndex === 5){
            await database.updateOne(payroll, {Email: employee_email}, {
                $set: {
                    Fri_Time_In: Time_In
                }
            });
        }else if(TI_weekdayIndex === 6){
            await database.updateOne(payroll, {Email: employee_email}, {
                $set: {
                    Sat_Time_In: Time_In
                }
            });
        }
        res.render("employee-clockpage", {email: req.session.Email, emp_type: req.session.Employee_type, ETI_weekdayIndex: req.session.ETI_weekdayIndex});
    },

    post_employee_time_out: async function (req, res){
        const {TO_hour, TO_minute} = req.body;
        const employee_email = req.session.Email;
        const Time_Out = TO_hour + ':' + TO_minute;
        const TO_hour_int = parseInt(TO_hour);
        const TO_minute_int = parseInt(TO_minute);
        console.log("Time_Out: " + Time_Out);
        const hr = 10.00; //hourly rate
        const mr = 0.17; //minute rate
        const day = await database.findOne(payroll, {Email: employee_email});

        await database.updateOne(employee, {Email: req.session.Email}, {IsTimedIn: false})//makes employee time-in status be false 

        if(req.session.ETI_weekdayIndex === 1){
            let [hours, minutes] = day.Mon_Time_In.split(':');
            const TI_hour = parseInt(hours);
            const TI_minute = parseInt(minutes);
            console.log("hours: " + TI_hour + " minutes: " + TI_minute);//remove later
            console.log("TO hours: " + TO_hour + " TO minutes: " + TO_minute);//remove later
            const time_in_total_minutes = TI_hour * 60 + TI_minute;
            const time_out_total_minutes = TO_hour_int * 60 + TO_minute_int;
            const total_time = time_out_total_minutes - time_in_total_minutes;

            if(total_time < 0){
                total_time += 24 * 60;
            }

            const total_hours = Math.floor(total_time / 60);
            const total_minutes = total_time % 60;

            const total_day_pay = total_hours*10 + total_minutes*0.17;

            try{
                await database.updateOne(payroll, {Email: employee_email}, {
                    $set: {
                        Mon_Time_Out: Time_Out,
                        Mon_Hours: total_hours,
                        Mon_Minutes: total_minutes,
                        Mon_Total_Pay: total_day_pay
                    }
                });
                res.json({ success: true, message: "Time out recorded successfully!" });
                
            }catch(error){
                console.error(error);
                res.status(500).json({ success: false, message: "Error recording time out!" });
            }
        }else if(req.session.ETI_weekdayIndex === 2){
            let [hours, minutes] = day.Tue_Time_In.split(':');
            const TI_hour = parseInt(hours);
            const TI_minute = parseInt(minutes);
            console.log("hours: " + TI_hour + " minutes: " + TI_minute);//remove later
            console.log("TO hours: " + TO_hour + " TO minutes: " + TO_minute);//remove later
            const time_in_total_minutes = TI_hour * 60 + TI_minute;
            const time_out_total_minutes = TO_hour_int * 60 + TO_minute_int;
            const total_time = time_out_total_minutes - time_in_total_minutes;

            if(total_time < 0){
                total_time += 24 * 60;
            }

            const total_hours = Math.floor(total_time / 60);
            const total_minutes = total_time % 60;

            const total_day_pay = total_hours*10 + total_minutes*0.17;

            try{
                await database.updateOne(payroll, {Email: employee_email}, {
                    $set: {
                        Tue_Time_Out: Time_Out,
                        Tue_Hours: total_hours,
                        Tue_Minutes: total_minutes,
                        Tue_Total_Pay: total_day_pay
                    }
                });
                res.json({ success: true, message: "Time out recorded successfully!" });
                
            }catch(error){
                console.error(error);
                res.status(500).json({ success: false, message: "Error recording time out!" });
            }
        }else if(req.session.ETI_weekdayIndex === 3){
            let [hours, minutes] = day.Wed_Time_In.split(':');
            const TI_hour = parseInt(hours);
            const TI_minute = parseInt(minutes);
            console.log("hours: " + TI_hour + " minutes: " + TI_minute);//remove later
            console.log("TO hours: " + TO_hour + " TO minutes: " + TO_minute);//remove later
            const time_in_total_minutes = TI_hour * 60 + TI_minute;
            const time_out_total_minutes = TO_hour_int * 60 + TO_minute_int;
            const total_time = time_out_total_minutes - time_in_total_minutes;

            if(total_time < 0){
                total_time += 24 * 60;
            }

            const total_hours = Math.floor(total_time / 60);
            const total_minutes = total_time % 60;

            const total_day_pay = total_hours*10 + total_minutes*0.17;

            try{
                await database.updateOne(payroll, {Email: employee_email}, {
                    $set: {
                        Wed_Time_Out: Time_Out,
                        Wed_Hours: total_hours,
                        Wed_Minutes: total_minutes,
                        Wed_Total_Pay: total_day_pay
                    }
                });
                res.json({ success: true, message: "Time out recorded successfully!" });
                
            }catch(error){
                console.error(error);
                res.status(500).json({ success: false, message: "Error recording time out!" });
            }
        }else if(req.session.ETI_weekdayIndex === 4){
            let [hours, minutes] = day.Thu_Time_In.split(':');
            const TI_hour = parseInt(hours);
            const TI_minute = parseInt(minutes);
            console.log("hours: " + TI_hour + " minutes: " + TI_minute);//remove later
            console.log("TO hours: " + TO_hour + " TO minutes: " + TO_minute);//remove later
            const time_in_total_minutes = TI_hour * 60 + TI_minute;
            const time_out_total_minutes = TO_hour_int * 60 + TO_minute_int;
            const total_time = time_out_total_minutes - time_in_total_minutes;

            if(total_time < 0){
                total_time += 24 * 60;
            }

            const total_hours = Math.floor(total_time / 60);
            const total_minutes = total_time % 60;

            const total_day_pay = total_hours*10 + total_minutes*0.17;

            try{
                await database.updateOne(payroll, {Email: employee_email}, {
                    $set: {
                        Thu_Time_Out: Time_Out,
                        Thu_Hours: total_hours,
                        Thu_Minutes: total_minutes,
                        Thu_Total_Pay: total_day_pay
                    }
                });
                res.json({ success: true, message: "Time out recorded successfully!" });
                
            }catch(error){
                console.error(error);
                res.status(500).json({ success: false, message: "Error recording time out!" });
            }
        }else if(req.session.ETI_weekdayIndex === 5){
            let [hours, minutes] = day.Fri_Time_In.split(':');
            const TI_hour = parseInt(hours);
            const TI_minute = parseInt(minutes);
            console.log("hours: " + TI_hour + " minutes: " + TI_minute);//remove later
            console.log("TO hours: " + TO_hour + " TO minutes: " + TO_minute);//remove later
            const time_in_total_minutes = TI_hour * 60 + TI_minute;
            const time_out_total_minutes = TO_hour_int * 60 + TO_minute_int;
            const total_time = time_out_total_minutes - time_in_total_minutes;

            if(total_time < 0){
                total_time += 24 * 60;
            }

            const total_hours = Math.floor(total_time / 60);
            const total_minutes = total_time % 60;

            const total_day_pay = total_hours*10 + total_minutes*0.17;

            try{
                await database.updateOne(payroll, {Email: employee_email}, {
                    $set: {
                        Fri_Time_Out: Time_Out,
                        Fri_Hours: total_hours,
                        Fri_Minutes: total_minutes,
                        Fri_Total_Pay: total_day_pay
                    }
                });
                res.json({ success: true, message: "Time out recorded successfully!" });
                
            }catch(error){
                console.error(error);
                res.status(500).json({ success: false, message: "Error recording time out!" });
            }
        }else if(req.session.ETI_weekdayIndex === 6){
            let [hours, minutes] = day.Sat_Time_In.split(':');
            const TI_hour = parseInt(hours);
            const TI_minute = parseInt(minutes);
            console.log("hours: " + TI_hour + " minutes: " + TI_minute);//remove later
            console.log("TO hours: " + TO_hour + " TO minutes: " + TO_minute);//remove later
            const time_in_total_minutes = TI_hour * 60 + TI_minute;
            const time_out_total_minutes = TO_hour_int * 60 + TO_minute_int;
            const total_time = time_out_total_minutes - time_in_total_minutes;

            if(total_time < 0){
                total_time += 24 * 60;
            }

            const total_hours = Math.floor(total_time / 60);
            const total_minutes = total_time % 60;

            const total_day_pay = total_hours*10 + total_minutes*0.17;

            try{
                await database.updateOne(payroll, {Email: employee_email}, {
                    $set: {
                        Sat_Time_Out: Time_Out,
                        Sat_Hours: total_hours,
                        Sat_Minutes: total_minutes,
                        Sat_Total_Pay: total_day_pay
                    }
                });
                res.json({ success: true, message: "Time out recorded successfully!" });
                
            }catch(error){
                console.error(error);
                res.status(500).json({ success: false, message: "Error recording time out!" });
            }
        }

        const weekly_pay_total = day.Mon_Total_Pay + day.Tue_Total_Pay + day.Wed_Total_Pay +
        day.Thu_Total_Pay + day.Fri_Total_Pay + day.Sat_Total_Pay + 
        day.Weekly_Total_Bonus - day.Weekly_Total_Bale - day.Weekly_Total_Deductions;
        //try{
            await database.updateOne(payroll, {Email: employee_email}, {
                $set: {
                    Weekly_Total_Pay: weekly_pay_total
                }
            });
        //}
        
    }

}

module.exports = employee_clockpage_controller;

//if(req.session.ETI_weekdayIndex === 1)