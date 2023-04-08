import type { UserProps } from "@/components"

import { UserPresentation, UserProvider, VerifiedBadge } from "."

export const BaseUserInfo = (data: UserProps) => {
  const { isVerified, ...rest } = data

  return (
    <UserProvider>
      <UserPresentation {...rest} />
      <VerifiedBadge isVerified={isVerified} />
    </UserProvider>
  )
}
