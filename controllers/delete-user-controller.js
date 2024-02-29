const employee = require('../models/employee_model.js');
const payroll = require('../models/payroll_model.js');

const delete_user_controller = {
    get_delete_user: function(req, res){
        res.render('delete-user');
    },

    post_delete_user: async function (req, res){
        const {email} = req.body;
        const user_exists = await employee.findOne({Email: email});
        if(user_exists){
            try {
                const user_payroll = await payroll.findOne({Email:email});
                await employee.deleteOne(user_exists);
                await payroll.deleteOne(user_payroll);
                res.json({success: true, message: "Deletion successful!"})
            } catch (error) {
                console.error('Error updating data in MongoDB:', error);      
        }
         res.status(500).render('error', { message: 'Internal Server Error' });
        }
        else{
            return res.status(400).json({message: "There are no Existing Users!"});
        }
    }
}

module.exports = delete_user_controller;
