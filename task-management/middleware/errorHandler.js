const logger = require("../utils/logger");

class AppError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error(err.message, { 
    stack: err.stack,
    statusCode: err.statusCode,
    path: req.path,
    method: req.method
  });

  // Determine if we should show details (development only)
  const showDetails = process.env.NODE_ENV === 'development';

  // Standardized error response
  const response = {
    success: false,
    error: {
      code: err.statusCode || 500,
      message: err.message || "Internal Server Error",
      ...(err.details && { details: err.details }),
      ...(showDetails && { stack: err.stack })
    }
  };

  // Send the response
  res.status(err.statusCode || 500).json(response);
};

// Success response helper (can be used in controllers)
const successResponse = (res, statusCode = 200, data = null, message = null) => {
  const response = {
    success: true,
    ...(data && { data }),
    ...(message && { message })
  };
  return res.status(statusCode).json(response);
};

module.exports = {
  errorHandler,
  AppError,
  successResponse
};