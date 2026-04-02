export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (error, req, res, next) => {
  const statusCode =
    error.message === "CORS origin not allowed"
      ? 403
      : res.statusCode && res.statusCode !== 200
      ? res.statusCode
      : 500;
  const message =
    error.message === "CORS origin not allowed"
      ? "Request blocked by CORS policy"
      : error.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
