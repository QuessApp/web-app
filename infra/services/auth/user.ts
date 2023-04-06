import { Request } from "@/@types"
import { mainAPIAdapter } from "@/infra"
import { handleReq } from "@/utils"

import { AuthenticatedUser } from "./@types"

export const getAuthenticatedUser = async (authToken: string) =>
  handleReq(
    mainAPIAdapter.get<Request<AuthenticatedUser>>(`/users/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
  )
