import express, { Request, Response, NextFunction, Application } from "express";
import { appConfig } from "./config/app.config";
import connectDB from "./utils/db";

const app: Application = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World");
});

const startServer = async () => {
  try {
    // Connect to the database without stopping server startup if it fails
    try {
      await connectDB();
    } catch (error) {
      console.error("Failed to connect to the database", error);
    }

    // Start the HTTP server
    app.listen(appConfig().port, () => {
      console.log(`Server is running on http://localhost:${appConfig().port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}; 

startServer();
