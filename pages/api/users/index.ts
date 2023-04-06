import type { NextApiRequest, NextApiResponse } from "next"
import { searchUser } from "@/infra"
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
    const search = req.query.search as unknown as string
    const page = (req?.query?.page as unknown as string) || "1"

    if (!req.cookies?.access_token) {
      throw new Error("Token de acesso não fornecido")
    }

    const data = await searchUser(
      search,
      Number(page),
      req.cookies?.access_token ?? ""
    )

    if (data.ok === false) {
      throw new Error(data.message)
    }

    return res.status(200).json(customAPISuccess(data.data))
  } catch (err) {
    return res.status(400).json(customAPIError(res))
  }
}
