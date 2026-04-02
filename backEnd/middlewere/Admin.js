import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { sendError } from "../utils/apiResponse.js";

export const AuthAdmin = (req, res, next) => {
  const { token } = req.headers;

  try {
    if (!token) {
      return sendError(res, {
        statusCode: 401,
        message: "Not authorized. Please login again.",
      });
    }

    const decodedToken = jwt.verify(token, env.jwtSecret);

    if (decodedToken.role !== "admin") {
      return sendError(res, {
        statusCode: 403,
        message: "Only admin users can perform this action",
      });
    }

    req.userId = decodedToken;
    return next();
  } catch (error) {
    return sendError(res, {
      statusCode: 401,
      message: "Invalid or expired token",
    });
  }
};
