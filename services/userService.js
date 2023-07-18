const User = require('../models/userModel');
const {sendWelcomeEmail,sendMailOnOtp} = require('../services/emailService');
const {generateToken} = require('../configs/jwtToken')
const{generateOTP} = require('../utils/otp')

// Create a new user

//todo: send otp to user email, verify otp, then create user,send welcome mail to user
exports.createUser = async (userData) => {
    if(!userData) throw new Error('No user data'); //check if user data is not null
    //check if user exists
    const {fullName, username, email,password,location,religion } = userData;
    const usernameExists = await User.findOne({username}); 
    const isUser = await User.findOne({email});
    const otp= generateOTP()
    if(!isUser || !usernameExists){ 
        try {
            const user = new User({
                fullName,
                username,
                password,
                otp,
                religion,
                email,
                location

    
            });
            const newUser =  await user.save();
            //send otp email
            await sendMailOnOtp(email,otp);
            return {
                message: 'User created successfully',
                data: newUser,
                status: "success",
            }
        } catch (error) {
            throw new Error(error);
        }
    }
    else{
        throw new Error('User already exists');
    }

    
}

// verify

exports.verifyUser = async (email, otp) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
  
      if (user.otp === otp) {
        // OTP matches, create the user and send welcome email
        user.isVerified = true;
        await user.save();
        const fullName =user.fullName
  
        await sendWelcomeEmail(email, fullName);
  
        return {
          message: 'User verified and created successfully',
          data: user,
          token: generateToken(user._id),
          status: 'success',
        };
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      throw new Error(error.message || 'An error occurred while verifying the user');
    }
  };
  

// login service
exports.loginUser = async(userData)=>{
    if(!userData) throw new Error('No user data'); //check if user data is not null
    const {email,password } = userData;
    try {
        const isUser = await User.findOne({email});
        console.log(isUser)
        if(isUser && await isUser.isPasswordMatched({password})){
            return {
                message: 'User loggedin successfully',
                data: isUser,
                token:generateToken(isUser?._id),
                status: "success",
            }
                
        }
        else{
            throw new Error('Invalid credentials')
        }
    } catch (error) {
        throw new Error('An error occured please try logging in again')
    }

}