import type { UserProps } from "@/components"

import { UserPresentation, UserProvider } from "."

export const BaseUserInfo = (data: UserProps) => {
  return (
    <UserProvider>
      <UserPresentation {...data} />
    </UserProvider>
  )
}
