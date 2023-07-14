const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status:{
    type:String,
    enum:['pending','verified','failed','rejected'],
    default:'pending'
  },
  purpose:{
    type:String,
    enum:['airtime','data','dstv','ibedc','fundwallet']
  },
  amount: {
    type: Number,
    required: true
  },
  refNo:{
    type:String,
    required:true
  },
  type: {
    type: String,
    enum: ['credit', 'debit','wallet'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    default: Date.now
  }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
