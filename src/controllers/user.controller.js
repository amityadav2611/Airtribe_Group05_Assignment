const userService = require("../services/user.service");

const registerUser = async (req, res) => {
  try {
    console.log("here", req.body);
    const user = await userService.registerUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
    // return res.status(500).json({ error: error.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const user = await userService.loginUser(req.body);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
    // return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};