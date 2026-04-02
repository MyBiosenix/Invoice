import express from "express";
import { sendSuccess } from "../utils/apiResponse.js";

export const healthRouter = express.Router();

healthRouter.get("/health", (req, res) => {
  return sendSuccess(res, {
    message: "API is running",
  });
});
