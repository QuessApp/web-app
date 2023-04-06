import type { NextApiRequest, NextApiResponse } from "next"

import { replyQuestion } from "@/infra"
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
    const id = req.query.id as unknown as string
    const content = req.body.content

    if (!req.cookies?.access_token) {
      throw new Error("Token de acesso não fornecido")
    }

    const data = await replyQuestion(
      id,
      req.cookies?.access_token ?? "",
      content
    )

    if (!data.ok) {
      return res.status(400).json(data)
    }

    return res.status(201).json(customAPISuccess(data?.data))
  } catch (err) {
    return res.status(500).json(customAPIError(err))
  }
}
