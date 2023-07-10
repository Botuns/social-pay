const User = require('../models/userModel');
const {sendWelcomeEmail} = require('../services/emailService');
const {generateToken} = require('../configs/jwtToken')

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