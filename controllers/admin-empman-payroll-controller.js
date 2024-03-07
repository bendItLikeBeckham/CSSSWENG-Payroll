const employee = require('../models/employee_model.js');
const payroll = require('../models/payroll_model.js');
const database = require('../models/database.js');

const admin_empman_payroll_controller = {
    get_admin_empman_payroll: function(req, res){
        res.render("admin-empman-payroll");
    },

    get_emp_total: async function(req, res){
        console.log("get_emp_total_wp part here"); //remove later
        const emp_type = "Employee";
        try{
            const emp_total = await database.findMany(employee, {Employee_Type: emp_type});

            console.log("emp_total data: " + emp_total);

            res.render("admin-empman-payroll", {emp_total});
        }catch(error){
            console.error("Error processing employee total: ", error);
            res.status(500).send("Internal Server Error!");
        }
    }, 

    get_emp_wpay: async function(req, res){
        console.log("get_emp_wpay part here"); //remove later
        const selected_employee = req.query.employee;
        console.log("employee email: "+selected_employee); //remove later
        const emp_type = "Employee";
        try{
            const emp_wpay = await database.findOne(payroll, {Email: selected_employee, Week: 0});//default is week 0
            const emp_total = await database.findMany(employee, {Employee_Type: emp_type});


            console.log("emp_pay data: " + emp_wpay); //remove later

            res.render("admin-empman-payroll", {emp_wpay, emp_total});
        }catch(error){
            console.error("Error processing weekly payroll: ", error);
            res.status(500).send("Internal Server Error!");
        }
    },

    post_update_payroll: async function(req, res){
        console.log("post_update_payroll"); //remove later

        const {PPH, PPM, Additional, Advance, Deduction, Payroll_ID} = req.body;

        const upd_pay = await database.findOne(payroll, {_id: Payroll_ID});

        //sun hours and minutes to add??
        console.log("PPH: " + PPH);
        console.log("PPM: " + PPM);
        console.log("Additional: " + Additional);
        console.log("Advance: " + Advance);
        console.log("Deduction: " + Deduction);

        var mon_t_pay = 0;
        var tue_t_pay = 0;
        var wed_t_pay = 0;
        var thu_t_pay = 0;
        var fri_t_pay = 0;
        var sat_t_pay = 0;


        if(PPH === "" && PPM !== ""){//10
            mon_t_pay = (upd_pay.Mon_Hours * 10) + (upd_pay.Mon_Minutes * PPM);
            tue_t_pay = (upd_pay.Tue_Hours * 10) + (upd_pay.Tue_Minutes * PPM);
            wed_t_pay = (upd_pay.Wed_Hours * 10) + (upd_pay.Wed_Minutes * PPM);
            thu_t_pay = (upd_pay.Thu_Hours * 10) + (upd_pay.Thu_Minutes * PPM);
            fri_t_pay = (upd_pay.Fri_Hours * 10) + (upd_pay.Fri_Minutes * PPM);
            sat_t_pay = (upd_pay.Sat_Hours * 10) + (upd_pay.Sat_Minutes * PPM);
        }else if(PPH !== "" && PPM === ""){//0.17
            mon_t_pay = (upd_pay.Mon_Hours * PPH) + (upd_pay.Mon_Minutes * 0.17);
            tue_t_pay = (upd_pay.Tue_Hours * PPH) + (upd_pay.Tue_Minutes * 0.17);
            wed_t_pay = (upd_pay.Wed_Hours * PPH) + (upd_pay.Wed_Minutes * 0.17);
            thu_t_pay = (upd_pay.Thu_Hours * PPH) + (upd_pay.Thu_Minutes * 0.17);
            fri_t_pay = (upd_pay.Fri_Hours * PPH) + (upd_pay.Fri_Minutes * 0.17);
            sat_t_pay = (upd_pay.Sat_Hours * PPH) + (upd_pay.Sat_Minutes * 0.17);
        }else{
            mon_t_pay = (upd_pay.Mon_Hours * PPH) + (upd_pay.Mon_Minutes * PPM);
            tue_t_pay = (upd_pay.Tue_Hours * PPH) + (upd_pay.Tue_Minutes * PPM);
            wed_t_pay = (upd_pay.Wed_Hours * PPH) + (upd_pay.Wed_Minutes * PPM);
            thu_t_pay = (upd_pay.Thu_Hours * PPH) + (upd_pay.Thu_Minutes * PPM);
            fri_t_pay = (upd_pay.Fri_Hours * PPH) + (upd_pay.Fri_Minutes * PPM);
            sat_t_pay = (upd_pay.Sat_Hours * PPH) + (upd_pay.Sat_Minutes * PPM);
        }

        var weekly_pay_total = mon_t_pay + tue_t_pay + wed_t_pay + 
            thu_t_pay + fri_t_pay + sat_t_pay;

        if(Additional === ""){
            weekly_pay_total += upd_pay.Weekly_Total_Additional;
        }else{
            weekly_pay_total += Additional;
        }

        if(Advance === ""){
            weekly_pay_total += upd_pay.Weekly_Total_Advance;
        }else{
            weekly_pay_total += Advance;
        }

        if(Deduction === ""){
            weekly_pay_total -= upd_pay.Weekly_Total_Deduction;
        }else{
            weekly_pay_total -= Deduction;
        }
        
        
        try{
            await database.updateOne(payroll, {_id: Payroll_ID}, {
                $set: {
                    Weekly_Total_Pay: weekly_pay_total,
                    Weekly_Total_Additional: Additional,
                    Weekly_Total_Advance: Advance,
                    Weekly_Total_Deduction: Deduction,
                    Mon_Total_Pay: mon_t_pay,
                    Tue_Total_Pay: tue_t_pay,
                    Wed_Total_Pay: wed_t_pay,
                    Thu_Total_Pay: thu_t_pay,
                    Fri_Total_Pay: fri_t_pay,
                    Sat_Total_Pay: sat_t_pay
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