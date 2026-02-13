const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// user routes
router.post("", userController.registerUser);
router.post("/login", userController.loginUser);

module.exports = router;
