const nodemailer = require("nodemailer");
const fs = require('fs');

//create a transporter
//  Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST ,
            port: 465,
            secure: true,
            auth: {
              user:process.env.MAIL_USER ,
              pass: process.env.MAIL_PASSWORD
            },
            tls: {
              // do not fail on invalid certs
              rejectUnauthorized: false,
            },
          });

// send mail on advert approval
// send mail on advert rejection

//sendWelcomeEmail
exports.sendWelcomeEmail = async (email,fullname) => {
    try {
        
        // Read the HTML template file
        const template = fs.readFileSync('C:\\Users\\TOSHIBA\\Desktop\\social_pay\\utils\\mails_templates\\signup_mail_template.html', 'utf-8');
    
        // Replace the placeholder with the user's full name in the template
        const html = template.replace('{{fullname}}', fullname);    
        // Send the welcome email

        await transporter.sendMail({
          from: process.env.MAIL_USER,
          to: email,
          subject: 'You are now a step closer to earning',
          html: html,
        });
          return("Welcome mail sent sucessfully")

      } catch (error) {
        throw new Error(`Error sending welcome email: ${error}`);
      }
  
};


// send mail on approval of task

exports.sendMailOnAdvertApproval = async(fullname,advertTitle,email)=>{

  try {
        
    // Read the HTML template file
    const template = fs.readFileSync('C:\\Users\\TOSHIBA\\Desktop\\social_pay\\utils\\mails_templates\\approvedAdvert_template.html', 'utf-8');

    // Replace the placeholder with the user's full name in the template
    const html = template.replace('{{fullname}}','{{advertTitle}}', fullname,advertTitle);    
    // Send the welcome email

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Voila! your advert is  Approved',
      html: html,
    });
      return("Approval mail sent sucessfully")

  } catch (error) {
    throw new Error(`Error sending approval email: ${error}`);
  }

}

// send mail (otp) -email verification

exports.sendMailOnOtp = async(email,otp)=>{

  try {
        
    // Read the HTML template file
    const template = fs.readFileSync('C:\\Users\\TOSHIBA\\Desktop\\social_pay\\utils\\mails_templates\\otp_template.html', 'utf-8');

    // Replace the placeholder with the user's full name in the template
    const html = template.replace('{{otp}}', otp);    
    // Send the welcome email

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Ileoja Pay - OTP Verification',
      html: html,
    });
      return("Approval mail sent sucessfully")

  } catch (error) {
    throw new Error(`Error sending otp email: ${error}`);
  }

}

// Function to send airtime purchase confirmation email
exports.sendAirtimePurchaseConfirmation = async (email, transactionDetails) => {
  try {
    // Read the HTML template file
    const template = fs.readFileSync('C:\\Users\\TOSHIBA\\Desktop\\social_pay\\utils\\mails_templates\\airtime_purchase.html', 'utf-8');

    // Replace the placeholders in the template with transaction details
    let html = template.replace('[TRANSACTION_ID]', transactionDetails.transactionId);
    html = html.replace('[AMOUNT]', transactionDetails.amount);
    html = html.replace('[PHONE_NUMBER]', transactionDetails.phoneNumber);
    html = html.replace('[PROVIDER]', transactionDetails.provider);
    html = html.replace('[REFERENCE_NUMBER]', transactionDetails.referenceNumber);
    // html = html.replace('[DESCRIPTION]', transactionDetails.description);

    // Send the email
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Ileoja Pay - Airtime Purchase Confirmation',
      html: html,
    });

    return "Airtime purchase confirmation email sent successfully.";
  } catch (error) {
    throw new Error(`Error sending airtime purchase confirmation email: ${error}`);
  }
};
