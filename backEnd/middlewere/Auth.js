import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { sendError } from "../utils/apiResponse.js";

export const AuthUser = (req, res, next) => {
  const { token } = req.headers;

  try {
    if (!token) {
      return sendError(res, {
        statusCode: 401,
        message: "Not authorized. Please login again.",
      });
    }

    const decodedToken = jwt.verify(token, env.jwtSecret);
    req.userId = decodedToken;
    return next();
  } catch (error) {
    return sendError(res, {
      statusCode: 401,
      message: "Invalid or expired token",
    });
  }
};
