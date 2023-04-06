import { Request } from "@/@types"
import { mainAPIAdapter } from "@/infra"
import { SortOptions } from "@/pages/api/questions"
import { handleReq } from "@/utils"

import { FeedQuestions } from "./@types"

export const getFeedQuestions = async (
  filter: SortOptions = "all",
  sort: "desc" | "asc" = "asc",
  page = 1,
  authToken: string
) =>
  handleReq(
    mainAPIAdapter.get<Request<FeedQuestions>>(
      `/questions?filter=${filter}&page=${page}&sort=${sort}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
  )
