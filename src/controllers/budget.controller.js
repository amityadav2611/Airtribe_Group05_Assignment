const budgetService = require("../services/budget.service");

const getBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const budget = await budgetService.getBudget(userId);

    res.status(200).json({
      success: true,
      message: "Budget fetched successfully",
      data:budget,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const setBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;
    const budget = await budgetService.setBudget(userId, data);
    res.status(200).json(budget);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  getBudget,
  setBudget,
};
