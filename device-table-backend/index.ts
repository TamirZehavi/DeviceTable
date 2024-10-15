import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();
const PORT = process.env.PORT || 3005;
const MONGODB_URI = process.env.DB_CONNECTION_STRING || "";
const environment = process.env.NODE_ENV;

async function initServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Couldn't start server: No DB connection");
    return;
  }

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

initServer();
