import type { NextApiRequest, NextApiResponse } from "next"

import { sendQuestionToAnUser } from "@/infra"
import { customAPIError, customAPISuccess } from "@/utils"

export type SortOptions = "all" | "sent" | "replied"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  )

  try {
    const { sendTo, content, isAnonymous } = req.body

    if (!req.cookies?.access_token) {
      throw new Error("Token de acesso não fornecido")
    }

    const data = await sendQuestionToAnUser(
      sendTo,
      content,
      isAnonymous,
      req.cookies?.access_token ?? ""
    )

    if (!data.ok) {
      return res.status(400).json(data)
    }

    return res.status(201).json(customAPISuccess(data?.data))
  } catch (err) {
    return res.status(500).json(customAPIError(err))
  }
}
