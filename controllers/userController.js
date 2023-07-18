const userService = require('../services/userService');

const createUser = async (req, res) => {
    const userData = req.body;
    try {
        const result = await userService.createUser(userData);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
        
}

const loginUser= async (req,res) =>{
    const userData= req.body;
    try{
        const result = await userService.loginUser(userData);
        res.status(203).json(result);
    } catch (error){
        res.status(400).json({message:error.message})

    }
}

// verify user

const verifyUser= async (req,res) =>{
    const {email,otp}= req.body;
    try{
        const result = await userService.verifyUser(email,otp);
        res.status(203).json(result);
    } catch (error){
        res.status(400).json({message:error.message})

    }
}
module.exports = {createUser,loginUser,verifyUser}
