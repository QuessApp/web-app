import { Request } from "@/@types"
import { mainAPIAdapter } from "@/infra"
import { handleReq } from "@/utils"

import { RefreshToken } from "./@types"

export const refreshToken = async (token: string) =>
  handleReq(
    mainAPIAdapter.post<Request<RefreshToken>>("/auth/refresh", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  )
