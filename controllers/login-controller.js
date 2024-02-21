const employee = require('../models/employee_model.js');
// const bcrypt = require('bcrypt'); //might implement this later

const login_controller = {
    post_login: async function(req, res){
        const {email, password} = req.body;

        try{
            const user_exists = await employee.findOne({Email: email});

            //const m_password = await bcrypt.compare(password, user_exists.Password);

            if(!user_exists){
                return res.status(404).json({message: "Username Not Found!"});
            //}else if(!m_password){
            }else if(password !== user_exists.Password){
                return res.status(401).json({message: "Incorrect Password!"});
            }else{
                //the commented lines are to be implemented later
                req.session.Email = email;
                req.session.Employee_type = user_exists.Employee_type;
                //^
                
                res.json({success: true, message: "Login Successful!"});
            }
        }catch(error){
            console.error("Error in post_login:", error);
            res.status(500).json({success: false, message: "Login Controller Error!"});
        }

    }
}

module.exports = login_controller;
