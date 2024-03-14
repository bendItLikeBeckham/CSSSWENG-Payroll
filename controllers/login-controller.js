const employee = require('../models/employee_model.js');
// const bcrypt = require('bcrypt'); //might implement this later

const login_controller = {
    post_login: async function(req, res){
        const {email, password} = req.body;

        try{
            const user_exists = await employee.findOne({Email: email});

            //const m_password = await bcrypt.compare(password, user_exists.Password);

            if(!user_exists){
                return res.status(404).json({message: "Incorrect Credentials!"});
            //}else if(!m_password){
            }else if(password !== user_exists.Password){
                return res.status(401).json({message: "Incorrect Credentials!"});
            }else{
                //the commented lines are to be implemented later
                req.session.Email = email;
                req.session.Employee_Type = user_exists.Employee_Type;
                //^
                if(user_exists.Employee_Type === "Employee"){
                    res.status(200).json({success: true, type: "Employee", message: "Login Successful!"});
                }
                if(user_exists.Employee_Type === "Work From Home"){
                    res.status(200).json({success: true, type: "Work From Home", message: "Login Successful!"});}
                else{
                    res.status(200).json({success: true, type: "Admin", message: "Login Successful!"});
                }
                //res.json({success: true, message: "Login Successful!"});
            }
        }catch(error){
            console.error("Error in post_login:", error);
            res.status(500).json({success: false, message: "Login Controller Error!"});
        }

    }
}

module.exports = login_controller;
