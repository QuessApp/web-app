import type { Question } from "@/@types"
import { QuestionContent, QuestionFooter, QuestionHeader } from "@/components"

export function Question(data: Question) {
  const { id, content, sentBy, createdAt, isAnonymous } = data

  return (
    <div className="question mx-auto max-w-[650px] rounded-md border border-slate-100 bg-white px-4 pb-1 pt-3 shadow-xs dark:border-slate-800 dark:bg-slate-800">
      <QuestionHeader
        sentBy={sentBy}
        isAnonymous={isAnonymous}
        createdAt={createdAt}
      />
      <QuestionContent id={id} content={content} />
      <QuestionFooter question={data} />
    </div>
  )
}
