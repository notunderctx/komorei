import axios from "axios";

export const instance = axios.create({
  baseURL: "http://0.0.0.0:4000",
});
