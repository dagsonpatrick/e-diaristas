import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API;

export const ApiService = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
