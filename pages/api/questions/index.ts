import type { NextApiRequest, NextApiResponse } from "next"

import { getFeedQuestions } from "@/infra"
import { customAPISuccess } from "@/utils"

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
    const filter = req.query?.filter as unknown as SortOptions
    const sort = (req?.query?.sort as unknown as "desc" | "asc") || "desc"
    const page = (req?.query?.page as unknown as string) || "1"

    if (!req.cookies?.access_token) {
      throw new Error("Token de acesso não fornecido")
    }

    const data = await getFeedQuestions(
      filter,
      sort,
      Number(page),
      req.cookies?.access_token ?? ""
    )

    if (!data.ok) {
      return res.status(400).json(data)
    }

    return res.status(200).json(customAPISuccess(data.data))
  } catch (err) {
    return res.status(400).json(err)
  }
}
