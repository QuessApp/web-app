import { Request } from "@/@types"
import { mainAPIAdapter } from "@/infra"
import { handleReq } from "@/utils"

import { Users } from "./@types"

export const searchUser = async (value: string, page = 1, authToken: string) =>
  handleReq(
    mainAPIAdapter.get<Request<Users>>(`/users?search=${value}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
  )
