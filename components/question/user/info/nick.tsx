import type { UserProps } from "@/components"

const Nick = ({ nick }: Pick<UserProps, "nick">) => {
  return (
    <span className="-mt-0.5 block w-fit text-[13px] font-medium text-slate-500 dark:text-slate-400">
      @{nick}
    </span>
  )
}

export const UserNick = ({
  nick,
  isAnonymous,
}: Pick<UserProps, "nick" | "isAnonymous">) => {
  return isAnonymous ? null : <Nick nick={nick} />
}
