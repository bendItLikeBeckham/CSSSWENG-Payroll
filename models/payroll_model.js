//old payroll_model.js
var mongoose = require('mongoose');

/*
the total per day for now i can just use calculations
*/

var payroll_schema = new mongoose.Schema({
    Email: { // or is it Username or /id
        type: String,
        required: true
    },
    Initial_date: {
        type: Date,
        required: true
    },
    
    Mon_Time_In: {
        type: String
    },
    Mon_Time_Out: {
        type: String
    },
    Mon_Hours: {
        type: Number,
    },
    Mon_Minutes: { 
        type: Number,
    },
    Mon_Total_Pay: { 
        type: Number,
    },
    
    Tue_Time_In: { 
        type: String
    },
    Tue_Time_Out: { 
        type: String
    },
    Tue_Hours: {
        type: Number,
    },
    Tue_Minutes: { 
        type: Number,
    },
    Tue_Total_Pay: { 
        type: Number,
    },
    
    Wed_Time_In: {
        type: String 
    },
    Wed_Time_Out: { 
        type: String 
    },
    Wed_Hours: {
        type: Number,
    },
    Wed_Minutes: { 
        type: Number,
    },
    Wed_Total_Pay: { 
        type: Number,
    },
    
    Thu_Time_In: { 
        type: String 
    },
    Thu_Time_Out: { 
        type: String
    },
    Thu_Hours: {
        type: Number,
    },
    Thu_Minutes: { 
        type: Number,
    },
    Thu_Total_Pay: { 
        type: Number,
    },
    
    Fri_Time_In: { 
        type: String 
    },
    Fri_Time_Out: { 
        type: String 
    },
    Fri_Hours: {
        type: Number,
    },
    Fri_Minutes: { 
        type: Number,
    },
    Fri_Total_Pay: { 
        type: Number,
    },

    Sat_Time_In: { 
        type: String 
    },
    Sat_Time_Out: { 
        type: String 
    },
    Sat_Hours: {
        type: Number,
    },
    Sat_Minutes: { 
        type: Number,
    },
    Sat_Total_Pay: { 
        type: Number,
    },

    Weekly_Total_Bale: {
        type: Number,
    },
    Weekly_Total_Bonus: {
        type: Number,
    },
    Weekly_Total_Deductions: {
        type: Number,
    },
    Weekly_Total_Pay: {
        type: Number
    }

});

module.exports = mongoose.model('payroll', payroll_schema);