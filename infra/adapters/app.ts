import axios from "axios"
import Cookiejs from "js-cookie"

export const mainAppAdapter = axios.create({
  baseURL:
    `${process.env.NEXT_PUBLIC_BASE_APP_URL}/api` ??
    "http://localhost:3200/api",
})

mainAppAdapter.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    const data = error.response?.data
    const errorMesage = data?.message

    if (!Cookiejs.get("access_token") || !Cookiejs.get("refresh_token")) {
      return (window.location.href = "/signin")
    }

    if (errorMesage === "Token is expired") {
      originalRequest.retry = true

      const { data: result } = await mainAppAdapter.get(`/auth/refresh`)

      if (result?.message === "token_expired") {
        Cookiejs.remove("access_token")
        Cookiejs.remove("refresh_token")

        return (window.location.href = "/signin")
      }

      if (result?.data) {
        Cookiejs.set("access_token", result.data.accessToken, {
          expires: new Date(result.data.expiresAt),
        })

        const thirtyDaysInHours = 30 * 24 * 60 * 60 * 1000
        const expiresInOneMonth = new Date(
          new Date().getTime() + thirtyDaysInHours
        )

        Cookiejs.set("refresh_token", result.data.refreshToken, {
          expires: expiresInOneMonth,
        })

        return mainAppAdapter(originalRequest)
      }
    }

    return Promise.reject(error)
  }
)
