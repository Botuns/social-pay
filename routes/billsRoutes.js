const router = require('express').Router()
const billsController = require('../controllers/billsController')

router.post('/utilities/airtime/acctwallet',billsController.buyAirtimeFromAcctWallet)

module.exports= router