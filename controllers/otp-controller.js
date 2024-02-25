const Current_otp = require('../models/otp_model.js');

const otp_controller = {
    post_generate_otp: async (req, res) => {
        const randomNumber = Math.floor(Math.random() * 9000 + 1000);
      
        await Current_otp.findOneAndDelete().sort({ _id: 1 });

        const number = new Current_otp({ current_otp: randomNumber });
        await number.save();

        res.status(201).json({ message: 'otp generated and stored successfully' });
      },
    
      post_verify_otp: async (req, res) => {
        const guessedNumber = req.body.otp_value;
      
        const storedNumber = await Current_otp.findOne().sort({ _id: -1 }); 
     
        if (!storedNumber) {
          res.status(404).json({ message: 'No otp generated yet' });
        } else {
          const correctNumber = storedNumber.current_otp;
        
          res.json({correctNumber});
        }
      }
}

module.exports = otp_controller;