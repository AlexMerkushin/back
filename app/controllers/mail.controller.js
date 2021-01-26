const mailConfig = require("../config/mail.config.js"); //config mail
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

exports.sendMail = async (to, subject, text) =>{
  var transporter = nodemailer.createTransport(smtpTransport(mailConfig))
    var mailOptions = {
        from: 'mahat.project@gmail.com',
        to: to,
        subject: subject,
        html: `<p>${text}</p>`
      };

      await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
}