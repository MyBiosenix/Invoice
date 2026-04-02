import { config } from "dotenv";

config();

const parseOrigins = (value = "") =>
  value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const defaultOrigins = [
  "http://localhost:5173",
  "https://invoice.biosenix.in",
  "https://biosenix.in",
];

const allowedOrigins = [
  ...new Set([...defaultOrigins, ...parseOrigins(process.env.CORS_ORIGINS)]),
];

export const env = {
  port: Number(process.env.PORT) || 3000,
  mongoUrl: process.env.MONGO_URL || "",
  jwtSecret: process.env.JWT_SECRET || process.env.JWT_SECRATE || "",
  allowedOrigins,
};
