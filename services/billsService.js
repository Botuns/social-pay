//flutterwave
// fincra
const User = require('../models/userModel');
const Transaction = require('../models/advertModel')
const {generateReferenceNumber}= require('../utils/transactionRefGenerator')
const {getDate}= require('../utils/date')
const axios = require('axios')

const AIRTIME_URL = 'https://billing-staging.bytestacks.io/api/v1/vend_data'

//purchase airtime from wallet
// buy other utilities
// withdraw





//buy airtime from wallet after some validations have been made from thee front-end

exports.buyAirtimeFromUserWallet = async(airtimePayload,userId)=>{
    // gets the details needed
    const {amount,phone_no,telco,data_code} = airtimePayload
    try {
        const user = await User.findById(userId);
        if(user){
            const balance = user.acctWallet
            // check if amount is enough
            if(balance>amount &&balance > 100){
                try {
                    const options = {
                        method: 'POST',
                        url: AIRTIME_URL,
                        headers: {
                          accept: 'application/json',
                          'content-type': 'application/json',
                          'api-key': process.env.FINCRA_KEY
                        },
                        data: JSON.stringify(amount, phone_no, telco, data_code)
                      };
                    const response = await axios(options);
                    // checks if succeed
                    if(response){
                        if(response.data.success===true){
                            user.acctWallet -=amount
                            await user.save() //updates the balance
                            const userRef = user._id
                            const purpose = 'airtime'
                            const amount = amount
                            const refNo = generateReferenceNumber()
                            const type = 'wallet'
                            const description = response.data.message
                            const createdAt = getDate()

                            const newTransaction = new Transaction({
                                userRef,
                                purpose,
                                amount,
                                refNo,
                                type,
                                description,
                                createdAt

                            })
                            await newTransaction.save()

                            return({
                                message: 'airtime purchase was sucessfull',
                                data:{
                                    newTransaction,
                                    new_balance:user.wallet
                                },
                                status:'success'
                            })
                        
            
                        } 
                        else{
                            throw new Error('Oops purchase was unsucessful')
                        }
                    }
                    else{
                        throw new Error('Unable to communicate service')
                    }
                } catch (error) {
                    throw new Error(error);
                }

            }
            else{
                throw new Error('insuffient funds in wallet')
            }
            
        }
        else{
            throw new Error('User with the id was not found')
        }

        
        
    } catch (error) {
        
    }

}