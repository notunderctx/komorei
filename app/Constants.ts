import dotenv from "dotenv";
dotenv.config();

export const API_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://animedataapiv3.vercel.app";
