const express = require('express')
const mongoose = require('mongoose')
const app = express();
const bcrypt = require("bcrypt");
//const session = require("express-session");

mongoose.connect("mongodb://localhost:27017/test").then(() => console.log('Connected Successfully'))
.catch((err) => { console.error(err); });

const dayDetails = new mongoose.Schema ({
    timeIn: Date,
    timeOut: Date,
    hoursWorked: Number,
    minutesWorked: Number,
    totalMinutesWorked: Number,
    hourlySalary: Number,
    minuteSalary: Number,
    totalDayPay: Number
})

const weekDetails = new mongoose.Schema ({
    mondayDetails: dayDetails,
    tuesdayDetails: dayDetails,
    wednesdayDetails: dayDetails,
    thursdayDetails: dayDetails,
    fridayDetails: dayDetails,
    saturdayDetails: dayDetails,
    sundayDetails: dayDetails,
    totalWeekPay: Number
})

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    currentWeekDetails: weekDetails,
    lastWeekDetails: weekDetails,
    last2WeekDetails: weekDetails,
})

const currentOTP = new mongoose.Schema({
    currentOtp: Number
})

const users = mongoose.model("Users", userSchema)
const weeks = mongoose.model("Weeks", weekDetails)
const days = mongoose.model("Days", dayDetails)
const otp = mongoose.model("OTP", currentOTP)

days.create({ 
    timeIn: "2015-03-25", 
    timeIn: "2015-04-25", 
    timeOut: 10,
    hoursWorked: 1,
    minutesWorked: 30,
    hourlySalary: 100,
  }).then((ans) => { 
    console.log("Document inserted") 
  }).catch((err) => { 
    console.log(err.Message); 
  })

app.listen(3000, () =>{
    console.log("Connected at 3000")
})