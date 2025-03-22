import dotenv from "dotenv";
import getEnv from "../utils/get-env";
dotenv.config();

export const appConfig = () => ({
    port: getEnv("PORT", "8000"),
    env: getEnv("NODE_ENV", "development"),
    dbUri: getEnv("DB_URI", "mongodb://localhost:27017/test"),
})
