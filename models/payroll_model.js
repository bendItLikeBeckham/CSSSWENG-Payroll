/*
Functions:
Payroll model/attributes
*/

var mongoose = require('mongoose');

var payroll_schema = new mongoose.Schema({
    Email: {
        type: String,
        required: true
    },
    Week: {
        type: Number,
        required: true
    },
    Time_In_Weekday_Index: {
        type: Number
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
        type: String,
    },
    Mon_Total_Pay: { 
        type: Number,
    },
    Mon_Date: {
        type: String,
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
        type: String,
    },
    Tue_Total_Pay: { 
        type: Number,
    },
    Tue_Date: {
        type: String,
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
        type: String,
    },
    Wed_Total_Pay: { 
        type: Number,
    },
    Wed_Date: {
        type: String,
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
        type: String,
    },
    Thu_Total_Pay: { 
        type: Number,
    },
    Thu_Date: {
        type: String,
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
        type: String,
    },
    Fri_Total_Pay: { 
        type: Number,
    },
    Fri_Date: {
        type: String,
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
        type: String,
    },
    Sat_Total_Pay: { 
        type: Number,
    },
    Sat_Date: {
        type: String,
    },

    Sun_Time_In: { 
        type: String 
    },
    Sun_Time_Out: { 
        type: String 
    },
    Sun_Hours: {
        type: Number,
    },
    Sun_Minutes: { 
        type: String,
    },
    Sun_Total_Pay: { 
        type: Number,
    },
    Sun_Date: {
        type: String,
    },

    Weekly_Total_Advance: {
        type: Number,
    },
    Weekly_Total_Additional: {
        type: Number,
    },
    Weekly_Total_Deduction: {
        type: Number,
    },
    Weekly_Total_Pay: {
        type: Number
    },
    Weekly_Hourly_Rate: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('payroll', payroll_schema);