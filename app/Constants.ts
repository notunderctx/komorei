import dotenv from "dotenv";
dotenv.config({
  path: "/.env",
});

export const API_URL = process.env.BASE_URL;
