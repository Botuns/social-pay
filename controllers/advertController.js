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

const ApproveAdvert = async(req,res)=> {
    const {id} = req.params;
    console.log(`This is the id to be approved ${id}`)
    try {
        const result= await advertService.approveAdvert(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message:`This is the error:${error.message}`})
    }
}
module.exports = {createAdvert,ApproveAdvert}