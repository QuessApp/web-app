import Link from "next/link"

import type { UserProps } from "@/components"
import { cn } from "@/lib"

const Name = ({ name }: Pick<UserProps, "name">) => {
  return (
    <h3
      className={cn(
        "user-card__name text-sm font-bold hover:underline lg:text-base"
      )}
    >
      {name}
    </h3>
  )
}

const AnonymousUserName = () => <Name name="Anônimo" />

export const UserName = ({
  name,
  nick,
  isAnonymous,
}: Pick<UserProps, "name" | "isAnonymous" | "nick">) => {
  return isAnonymous ? (
    <AnonymousUserName />
  ) : (
    <Link href={`/user/${nick}`}>
      <Name name={name} />
    </Link>
  )
}
