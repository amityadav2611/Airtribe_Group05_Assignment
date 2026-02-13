const transactionService = require("../services/transaction.service");

const addTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const transaction = await transactionService.addTransaction(
      userId,
      req.body
    );
    return res.status(201).json({
      success: true,
      message: "Transaction added successfully",
      data:transaction,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const getSingleTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.getSingleTransaction(
      req.params.id
    );
    return res.status(200).json({
      success: true,
      message: "Transaction fetched successfully",
      data:transaction,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await transactionService.getTransactions(userId);
    return res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      data: transactions,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const updateTransactions = async (req, res) => {
  try {
    const transaction = await transactionService.updateTransactions(
      req.params.id,
      req.body
    );
    return res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      data:transaction,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const deleteTransactions = async (req, res) => {
  try {
    const transaction = await transactionService.deleteTransactions(
      req.params.id
    );
    return res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
      data: transaction,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  addTransaction,
  getSingleTransaction,
  getTransactions,
  updateTransactions,
  deleteTransactions,
};
