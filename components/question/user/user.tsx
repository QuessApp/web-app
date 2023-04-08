import type { User } from "@/@types"
import { UserAvatar, BaseUserInfo as UserInfo } from "@/components"

export interface UserProps extends User {
  isAnonymous: boolean
}

export function User(data: UserProps) {
  return (
    <div>
      <div className="user flex items-center gap-2">
        <UserAvatar {...data} />
        <UserInfo {...data} />
      </div>
    </div>
  )
}
