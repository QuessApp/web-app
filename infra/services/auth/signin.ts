import { Request } from "@/@types"
import { mainAPIAdapter } from "@/infra"
import { handleReq } from "@/utils"

import { SignIn, SignInPayload } from "./@types"

export const signIn = async (payload: SignInPayload) =>
  handleReq(mainAPIAdapter.post<Request<SignIn>>(`/auth/signIn`, payload))
