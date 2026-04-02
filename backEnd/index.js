import app from "./app.js";
import { ConnectDB } from "./config/mongoDB.js";
import { env } from "./config/env.js";
import { ConnectCloudinary } from "./config/claudinary.js";
import { defaultItems } from "./middlewere/FixedItem.js";

const startServer = async () => {
  try {
    if (!env.jwtSecret) {
      throw new Error("JWT_SECRET is not configured");
    }

    ConnectCloudinary();
    await ConnectDB();
    await defaultItems();

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
