/*
Functions:
OTP model/attributes
*/

var mongoose = require('mongoose');

var Current_otp = new mongoose.Schema({
    current_otp: { 
        type: Number,    
    }
});

module.exports = mongoose.model('otp', Current_otp);
