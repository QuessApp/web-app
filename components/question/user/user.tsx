import type { User } from "@/@types"
import { UserAvatar, UserInfo } from "@/components"

export interface UserProps extends User {
  isAnonymous: boolean
}

export function User({ ...props }: UserProps) {
  const { avatarUrl, isAnonymous, name, nick } = props

  return (
    <div className="user flex items-center gap-2">
      <UserAvatar avatarUrl={avatarUrl} name={name} isAnonymous={isAnonymous} />
      <UserInfo {...props} />
    </div>
  )
}
