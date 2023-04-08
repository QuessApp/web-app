import { UserName, UserNick, UserProps } from "@/components"

export const UserPresentation = ({
  nick,
  isAnonymous,
  name,
}: Pick<UserProps, "nick" | "isAnonymous" | "name">) => {
  return (
    <div>
      <UserName nick={nick} name={name} isAnonymous={isAnonymous} />
      <UserNick nick={nick} isAnonymous={isAnonymous} />
    </div>
  )
}
