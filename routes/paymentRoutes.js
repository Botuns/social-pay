const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const PaymentController= require('../controllers/paymentController')

const payment= new PaymentController()

router.post('/payment/fundacctwallet',authMiddleware,payment.fundAcctWallet)
router.get('/payment/verify/:reference',authMiddleware,payment.verifyPayment)


module.exports= router