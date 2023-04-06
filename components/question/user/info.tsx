import Link from "next/link"

import type { UserProps } from "@/components"
import { cn } from "@/lib"
import { Verified } from "lucide-react"

export const UserInfo = ({
  nick,
  name,
  isVerified,
  isAnonymous,
}: UserProps) => {
  return (
    <div className="text-left">
      <div className="flex items-center">
        <Link
          href={`/user/${nick}`}
          className={cn(
            "user-card__name text-sm font-bold lg:text-base",
            isAnonymous ? "" : "hover:underline"
          )}
        >
          {isAnonymous ? "Anônimo" : name}
        </Link>

        {isVerified && (
          <Verified className="ml-1 h-[17px] w-[17px] text-purple-600" />
        )}
      </div>

      {!isAnonymous && (
        <span className="-mt-0.5 block w-fit text-[13px] font-medium text-slate-500 dark:text-slate-400 lg:text-base">
          @{nick}
        </span>
      )}
    </div>
  )
}
