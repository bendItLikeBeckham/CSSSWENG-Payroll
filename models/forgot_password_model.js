/*
Functions:
Forgot_Password model/attributes
*/

var mongoose = require('mongoose');

var forgot_password_schema = new mongoose.Schema({
    Forgot_Password_Number:{ //index or queue numbers
        type: Number,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Time:{
        type: String,
        required: true
    },
    Name:{
        type: String, 
        required: true
    }
})

module.exports = mongoose.model('forgot_password', forgot_password_schema);