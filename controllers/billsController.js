const billsService = require('../services/billsService');

const buyAirtimeFromAcctWallet = async (req, res) => {
    //     const {amount,phone_no,telco,data_code} = airtimePayload

    const { userId, amount,phone_no,telco,reference } = req.body;
//   creates airtime:payload
    const airtimePayload={
        amount,
        phone_no,
        telco,
        reference
    }

  try {
    const result = await billsService.buyAirtimeFromAcctWallet(userId, airtimePayload);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { buyAirtimeFromAcctWallet };
