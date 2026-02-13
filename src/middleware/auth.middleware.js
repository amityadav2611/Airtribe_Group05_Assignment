const jwt = require("jsonwebtoken");
const ApiError = require("../errors/error.helper");

const authMiddleware = async (req, res, next) => {
   const openRoutes = ["/users", "/users/login"];
   if (openRoutes.includes(req.originalUrl)) return next();

  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return next(new ApiError(401, "Unauthorized"));
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    next(new ApiError(401, "Invalid or expired token"));
  }
};

module.exports = authMiddleware;
