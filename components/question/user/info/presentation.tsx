import { UserName, UserNick, UserProps } from "@/components"

export const UserPresentation = ({
  nick,
  isAnonymous,
  name,
  isVerified,
}: Pick<UserProps, "nick" | "isAnonymous" | "name" | "isVerified">) => {
  return (
    <div>
      <UserName
        isVerified={isVerified}
        nick={nick}
        name={name}
        isAnonymous={isAnonymous}
      />
      <UserNick nick={nick} isAnonymous={isAnonymous} />
    </div>
  )
}
