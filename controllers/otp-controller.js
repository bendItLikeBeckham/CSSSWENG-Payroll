const Current_otp = require('../models/otp_model.js');

const otp_controller = {
  post_generate_otp: async (req, res) => {
        try{
          const randomNumber = Math.floor(Math.random() * 9000 + 1000);
      
          await Current_otp.findOneAndDelete().sort({ _id: 1 });
  
          const number = new Current_otp({ current_otp: randomNumber });
          await number.save();
  
          res.status(201).json({ message: 'otp generated and stored successfully' });
        }catch(err){
          res.status(500).send("Internal Server Error!");
        }
      },
    
      post_verify_otp: async (req, res) => {
        try{
          const storedNumber = await Current_otp.findOne().sort({ _id: -1 }); 
     
          if (!storedNumber) {
            res.status(404).json({ message: 'No otp generated yet' });
          } else {
            const correctNumber = storedNumber.current_otp;
          
            res.json({correctNumber});
          }
        }catch(err){
          res.status(500).send("Internal Server Error!");
        }
      },

      get_current_otp: async (req, res)=>{
        try{
            const curr_otp = await Current_otp.findOne().sort({ _id: -1 });
            
            console.log("Current OTP: " + curr_otp);
            
            if (!curr_otp) {
              res.status(404).json({ message: 'No otp generated yet' });
            } else {
              const correctNumber = curr_otp.current_otp;
            
              res.render("otp-page", {correctNumber});
            }
        
           
        }catch(error){
            console.error("Error displaying current OTP ", error);
            res.status(500).send("Internal Server Error!");
        }
      },

      // get_otp_page: (req, res)=>{
      //   res.render("otp-page");
      // }
}

module.exports = otp_controller;
