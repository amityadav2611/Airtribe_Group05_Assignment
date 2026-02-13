const summaryService = require("../services/summary.service");
const cache = require("../utils/cache");

const getSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const cached = cache.get("summary");
    if (cached) return res.json(cached);

    const summary = await summaryService.getSummary(userId);
    const data = {
      success: true,
      message: "Summary fetched successfully",
      data: summary,
    };

    cache.set("summary", data, 60000);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  getSummary,
};
