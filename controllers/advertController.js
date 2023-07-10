const advertService = require('../services/advertService');

const createAdvert = async (req, res) => {
    const userData = req.body;
    const userId = req?.user?.id;
    try {
        const result = await advertService.CreateAdvert(userData,userId);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
        
}
module.exports = {createAdvert}