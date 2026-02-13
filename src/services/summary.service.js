const Transaction = require("../models/transaction.model");
const Budget = require("../models/budget.model");
const ApiError = require("../errors/error.helper");
const mongoose = require("mongoose");



const getSummary = async (userId) => {
  if(!userId){
    throw new ApiError(404, "User not found");
  }
  const summary = await Transaction.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },

    {
      $group: {
        _id: null,

        totalIncome: {
          $sum: {
            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
          },
        },

        totalExpense: {
          $sum: {
            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
          },
        },
      },
    },
  ]);

  const budget = await Budget.findOne({ userId });
  const result = summary[0] || { totalIncome: 0, totalExpense: 0 };

  const balance = result.totalIncome - result.totalExpense;

  return {
    totalIncome: result.totalIncome,
    totalExpense: result.totalExpense,
    balance,

    monthlyGoal: budget?.monthlyGoal || 0,
    savingTarget: budget?.savingTarget || 0,

    budgetStatus:
      result.totalExpense > (budget?.monthlyGoal || 0)
        ? "Budget Exceeded"
        : "Within Budget",

    savingStatus:
      balance >= (budget?.savingTarget || 0)
        ? "Saving Target Achieved"
        : "Saving Target Pending",
  };
  // const getSummary = await Transaction.aggregate([
  //   {
  //     $group: {
  //       _id: "$type",
  //       total: { $sum: "$amount" },
  //     },
  //   },
  // ]);
  // return getSummary;
};

module.exports = {
  getSummary,
};