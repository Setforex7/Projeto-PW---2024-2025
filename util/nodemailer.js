const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "setforexpt123@gmail.com",
    pass: "qopaqlcindsxgcak",
  },
});

const sendMail = async (to, subject, text, html) => {   
    try {       
        const info = await transporter.sendMail({ from: 'no-reply-email@gmail.com',        
                                                  to: to,        
                                                  subject: subject,           
                                                  text: text,        
                                                  html: html});       
        console.log('E-mail enviado: %s', info.messageId);    
    } catch (error) {        
        console.error('Erro ao enviar e-mail: %s', error);   
    }};
 

module.exports = { sendMail };


