var mongoose = require('mongoose');

var payroll_schema = new mongoose.Schema({
    Email: { // or is it Username
        type: String,
        required: true
    },
    Initial_date: {
        type: Date,
        required: true
    },

    Sun_Time_In: {
        type: String,
    },
    Sun_Time_Out: { 
        type: String,
    },
    Sun_Total_Timed_Hours: { 
        type: Number,
    },
    Sun_Total_Hours: { 
        type: Number,
    },
    Sun_Total_Minutes: { 
        type: Number,
    },
    Sun_Total_Hour_Rate: { 
        type: Number,
    },
    Sun_Total_Minute_Rate: { 
        type: Number,
    },
    
    Mon_Time_In: {
        type: String,
    },
    Mon_Time_Out: { 
        type: String,
    },
    Mon_Total_Timed_Hours: { 
        type: Number,
    },
    Mon_Total_Hours: { 
        type: Number,
    },
    Mon_Total_Minutes: { 
        type: Number,
    },
    Mon_Total_Hour_Rate: { 
        type: Number,
    },
    Mon_Total_Minute_Rate: { 
        type: Number,
    },

    Tue_Time_In: {
        type: String,
    },
    Tue_Time_Out: { 
        type: String,
    },
    Tue_Total_Timed_Hours: { 
        type: Number,
    },
    Tue_Total_Hours: { 
        type: Number,
    },
    Tue_Total_Minutes: { 
        type: Number,
    },
    Tue_Total_Hour_Rate: { 
        type: Number,
    },
    Tue_Total_Minute_Rate: { 
        type: Number,
    },

    Wed_Time_In: {
        type: String,
    },
    Wed_Time_Out: { 
        type: String,
    },
    Wed_Total_Timed_Hours: { 
        type: Number,
    },
    Wed_Total_Hours: { 
        type: Number,
    },
    Wed_Total_Minutes: { 
        type: Number,
    },
    Wed_Total_Hour_Rate: { 
        type: Number,
    },
    Wed_Total_Minute_Rate: { 
        type: Number,
    },

    Thu_Time_In: {
        type: String,
    },
    Thu_Time_Out: { 
        type: String,
    },
    Thu_Total_Timed_Hours: { 
        type: Number,
    },
    Thu_Total_Hours: { 
        type: Number,
    },
    Thu_Total_Minutes: { 
        type: Number,
    },
    Thu_Total_Hour_Rate: { 
        type: Number,
    },
    Thu_Total_Minute_Rate: { 
        type: Number,
    },

    Fri_Time_In: {
        type: String,
    },
    Fri_Time_Out: { 
        type: String,
    },
    Fri_Total_Timed_Hours: { 
        type: Number,
    },
    Fri_Total_Hours: { 
        type: Number,
    },
    Fri_Total_Minutes: { 
        type: Number,
    },
    Fri_Total_Hour_Rate: { 
        type: Number,
    },
    Fri_Total_Minute_Rate: { 
        type: Number,
    },

    Sat_Time_In: {
        type: String,
    },
    Sat_Time_Out: { 
        type: String,
    },
    Sat_Total_Timed_Hours: { 
        type: Number,
    },
    Sat_Total_Hours: { 
        type: Number,
    },
    Sat_Total_Minutes: { 
        type: Number,
    },
    Sat_Total_Hour_Rate: { 
        type: Number,
    },
    Sat_Total_Minute_Rate: { 
        type: Number,
    },
    
    Total_Calculated_Rate: {
        type: Number,
    },
    Total_Pay: {
        type: Number,
    }
});

modeule.exports = mongoose.model('payroll', payroll_schema);