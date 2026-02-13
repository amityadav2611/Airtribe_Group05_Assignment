const Transaction = require("../models/transaction.model");
const ApiError = require("../errors/error.helper");
const mongoose = require("mongoose");


const addTransaction = async (userId, data) => {
  if (!data.type || !data.category || !data.amount) {
    throw new ApiError(400, "All fields are required");
  }
  data.userId = userId;
  const transaction = await Transaction.create(data);
  return transaction;
};

const getSingleTransaction = async (id) => {
  const transaction = await Transaction.findById(id);
  if (!transaction) {
    throw new ApiError(404, "Transaction not found");
  }
  return transaction;
};
const getTransactions = async (userId) => {
  const transactions = await Transaction.find({ userId: userId });
  if (!transactions) {
    throw new ApiError(404, "Transactions not found");
  }
  return transactions;
};

const updateTransactions = async (id, data) => {
  const transactionExist = await Transaction.findById(id);
  if (!transactionExist) {
    throw new ApiError(404, "Transaction not found");
  }

  const transaction = await Transaction.updateOne(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: data }
  );
  return transaction;
};

const deleteTransactions = async (id) => {
  const transactionExist = await Transaction.findById(id);
  if (!transactionExist) {
    throw new ApiError(404, "Transaction not found");
  }
  const transaction = await Transaction.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  return transaction;
};

module.exports = {
  addTransaction,
  getSingleTransaction,
  getTransactions,
  updateTransactions,
  deleteTransactions,
};
