import type { Question } from "@/@types"
import { User } from "@/components"

import { QuestionHeaderDate } from "."

export const QuestionHeader = (
  data: Pick<Question, "isAnonymous" | "sentBy" | "createdAt">
) => {
  const { isAnonymous, sentBy, createdAt } = data

  return (
    <div className="flex justify-between">
      <User isAnonymous={isAnonymous} {...sentBy} />
      <QuestionHeaderDate createdAt={createdAt} />
    </div>
  )
}
