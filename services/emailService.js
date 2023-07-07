const nodemailer = require("nodemailer");
const fs = require('fs');

//create a transporter



//sendWelcomeEmail
exports.sendWelcomeEmail = async (email,fullname) => {
    try {
        // Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: 'socialpayofficial@gmail.com',
              pass: 'otsgoejvqrbvgpsb'
            },
            tls: {
              // do not fail on invalid certs
              rejectUnauthorized: false,
            },
          });
        // Read the HTML template file
        const template = fs.readFileSync('C:\\Users\\TOSHIBA\\Desktop\\social_pay\\utils\\mails_templates\\signup_mail_template.html', 'utf-8');
    
        // Replace the placeholder with the user's full name in the template
        const html = template.replace('{{fullname}}', fullname);
        console.log('about to send email')
    
        // Send the welcome email

        await transporter.sendMail({
          from: 'socialpayofficial@gmail.com',
          to: email,
          subject: 'Welcome to Social Pay',
          html: html,
        });
    
        console.log('Welcome email sent successfully');
      } catch (error) {
        throw new Error(`Error sending welcome email: ${error}`);
      }
  
};

