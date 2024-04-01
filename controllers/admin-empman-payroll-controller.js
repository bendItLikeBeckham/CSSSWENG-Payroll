const employee = require('../models/employee_model.js');
const payroll = require('../models/payroll_model.js');
const database = require('../models/database.js');

const admin_empman_payroll_controller = {
    get_admin_empman_payroll: function(req, res){
        res.render("admin-empman-payroll");
    },

    get_emp_total: async function(req, res){
        console.log("get_emp_total_wp part here"); //remove later
        try{
            const emp_total = await database.findMany(employee, {$or: [{Employee_Type: "Employee"},{Employee_Type: "Work From Home"}]});

            console.log("before emp_total data: " + emp_total);
            emp_total.sort((a, b) => {
                const emailA = (a.Email || '').toLowerCase();
                const emailB = (b.Email || '').toLowerCase();
                
                return emailA.localeCompare(emailB);
            });

            console.log("after sort emp_total data: " + emp_total);

            res.render("admin-empman-payroll", {emp_total});
        }catch(error){
            console.error("Error processing employee total: ", error);
            res.status(500).send("Internal Server Error!");
        }
    }, 

    //start here
    get_emp_wpay: async function(req, res){
        const selected_employee = req.query.employee;
        const selected_week = req.query.week;
        try{
            const emp_wpay = await database.findOne(payroll, {Email: selected_employee, Week: selected_week});//default is week 0
            const emp_total = await database.findMany(employee, {$or: [{Employee_Type: "Employee"},{Employee_Type: "Work From Home"}]});

            emp_total.sort((a, b) => {
                const emailA = (a.Email || '').toLowerCase();
                const emailB = (b.Email || '').toLowerCase();
                
                return emailA.localeCompare(emailB);
            });

            function padZero(num){
                if (num < 10){
                    num = "0" + num
                }
                console.log(num)
                return num
            }

            emp_wpay.Mon_Minutes =  padZero(emp_wpay.Mon_Minutes.toString());
            emp_wpay.Tue_Minutes =  padZero(emp_wpay.Tue_Minutes.toString());
            emp_wpay.Wed_Minutes =  padZero(emp_wpay.Wed_Minutes.toString());
            emp_wpay.Thu_Minutes =  padZero(emp_wpay.Thu_Minutes.toString());
            emp_wpay.Fri_Minutes =  padZero(emp_wpay.Fri_Minutes.toString());
            emp_wpay.Sat_Minutes =  padZero(emp_wpay.Sat_Minutes.toString());
            emp_wpay.Sun_Minutes =  padZero(emp_wpay.Sun_Minutes.toString());

            console.log("emp_pay data: " + emp_wpay); //remove later

            res.render("admin-empman-payroll", {emp_wpay, emp_total});
        }catch(error){
            console.error("Error processing weekly payroll: ", error);
            res.status(500).send("Internal Server Error!");
        }
    },

    post_update_payroll: async function(req, res){
        console.log("post_update_payroll"); //remove later

        const {PPH, PPM, Additional, Advance, Deduction, Payroll_ID, cur_email, cur_week} = req.body;

        const upd_pay = await database.findOne(payroll, {_id: Payroll_ID});

        //sun hours and minutes to add??
        console.log("PPH: " + PPH);
        console.log("PPM: " + PPM);
        console.log("Additional: " + Additional);
        console.log("Advance: " + Advance);
        console.log("Deduction: " + Deduction);

        var mon_t_pay = upd_pay.Mon_Total_Pay;
        var tue_t_pay = upd_pay.Tue_Total_Pay;
        var wed_t_pay = upd_pay.Wed_Total_Pay;
        var thu_t_pay = upd_pay.Thu_Total_Pay;
        var fri_t_pay = upd_pay.Fri_Total_Pay;
        var sat_t_pay = upd_pay.Sat_Total_Pay;
        var sun_t_pay = upd_pay.Sun_Total_Pay;

        if(Additional === false && Advance === false && Deduction === false){
            mon_t_pay = (upd_pay.Mon_Hours * PPH) + (upd_pay.Mon_Minutes * PPM);
            tue_t_pay = (upd_pay.Tue_Hours * PPH) + (upd_pay.Tue_Minutes * PPM);
            wed_t_pay = (upd_pay.Wed_Hours * PPH) + (upd_pay.Wed_Minutes * PPM);
            thu_t_pay = (upd_pay.Thu_Hours * PPH) + (upd_pay.Thu_Minutes * PPM);
            fri_t_pay = (upd_pay.Fri_Hours * PPH) + (upd_pay.Fri_Minutes * PPM);
            sat_t_pay = (upd_pay.Sat_Hours * PPH) + (upd_pay.Sat_Minutes * PPM);
            sun_t_pay = (upd_pay.Sun_Hours * PPH) + (upd_pay.Sun_Minutes * PPM);
        }
        // if(PPH){
        //     mon_t_pay = (upd_pay.Mon_Hours * PPH) + (upd_pay.Mon_Minutes * PPM);
        //     tue_t_pay = (upd_pay.Tue_Hours * PPH) + (upd_pay.Tue_Minutes * PPM);
        //     wed_t_pay = (upd_pay.Wed_Hours * PPH) + (upd_pay.Wed_Minutes * PPM);
        //     thu_t_pay = (upd_pay.Thu_Hours * PPH) + (upd_pay.Thu_Minutes * PPM);
        //     fri_t_pay = (upd_pay.Fri_Hours * PPH) + (upd_pay.Fri_Minutes * PPM);
        //     sat_t_pay = (upd_pay.Sat_Hours * PPH) + (upd_pay.Sat_Minutes * PPM);
        //     sun_t_pay = (upd_pay.Sun_Hours * PPH) + (upd_pay.Sun_Minutes * PPM);
        // }

        var weekly_pay_total = mon_t_pay + tue_t_pay + wed_t_pay + 
            thu_t_pay + fri_t_pay + sat_t_pay;

        var add;
        var adv;
        var ded;

        if(Additional === false){
            weekly_pay_total += upd_pay.Weekly_Total_Additional;
            add = upd_pay.Weekly_Total_Additional;
        }else{
            weekly_pay_total += Additional;
            add = Additional;
        }

        if(Advance === false){
            weekly_pay_total += upd_pay.Weekly_Total_Advance;
            adv = upd_pay.Weekly_Total_Advance;
        }else{
            weekly_pay_total += Advance;
            adv = Advance;
        }

        if(Deduction === false){
            weekly_pay_total -= upd_pay.Weekly_Total_Deduction;
            ded = upd_pay.Weekly_Total_Deduction;
        }else{
            weekly_pay_total -= Deduction;
            ded = Deduction;
        }
        
        try{
            await database.updateOne(payroll, {_id: Payroll_ID}, {
                $set: {
                    Weekly_Total_Pay: weekly_pay_total,
                    Weekly_Total_Additional: add,
                    Weekly_Total_Advance: adv,
                    Weekly_Total_Deduction: ded,
                    Mon_Total_Pay: mon_t_pay,
                    Tue_Total_Pay: tue_t_pay,
                    Wed_Total_Pay: wed_t_pay,
                    Thu_Total_Pay: thu_t_pay,
                    Fri_Total_Pay: fri_t_pay,
                    Sat_Total_Pay: sat_t_pay,
                    Sun_Total_Pay: sun_t_pay,
                    Weekly_Hourly_Rate: PPH,
                }
            });
            res.json({ success: true, message: "Payroll updated successfully!" });
        }catch(error){
            console.error(error);
            res.status(500).json({ success: false, message: "Error updating payroll!" });
        }
    }
}

module.exports = admin_empman_payroll_controller;