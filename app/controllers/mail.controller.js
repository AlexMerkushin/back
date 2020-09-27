const mailConfig = require("../config/mail.config.js"); //config mail
var nodemailer = require('nodemailer');

exports.sendMail = async (to, subject, text) =>{
    var transporter = nodemailer.createTransport(mailConfig);
    var mailOptions = {
        from: 'mahat.project@gmail.com',
        to: to,
        subject: subject,
        text: text
      };

      await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
}