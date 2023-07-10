const Advert = require('../models/advertModel')
const User = require('../models/userModel')
const validateMongoDbId = require('../utils/validateMongoDbId')
const { ObjectId } = require('mongodb');

//create advert
//approve advert
//get all unapproved adverts
//get all approved adverts

//create advert

exports.CreateAdvert = async(data,userId)=>{
    const { title, advertType, description, price,location } = data;
    const creator = new ObjectId(userId);
    validateMongoDbId(userId)
    const isUser = await User.findById(creator)
    if(data ||isUser){
        try {
            const newAdvert = await new Advert({
                title,advertType,description,price,location,creator
            })

            return{
                message:"sucessfully created an advert",
                timeOfCreation:Date.now(),
                data:newAdvert,
                status:"sucess"
            }
            
            
        } catch (error) {
            throw new Error(error)
            
        }
    }
    else{
        throw new Error('User does not exists')
    }

}