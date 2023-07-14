const Transaction = require('../models/transactionModel')
const User = require('../models/userModel')
const { ObjectId } = require('mongodb');
class TransactionService{

    // creates new transactions on verified payments for all services
    async createNewTransaction(transactionData,userId){
        const userRef= new ObjectId(userId)
        // get the data needed to initiate a transaction on the application
        const {purpose,amount,refNo,type,description} = transactionData
        try {
            const newTransaction = new Transaction({
                userRef,purpose,amount,refNo,type,description
            })
            await newTransaction.save()
            return({
                message: 'new transaction initiated',
                data:newTransaction,
                status:'success'
            })
            
        } catch (error) {
            throw new Error(error)
            
        }

    }

    // get all transactions
    async getAllTransactions(){
        try {
            const allTransactions = await Transaction.find();
            if(allTransactions){
                return({
                    message:"transactions retrieved sucessfully",
                    data:allTransactions,
                    status:'success'
                })
            }
            return({
                message:"transactions could not be retrieved ",
                data:null,
                status:'fail'
            })
        } catch (error) {
            throw new Error(error)
            
        }

    }

    // get transactionsByUsers
    async getTransactionsByUser(userId) {
        const userRef = new ObjectId(userId);
        try {
          const userTransactions = await Transaction.find({ userRef });
          if (userTransactions) {
            return {
              message: 'Transactions retrieved successfully',
              data: userTransactions,
              status: 'success',
            };
          }
          return {
            message: 'Transactions for the user could not be retrieved',
            data: null,
            status: 'fail',
          };
        } catch (error) {
          throw new Error(error);
        }
      }

      // get pending transactions
  async getPendingTransactions() {
    try {
      const pendingTransactions = await Transaction.find({ status: 'pending' });
      if (pendingTransactions) {
        return {
          message: 'Pending transactions retrieved successfully',
          data: pendingTransactions,
          status: 'success',
        };
      }
      return {
        message: 'No pending transactions found',
        data: null,
        status: 'fail',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  // get user's pending transactions
  async getUserPendingTransactions(userId) {
    const userRef = new ObjectId(userId);
    try {
      const userPendingTransactions = await Transaction.find({
        userRef,
        status: 'pending',
      });
      if (userPendingTransactions) {
        return {
          message: 'User pending transactions retrieved successfully',
          data: userPendingTransactions,
          status: 'success',
        };
      }
      return {
        message: 'No pending transactions found for the user',
        data: null,
        status: 'fail',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  // get failed transactions
  async getFailedTransactions() {
    try {
      const failedTransactions = await Transaction.find({ status: 'failed' });
      if (failedTransactions) {
        return {
          message: 'Failed transactions retrieved successfully',
          data: failedTransactions,
          status: 'success',
        };
      }
      return {
        message: 'No failed transactions found',
        data: null,
        status: 'fail',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  // get transaction details
  async getTransactionDetails(transactionId) {
    try {
      const transaction = await Transaction.findById(transactionId);
      if (transaction) {
        return {
          message: 'Transaction details retrieved successfully',
          data: transaction,
          status: 'success',
        };
      }
      return {
        message: 'Transaction details not found',
        data: null,
        status: 'fail',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  // update transaction to success and update user account wallet
async updateTransactionToSuccess(reference) {
    try {
      const transaction = await Transaction.find({refNo:reference});
      if (transaction) {
        if (transaction.status === 'pending') {
          // Update transaction status to success
          transaction.status = 'verified';
          await transaction.save();
  
          // Update user's account wallet by adding amount
          const user = await User.findById(transaction.userRef);
          if (user) {
            user.acctWallet += transaction.amount;
            await user.save();
          } else {
            return {
              message: 'User not found',
              data: null,
              status: 'fail',
            };
          }
  
          return {
            message: 'Transaction updated to success',
            data: {
              transaction,
              user,
            },
            status: 'success',
          };
        } else {
          return {
            message: 'Transaction is not pending',
            data: null,
            status: 'fail',
          };
        }
      } else {
        return {
          message: 'Transaction not found',
          data: null,
          status: 'fail',
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  

}

module.exports= TransactionService