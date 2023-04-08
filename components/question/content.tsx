import Link from "next/link"

import { Question } from "@/@types"

export const QuestionContent = ({
  id,
  content,
}: Pick<Question, "id" | "content">) => {
  return (
    <Link href={`/question/${id}`}>
      <div className="question__content mb-2 mt-3">
        <p className="break-all text-left text-sm leading-[1.5] text-slate-900 dark:text-slate-100 lg:text-sm">
          {content}
        </p>
      </div>
    </Link>
  )
}
