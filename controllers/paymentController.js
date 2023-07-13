const PaymentService = require('../services/paymentService')
const paymentService = new PaymentService()

 class PaymentController{
    async fundAcctWallet(req,res){
        try{
            const{email,amount}=req.body
            const result = await paymentService.fundacctWallet(email,amount)
            // const authorizationUrl = result.data.authorization_url;
            // window.location.href= 'https://checkout.paystack.com/b40y89rh4s9f4lb'
            res.status(201).json(result);



        } catch(error){
            res.status(400).json({message: error.message});

        }

    }
}

module.exports= PaymentController