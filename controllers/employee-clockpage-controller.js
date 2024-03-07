const employee = require('../models/employee_model.js');
const payroll = require('../models/payroll_model.js');
const database = require('../models/database.js');

const employee_clockpage_controller = {
    get_employee_clockpage: function (req, res){
        res.render("employee-clockpage", {email: req.session.Email, emp_type: req.session.Employee_type, timeInStatus: req.session.IsTimedIn});
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

    post_employee_time_in: async function (req, res){ // include checking if a week has passed, if yes create new payroll.
        const {Time_In, TI_weekdayIndex, Time_In_Date} = req.body;
        req.session.ETI_weekdayIndex = TI_weekdayIndex;// uncomment this later
        //req.session.ETI_weekdayIndex = 6;//remove later
        const employee_email = req.session.Email;

        console.log(employee_email)

        await database.updateOne(employee, {Email: req.session.Email}, {IsTimedIn: true})

        if(TI_weekdayIndex === 1){//change this later to TI_weekdayIndex
            await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                $set: {
                    Mon_Time_In: Time_In,
                    Mon_Date: Time_In_Date
                }
            });
        }else if(TI_weekdayIndex === 2){
            await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                $set: {
                    Tue_Time_In: Time_In,
                    Tue_Date: Time_In_Date
                }
            });
        }else if(TI_weekdayIndex === 3){
            await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                $set: {
                    Wed_Time_In: Time_In,
                    Wed_Date: Time_In_Date
                }
            });
        }else if(TI_weekdayIndex === 4){
            await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                $set: {
                    Thu_Time_In: Time_In,
                    Thu_Date: Time_In_Date
                }
            });
        }else if(TI_weekdayIndex === 5){
            await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                $set: {
                    Fri_Time_In: Time_In,
                    Fri_Date: Time_In_Date
                }
            });
        }else if(TI_weekdayIndex === 6){
            await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
                $set: {
                    Sat_Time_In: Time_In,
                    Sat_Date: Time_In_Date
                }
            });
        }
        res.render("employee-clockpage", {email: req.session.Email, emp_type: req.session.Employee_type, ETI_weekdayIndex: req.session.ETI_weekdayIndex});
    },

    post_employee_time_out: async function (req, res){//debug/check data if time in is monday and timeout is tuesday
        const {TO_hour, TO_minute} = req.body;
        const employee_email = req.session.Email;
        const Time_Out = TO_hour + ':' + TO_minute;
        const TO_hour_int = parseInt(TO_hour);
        const TO_minute_int = parseInt(TO_minute);
        console.log("Time_Out: " + Time_Out);
        //const hr = 10.00; //hourly rate
        //const mr = 0.17; //minute rate
        const day = await database.findOne(payroll, {Email: employee_email, Week: 0});

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
                await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
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
                await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
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
                await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
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
                await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
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
                await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
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

            try{//add the creation of new payroll here per employee
                await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
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

        const e_o_week = await database.findOne(payroll, {Email: employee_email, Week: 0});

        const weekly_pay_total = e_o_week.Mon_Total_Pay + e_o_week.Tue_Total_Pay + e_o_week.Wed_Total_Pay +
        e_o_week.Thu_Total_Pay + e_o_week.Fri_Total_Pay + e_o_week.Sat_Total_Pay + 
        e_o_week.Weekly_Total_Additional + e_o_week.Weekly_Total_Advance - e_o_week.Weekly_Total_Deduction;

        //error checking here if week 1/2 doesnt exist

        const week_2_exist = await database.findOne(payroll, {Email: employee_email, Week: 2});
        if(week_2_exist){
            await database.deleteOne(payroll, {Email: employee_email, Week: 2});
        }

        const week_1_exist = await database.findOne(payroll, {Email: employee_email, Week: 1});
        if(week_1_exist){
            await database.updateOne(payroll, {Email: employee_email, Week: 1}, {
                $set: {
                    Week: 2
                }
            });
        }
        
        await database.updateOne(payroll, {Email: employee_email, Week: 0}, {
            $set: {
                Weekly_Total_Pay: weekly_pay_total,
                Week: 1
            }
        });

        const new_payroll = new payroll({
            Email: employee_email,
            Week: 0,
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
            Weekly_Total_Advance: 0,
            Weekly_Total_Additional: 0,
            Weekly_Total_Deduction: 0,
            Weekly_Total_Pay: 0,
        });
        await new_payroll.save();
    }

}

module.exports = employee_clockpage_controller;

//if(req.session.ETI_weekdayIndex === 1)