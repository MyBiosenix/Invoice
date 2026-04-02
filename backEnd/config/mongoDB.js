import mongoose from "mongoose";
import { env } from "./env.js";

export const ConnectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Database connected successfully");
  });

  if (!env.mongoUrl) {
    throw new Error("MONGO_URL is not configured");
  }

  await mongoose.connect(env.mongoUrl);
};
