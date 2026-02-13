const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");

// transaction routes
router.post("", transactionController.addTransaction);
router.get("/:id", transactionController.getSingleTransaction);
router.get("", transactionController.getTransactions);
router.patch("/:id", transactionController.updateTransactions);
router.delete("/:id", transactionController.deleteTransactions);


module.exports = router;
