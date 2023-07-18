const Advert = require('../models/advertModel')
const User = require('../models/userModel')
const Task = require('../models/taskModel')
const validateMongoDbId = require('../utils/validateMongoDbId')
const { ObjectId } = require('mongodb');
const {sendMailOnAdvertApproval} = require('../services/emailService')

//create advert --done (might be improved or changed later)
//approve advert --done (might be improved or changed later)
//get all unapproved adverts
//get all approved adverts
// reject advert
// get user's adverts

// get approved user's adverts


//create advert

exports.CreateAdvert = async(data,userId)=>{
    const { title, advertType, description, assignedUsers,price,religion,location,linktoPromote } = data;
    const creator = new ObjectId(userId);
    // status is always pending on every iniciation
    const adstatus='pending'
    validateMongoDbId(userId)
    const isUser = await User.findById(creator)
    if(data ||isUser){
        try {
            const newAdvert = new Advert({
                title,advertType,linktoPromote,description,assignedUsers,price,religion,adstatus,location,creator,
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
            // get details to send mail
            const userId = isExistAdvert.creator
            const user= User.findById({userId})
            validateMongoDbId(userId)
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
                const amountForUser = 0  //to be calculated
                const assignedUsers = isExistAdvert.assignedUsers

                // automatically creates task
                const newTask= new Task({
                    title,linktask,location,type,amountForUser,assignedUsers,religion,description,advert
                })
                await newTask.save();
                //send mail notice
                await sendMailOnAdvertApproval(user.fullName,isExistAdvert.title,user.email,)
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
// getAllUnapprovedAdverts
exports.getAllUnapprovedAdverts = async () => {
    try {
      const unapprovedAdverts = await Advert.find({ adStatus: 'pending' });
      return {
        message: 'Successfully retrieved all unapproved adverts',
        data: unapprovedAdverts,
        status: 'success'
      };
    } catch (error) {
      throw new Error(error);
    }
  };
// getAllApprovedAdverts
  exports.getAllApprovedAdverts = async () => {
    try {
      const approvedAdverts = await Advert.find({ adStatus: 'approved' });
      return {
        message: 'Successfully retrieved all approved adverts',
        data: approvedAdverts,
        status: 'success'
      };
    } catch (error) {
      throw new Error(error);
    }
  };

//   reject advert

exports.rejectAdvert = async (advertId) => {
    if (advertId) {
      try {
        const rejectedAdvert = await Advert.findByIdAndUpdate(advertId, { adStatus: 'rejected' }, { new: true });
        if (rejectedAdvert) {
          return {
            message: 'Advert rejected successfully',
            data: rejectedAdvert,
            status: 'success'
          };
        } else {
          throw new Error('Advert not found. Please provide a valid advert ID.');
        }
      } catch (error) {
        throw new Error(error);
      }
    }
    throw new Error('No advert ID was found in the request.');
  };

//   getUserAdverts
  exports.getUserAdverts = async (userId) => {
    validateMongoDbId(userId);
    try {
      const userAdverts = await Advert.find({ creator: userId });
      return {
        message: 'Successfully retrieved user\'s adverts',
        data: userAdverts,
        status: 'success'
      };
    } catch (error) {
      throw new Error(error);
    }
  };

// getApprovedUserAdverts
  exports.getApprovedUserAdverts = async (userId) => {
    validateMongoDbId(userId);
    try {
      const approvedUserAdverts = await Advert.find({ creator: userId, adStatus: 'approved' });
      return {
        message: 'Successfully retrieved approved user\'s adverts',
        data: approvedUserAdverts,
        status: 'success'
      };
    } catch (error) {
      throw new Error(error);
    }
  };
  
  
  
  