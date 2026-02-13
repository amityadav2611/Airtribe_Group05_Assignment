require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5002;
const cors = require("cors");
const connectDB = require("./src/db/connect");
const routes = require("./src/serverRoutes/index");
const authMiddleware = require("./src/middleware/auth.middleware");
const requestLogger = require("./src/middleware/requestLogger");
const errorHandler = require("./src/middleware/errorHandler");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");




app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(requestLogger);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, try later",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.get("/health", (req, res) => {
  res.send({ message: "Server Running..." });
});

app.use(authMiddleware);

app.use(routes);
app.use(errorHandler);




const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    const server = app.listen(process.env.PORT, () => {
      console.log("---------------------------------");
      console.log(`🚀 App is listening on ${PORT} 🚀`);
      console.log("---------------------------------");
    });
  } catch (error) {
    console.log(error);
  }
};
start();

module.exports = app;
