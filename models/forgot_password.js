var mongoose = require('mongoose');

var forgot_password_schema = new mongoose.Schema({
    Forgot_Password_Number:{
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
    }
})

module.exports = mongoose.model('forgot_password', forgot_password_schema);