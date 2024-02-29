var mongoose = require('mongoose');

var employee_schema = new mongoose.Schema({
    Email: { // or is it Username
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Address:{
        type: String,
        required: true
    },
    Employee_type: {
        type: String,
        default: 'Employee'
    } 
});

module.exports = mongoose.model('employee', employee_schema);
