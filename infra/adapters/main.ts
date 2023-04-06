import axios from "axios"

export const mainAPIAdapter = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL ?? "http://localhost:8080",
})
