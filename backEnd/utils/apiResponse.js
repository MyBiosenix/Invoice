export const sendSuccess = (
  res,
  {
    statusCode = 200,
    message = "Request successful",
    data = {},
  } = {}
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...data,
  });
};

export const sendError = (
  res,
  {
    statusCode = 500,
    message = "Something went wrong",
    data = {},
  } = {}
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...data,
  });
};
