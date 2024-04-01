/*
Functions:
Employee model/attributes
*/

var mongoose = require('mongoose');

var employee_schema = new mongoose.Schema({
    First_Name: {
        type: String,
        required: true
    },
    Last_Name: {
        type: String,
        required: true
    },
    Contact_Number: {
        type: String,
        required: true
    },
    Email: {
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
    Employee_Type: {
        type: String,
        default: 'Employee'
    },
    IsTimedIn: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('employee', employee_schema);
