const Budget = require("../models/budget.model");
const ApiError = require("../errors/error.helper");


const getBudget = async (userId) => {
    const budget = await Budget.findOne({ userId });
    if (!budget) {
        throw new ApiError(404, "Budget not found");
    }
    return budget;
};

const setBudget = async (userId, data) => {
      const { monthlyGoal, savingTarget } = data;
      const budget = await Budget.findOneAndUpdate(
        { userId: userId },
        {userId, monthlyGoal, savingTarget },
        { new: true, upsert: true }
      );

      return budget;
};

module.exports = {
    getBudget,
    setBudget
};