const axios = require('axios');
const https = require('https');
const { ObjectId } = require('mongodb');
const User = require('../models/userModel');

class PaymentService {
  initializepaystack(email, amount) {
    return new Promise((resolve, reject) => {
      const params = JSON.stringify({
        email: email,
        amount: amount * 100
      });

      const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.PUBLIC_KEY}`,
          'Content-Type': 'application/json'
        }
      };

      let data = '';
      const clientReq = https.request(options, apiRes => {
        apiRes.on('data', chunk => {
          data += chunk;
        });
        apiRes.on('end', () => {
          const parsedData = JSON.parse(data);
          console.log(parsedData);
          resolve({
            message: 'Returned paystack check-out link successfully',
            data: parsedData,
            status: 'success'
          });
        });
      });

      clientReq.on('error', error => {
        reject(error);
      });

      clientReq.write(params);
      clientReq.end();
    });
  }

  async fundacctWallet(email, amount,userId) {
    const id = new ObjectId(userId);
    const user = User.findById(id);
    if(!user){
      throw new Error('User not found');
    }

    try {
      const result = await this.initializepaystack(email, amount);
      return {
        result,
        message: 'Accept this for now'
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async AddMoneytoAcctWallet(userId){
    
  }
}

module.exports = PaymentService;
