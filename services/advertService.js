const Advert = require('../models/advertModel')
const User = require('../models/userModel')
const Task = require('../models/taskModel')
const validateMongoDbId = require('../utils/validateMongoDbId')
const { ObjectId } = require('mongodb');

//create advert
//approve advert
//get all unapproved adverts
//get all approved adverts

//create advert

exports.CreateAdvert = async(data,userId)=>{
    const { title, advertType, description, price,location,linktoPromote } = data;
    const creator = new ObjectId(userId);
    // status is always pending on every iniciation
    const adstatus='pending'
    validateMongoDbId(userId)
    const isUser = await User.findById(creator)
    if(data ||isUser){
        try {
            const newAdvert = await new Advert({
                title,advertType,linktoPromote,description,price,adstatus,location,creator,
            })
            await newAdvert.save()

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

//approve advert

exports.approveAdvert = async(advertId) =>{

    const id = advertId
    if(advertId){
        try {
            const isExistAdvert = await Advert.findById(id)
            if(isExistAdvert){
                isExistAdvert.adStatus='approved';
                isExistAdvert.isApproved= true;
                const updatedAdvert= await isExistAdvert.save();
                const title = isExistAdvert.title
                const description = isExistAdvert.description
                const advert= isExistAdvert._id
                const linktask= isExistAdvert.linktoPromote
                const religion= isExistAdvert.religion
                const type = isExistAdvert.advertType
                const location = isExistAdvert.location

                // automatically creates task
                const newTask= await new Task({
                    title,linktask,location,type,religion,description,advert
                })
                await newTask.save();
                return({
                    message: 'Advert approved and created as task for other users',
                    updatedAdvertData:updatedAdvert,
                    data:newTask,
                    status:'sucess'
                })
                    
            }
            else{
                throw new Error('Opps, advert was not found, please try again with correct advert')
            }

        } catch (error) {
            throw new Error(error)
        }
    }
    throw new Error("No id was found in the request")

}