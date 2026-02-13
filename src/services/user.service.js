const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const ApiError = require("../errors/error.helper");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;

const registerUser = async (data) => {
  if (!data.name || !data.email || !data.password) {
    throw new ApiError(400, "All fields are required");
  }
  const existing = await User.findOne({ email: data.email });

  if (existing) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  user.password = undefined;

  return user;
};

const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError(400, "Email and password required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Email not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(401, "Incorrect password");
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );

  user.password = undefined;

  return {
    userId: user._id,
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
