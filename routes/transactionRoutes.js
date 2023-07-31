const express = require('express');
const TransactionController = require('../controllers/transactionController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();
const transactionController = new TransactionController();

router.post('/transaction/',authMiddleware, transactionController.createNewTransaction);
router.get('/transaction/all',authMiddleware, transactionController.getAllTransactions);
router.get('/transaction/user/:userId',authMiddleware, transactionController.getTransactionsByUser);
router.get('/transaction/pending',authMiddleware, transactionController.getPendingTransactions);
router.get('/transaction/user/:userId/pending',authMiddleware, transactionController.getUserPendingTransactions);
router.get('/transaction/failed',authMiddleware, transactionController.getFailedTransactions);
router.get('/transaction/:transactionId',authMiddleware, transactionController.getTransactionDetails);
router.put('/transaction/success',authMiddleware, transactionController.updateTransactionToSuccess);

module.exports = router;
