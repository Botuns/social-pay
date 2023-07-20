const express = require('express');
const TransactionController = require('../controllers/transactionController');

const router = express.Router();
const transactionController = new TransactionController();

router.post('/transaction/', transactionController.createNewTransaction);
router.get('/transaction/all', transactionController.getAllTransactions);
router.get('/transaction/user/:userId', transactionController.getTransactionsByUser);
router.get('/transaction/pending', transactionController.getPendingTransactions);
router.get('/transaction/user/:userId/pending', transactionController.getUserPendingTransactions);
router.get('/transaction/failed', transactionController.getFailedTransactions);
router.get('/transaction/:transactionId', transactionController.getTransactionDetails);
router.put('/transaction/success', transactionController.updateTransactionToSuccess);

module.exports = router;
