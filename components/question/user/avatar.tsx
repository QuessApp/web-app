import { Avatar, AvatarFallback, AvatarImage, UserProps } from "@/components"

export const UserAvatar = ({
  avatarUrl,
  name,
  isAnonymous,
}: Pick<UserProps, "avatarUrl" | "name" | "isAnonymous">) => {
  return (
    <div>
      <Avatar>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>
          {isAnonymous ? "A" : name.substring(0, 1).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  )
}
