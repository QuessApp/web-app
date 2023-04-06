import { Question } from "@/@types"
import { QuestionActions, User } from "@/components"
import { useTimeAgo } from "@/hooks"
import Link from "next/link"

export function Question({
...props
}: Question) {
  const {id, isAnonymous, content, createdAt, sentBy} = props
  const date = useTimeAgo(createdAt)

  return (
    <div className="question mx-auto max-w-[650px] rounded-md border border-slate-100 bg-white px-4 pb-1 pt-3 dark:border-slate-800 dark:bg-slate-800" style={{boxShadow: "0px 4px 15px -7px rgba(0,0,0,0.05) "}}>
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
        <div className="question__content mb-2 mt-3">
          <p className="break-all text-left text-sm leading-[1.5] text-slate-900 dark:text-slate-100 lg:text-sm">{content}</p>
        </div>
      </Link>

      <QuestionActions question={props}/>
    </div>
  )
}
