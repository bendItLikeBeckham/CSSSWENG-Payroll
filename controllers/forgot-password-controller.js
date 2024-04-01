/*
Functions:
-Update the forgot_password of employees that sent a notification
-Delete of forgot password notifcations that were addressed
*/

const forgot_password = require('../models/forgot_password_model.js'); 
const employee = require('../models/employee_model.js'); 
const database = require('../models/database.js');

const forgot_password_controller = {
    post_add_forgot_password: async function (req, res){
        const {email, cTime} = req.body;
        const user_exists = await employee.findOne({Email: email});
        if(user_exists){
            const forgot_password_exists = await database.findOne(forgot_password, {Email: email});
            if(!forgot_password_exists){
                const count = await forgot_password.countDocuments();
                try{
                    const new_forgot_password = new forgot_password({
                        Forgot_Password_Number: count+1,
                        Email: email,
                        Time: cTime,
                        Name: user_exists.First_Name + " " + user_exists.Last_Name
                    });
                    await new_forgot_password.save();
                    res.status(200).json({success: true, message: "Forgot Password Successful!"});
                }catch(error){
                    console.error("Error in post_add_forgot_password:", error);
                    res.status(500).json({success: false, message: "Forgot Password Controller Error!"});
                }
            }else{
                return res.json({success: false, message: "Forgot Password Already Exist."}); 
            }
        }else{
            return res.json({success: false, message: "Email Does Not Exist."});
        }
    },

    post_delete_forgot_password: async function (req, res){        
        const email = req.body.email;
        const user_exists = await forgot_password.findOne({Email: email});
        
        if(user_exists){
            const curr_forgot_password_number = user_exists.Forgot_Password_Number;
            try{
                await forgot_password.deleteOne({Email: email});

                await forgot_password.updateMany({Forgot_Password_Number: {$gt: curr_forgot_password_number}}, {$inc: {Forgot_Password_Number: -1}});
                res.status(200).json({success: true, messasge: "Forgot Password Record Deleted Successfully."});
            }catch(error){
                res.status(500).send("Internal Server Error!");
            }
        }else{
            return res.status(404).json({success: false, message: "Forgot Password Record Not Found."});
        }
    }
}

module.exports = forgot_password_controller;