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
module.exports = {createUser}