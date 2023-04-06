import type { NextApiRequest, NextApiResponse } from "next"

import { refreshToken } from "@/infra"
import { customAPIError, customAPISuccess } from "@/utils"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  )

  try {
    if (!req?.cookies?.refresh_token) {
      throw new Error("Refresh token not provided")
    }

    const data = await refreshToken(req?.cookies?.refresh_token)

    if (!data.ok) {
      return res.status(400).json(data)
    }

    return res.status(200).json(customAPISuccess(data?.data))
  } catch (err) {
    return res.status(500).json(customAPIError(err))
  }
}
