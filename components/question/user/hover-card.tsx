import Link from "next/link"

import { User, UserAvatar, UserInfo, UserProps } from "@/components"
import * as HoverCard from "@radix-ui/react-hover-card"
import { CalendarDays } from "lucide-react"

export const UserHoverCard = ({ ...props }: UserProps) => {
  const { nick, isAnonymous } = props

  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild className="user-card__hover">
        {isAnonymous ? (
          <User {...props} />
        ) : (
          <Link passHref href={`/user/${nick}`}>
            <User {...props} />
          </Link>
        )}
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md border border-slate-100 bg-white p-3 shadow-[hsl(206_22%_7%_/_10%)_0px_10px_38px_-10px,hsl(206_22%_7%_/10%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
          side="bottom"
          sideOffset={-20}
          align="start"
        >
          <div className="flex flex-col gap-[7px]">
            <UserAvatar {...props} />

            <div className="flex flex-col gap-[15px]">
              <div>
                <UserInfo {...props} />
              </div>

              <div className="flex lg:items-center">
                <CalendarDays className="mr-2 h-[14px] w-[14px] opacity-70 lg:h-[17px] lg:w-[17px]" />{" "}
                <span className="text-xs text-slate-500 dark:text-slate-400 lg:text-base">
                  Joined December 2021
                </span>
              </div>
            </div>
          </div>

          <HoverCard.Arrow className="fill-white" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
