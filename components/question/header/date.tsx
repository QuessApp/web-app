import { Question } from "@/@types"
import { useTimeAgo } from "@/hooks"

export const QuestionHeaderDate = ({
  createdAt,
}: Pick<Question, "createdAt">) => {
  const date = useTimeAgo(createdAt)

  return (
    <div className="question__date">
      <span className="text-[13px] text-slate-500 dark:text-slate-400 lg:text-[14px]">
        {date}
      </span>
    </div>
  )
}
