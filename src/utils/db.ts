import mongoose from "mongoose";
import { appConfig } from "../config/app.config";

let cachedConnection: typeof mongoose | null = null;

const connectDB = async () => {
  // If we already have a connection, return it
  if (cachedConnection) {
    console.log("Using existing connection");
    return cachedConnection;
  }

  const MONGO_URI = appConfig().dbUri;

  if (!MONGO_URI) {
    throw new Error("Mongo URI is not defined in the configuration");
  }

  try {
    const connection = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4,
    });
    console.log("MongoDB connected successfully");

    // Cache the connection for future use
    cachedConnection = connection;

    // Handle connection errors after intial connection
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error: ", err);
      cachedConnection = null;
    });

    // Handles graceful disconnection when the Node process ends
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log(
        "MongoDB connection is disconnected due to application termination",
      );
      process.exit(0);
    });
    return connection;
  } catch (error) {
    console.error("MongoDB connection failed", error);
    throw error;
  }
};

export default connectDB;
