const User = require('../models/userModel');
const {sendWelcomeEmail} = require('../services/emailService');

// Create a new user

//todo: send otp to user email, verify otp, then create user,send welcome mail to user
exports.createUser = async (userData) => {
    if(!userData) throw new Error('No user data'); //check if user data is not null
    //check if user exists
    const {fullName, username, email,password,location } = userData;
    const usernameExists = await User.findOne({username}); 
    const isUser = await User.findOne({email});
    if(!isUser || !usernameExists){ 
        try {
            const user = new User({
                fullName,
                username,
                password,
                email,
                location

    
            });
            const newUser =  await user.save();
            //send welcome email
            await sendWelcomeEmail(email,fullName);
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