const { v4: uuid } = require("uuid");
const logger = require("../utils/logger");

module.exports = (req, res, next) => {
  const requestId = uuid();

  req.requestId = requestId;

  const start = Date.now();

  // ⭐ FIX HERE
  logger.info("REQUEST", {
    requestId,
    method: req.method,
    url: req.originalUrl,
  });

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info("RESPONSE", {
      requestId,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      user: req.user?.id || null,
    });
  });

  next();
};
