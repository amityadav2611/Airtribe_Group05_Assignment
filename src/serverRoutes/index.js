const router = require("express").Router();
const userRoute = require("../routes/user.route");
const transactionRoute = require("../routes/transaction.route");
const summaryRoute = require("../routes/summary.route");
const budgetRoute = require("../routes/budget.route");

router.use("/users", userRoute);
router.use("/transactions", transactionRoute);
router.use("/summary", summaryRoute);
router.use("/budget", budgetRoute);

module.exports = router;
