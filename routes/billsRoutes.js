const router = require('express').Router()
const billsController = require('../controllers/billsController')
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/utilities/airtime/acctwallet',authMiddleware,billsController.buyAirtimeFromAcctWallet)

module.exports= router