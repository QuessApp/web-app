import type { NextApiRequest, NextApiResponse } from "next"

import { hideQuestion } from "@/infra"
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

    if (!req.cookies?.access_token) {
      throw new Error("Token de acesso não fornecido")
    }

    const data = await hideQuestion(id, req.cookies?.access_token ?? "")

    if (data.ok === false) {
      throw Error(data.message)
    }

    return res.status(201).json(customAPISuccess(data?.data))
  } catch (err) {
    return res.status(400).json(customAPIError(err))
  }
}
