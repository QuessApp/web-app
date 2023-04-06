import { Request } from "@/@types"
import { mainAPIAdapter } from "@/infra"
import { handleReq } from "@/utils"

export const blockUser = async (userID: string, authToken: string) =>
  handleReq(
    mainAPIAdapter.post<Request<null>>(`/blocks/user/${userID}`, null, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
  )
