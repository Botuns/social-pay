const TransactionService = require('../services/transactionService');

class TransactionController {
  constructor() {
    this.transactionService = new TransactionService();
  }

  createNewTransaction = async (req, res) => {
    const { transactionData } = req.body;
    const{userId}= req?.user?.id
    try {
      const result = await this.transactionService.createNewTransaction(
        transactionData,
        userId
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getAllTransactions = async (req, res) => {
    try {
      const result = await this.transactionService.getAllTransactions();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getTransactionsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const result = await this.transactionService.getTransactionsByUser(userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getPendingTransactions = async (req, res) => {
    try {
      const result = await this.transactionService.getPendingTransactions();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getUserPendingTransactions = async (req, res) => {
    const { userId } = req.params;
    try {
      const result = await this.transactionService.getUserPendingTransactions(
        userId
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getFailedTransactions = async (req, res) => {
    try {
      const result = await this.transactionService.getFailedTransactions();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getTransactionDetails = async (req, res) => {
    const { transactionId } = req.params;
    try {
      const result = await this.transactionService.getTransactionDetails(
        transactionId
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateTransactionToSuccess = async (req, res) => {
    const { reference } = req.body;
    try {
      const result = await this.transactionService.updateTransactionToSuccess(
        reference
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = TransactionController;
