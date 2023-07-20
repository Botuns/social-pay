const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');
const { generateReferenceNumber } = require('../utils/transactionRefGenerator');
const { getDate } = require('../utils/date');
const axios = require('axios');
const {sendAirtimePurchaseConfirmation} = require('../services/emailService')

const AIRTIME_API_URL = 'https://sandbox.giftbills.com/api/v1/airtime/topup';
const API_KEY = 'EGGL1EUBOQXMVQKFZDUGUUAKNVIWUGL';
const MERCHANT_ID = 'bot';

exports.buyAirtimeFromAcctWallet = async (airtimePayload, userId) => {
  const { provider,number,amount } = airtimePayload;
  console.log(airtimePayload)
  const ref = generateReferenceNumber()
  const reference = ref
  try {
    const user = await User.findById(userId);
    if (user) {
      console.log(user)
      const balance = user.acctWallet;
      console.log(balance)

      if (balance >= amount && balance > 100) {
        const requestBody = {
          provider: provider,
          number: number,
          amount: amount.toString(),
          reference,
        };
        try {
          const response = await axios.post(AIRTIME_API_URL, requestBody, {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              MerchantId: MERCHANT_ID,
              'Content-Type': 'application/json',
            },
          });

          if (response.data) {

            const responseData = response.data;

            if (responseData.success === true) {

              user.acctWallet -= amount;
              await user.save();

              const userRef = user._id;
              const status = 'verified'
              const purpose = 'airtime'
              const refNo = ref;
              const type = 'wallet'
              const description = responseData.message
              const createdAt = getDate()

              const newTransaction = new Transaction({
                userRef,
                status,
                purpose,
                amount,
                refNo,
                type,
                description,
                createdAt,
              });


              await newTransaction.save();
              const transactionDetails={
                transactionId: newTransaction?._id,
                amount:newTransaction.amount,
                phoneNumber: number,
                provider:provider,
                referenceNumber:refNo,
              }
              await sendAirtimePurchaseConfirmation(user.email,transactionDetails)


              return {
                message: 'Airtime purchase was successful',
                data: {
                  newTransaction,
                  new_balance: user.acctWallet,
                },
                status: 'success',
              };
            } else {
              throw new Error('Oops, purchase was unsuccessful');
            }
          } else {
            throw new Error('Unable to communicate with the service');
          }
        } catch (error) {
          throw new Error(`funny error${error}`);
        }
      } else {
        throw new Error('Insufficient funds in the wallet');
      }
    } else {
      throw new Error('User with the provided ID was not found');
    }
  } catch (error) {
    throw new Error(`funny error 2:${error}`);
  }
};
