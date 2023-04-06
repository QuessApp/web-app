import { Question } from "@/@types"
import { QuestionActions, Separator, User } from "@/components"
import { useTimeAgo } from "@/hooks"
import Link from "next/link"

export function Question({
...props
}: Question) {
  const {id, isAnonymous, content, createdAt, sentBy} = props
  const date = useTimeAgo(createdAt)

  return (
    <div className="question mx-auto max-w-[650px]">
      <div className="flex justify-between">
        <div className="user__wrapper">
          <User isAnonymous={isAnonymous} {...sentBy} />
        </div>

        <div className="question__date">
          <span className="text-[13px] text-slate-500 dark:text-slate-400 lg:text-[14px]">
            {date}
          </span>
        </div>
      </div>

      <Link href={`/question/${id}`}>
        <div className="question__content my-2">
          <p className="break-all text-left text-sm leading-[1.5] text-slate-900 lg:text-base ">{content}</p>
        </div>
      </Link>

      <QuestionActions question={props}/>

      <Separator className="mt-2" />
    </div>
  )
}
