import express from "express";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";
import { authRouter } from "./routes/authRoute.js";
import { healthRouter } from "./routes/healthRoute.js";
import { errorHandler, notFound } from "./middlewere/errorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Biosenix API server is running",
  });
});

app.use("/api", healthRouter);
app.use("/api", authRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
