import dotenv from "dotenv";
dotenv.config();

export default function getEnv(key: string, defaultValue: string = ""): string {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`Key ${key} is not defined in .env`);
  }
  return value;
}
