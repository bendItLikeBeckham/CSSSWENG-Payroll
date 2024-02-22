const employee = require('../models/employee_model.js');

const dummy_register_controller = {
    get_dummy_register: function(req, res){
        res.render('dummy-register');
    }, 

    post_dummy_register: async function(req, res){
        const {email, password} = req.body;

        const user_exists = await employee.findOne({Email: email});
        if(user_exists){
            return res.status(400).json({message: "Email Already Exists!"});
        }else if(!password){
            return res.status(400).json({message: "Missing Password!"});
        }else{
            try{
                const new_employee = new employee({
                    Email: email,
                    Password: password,
                });
                await new_employee.save();
    
                res.json({success: true, message: "Registration Successful!"});
            }catch(error){
                console.error(error);
                res.status(500).json({success: false, message: "Registration Controller Error!"});
            }
        }
    }
}

module.exports = dummy_register_controller;
