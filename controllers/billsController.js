const billsService = require('../services/billsService');

const buyAirtimeFromAcctWallet = async (req, res) => {
    //     const {amount,phone_no,telco,data_code} = airtimePayload

    const { userId, provider,number,amount } = req.body;
//   creates airtime:payload
    const airtimePayload={
        provider,
        number,
        amount
        
    }

  try {
    const result = await billsService.buyAirtimeFromAcctWallet(airtimePayload,userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { buyAirtimeFromAcctWallet };
