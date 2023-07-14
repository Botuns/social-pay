const axios = require('axios')
const https = require('https')
const PaymentService = require('../services/paymentService')
const TransactionService = require('../services/transactionService')
const { response } = require('express')
const paymentService = new PaymentService()
const transactionService = new TransactionService()

 class PaymentController{
    async fundAcctWallet(req,res){
        try{
            const{email,amount}=req.body
            const result = await paymentService.fundacctWallet(email,amount)
            const authorizationUrl = result.result.data.data.authorization_url;
            res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            return res.redirect(authorizationUrl);

            
            
        } catch(error){
            res.status(400).json({message: error.message});

        }

    }
    async verifyPayment(req,res){
        const {reference} = req.params 
        try {
            const options = {
                hostname: 'api.paystack.co',
                port: 443,
                path: `/transaction/verify/${reference}`,
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${process.env.PUBLIC_KEY}`
                }
              }
              
              const request =  https.request(options, rest => {
                let data = ''
              
                rest.on('data', (chunk) => {
                  data += chunk
                });
              
                rest.on('end', () => {
                  console.log(JSON.parse(data))
                  if(data.status="success"){
                    transactionService.updateTransactionToSuccess(reference)
                  }
                  res.status(200).json(JSON.parse(data))
                })
              }).on('error', error => {
                console.error(error)
                res.status(400).json(error)
                
              })

            //   end here
            request.end(); // Add this line to initiate the request

        } catch (error) {
            res.status(400).json(error.message)
        }
  
    }
}

module.exports= PaymentController