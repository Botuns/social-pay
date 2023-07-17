const router = require('express').Router()
const billsService = require('../services/billsService')

router.post('/utilities/airtime/acctwallet',billsService.buyAirtimeFromAcctWallet)

module.exports= router