const express = require('express');
const router = express.Router();

const PaymentController= require('../controllers/paymentController')

const payment= new PaymentController()

router.post('/payment/fundacctwallet',payment.fundAcctWallet)

module.exports= router