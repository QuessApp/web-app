import { Question } from "@/@types"
import { ProviderQuestionActions, QuestionDropdown } from "@/components"

export interface QuestionFooterProps {
  question: Question
}

export const QuestionFooter = ({ question }: QuestionFooterProps) => {
  const isQuestionOwner = false

  return (
    <div className="mt-[10px] flex items-center justify-between gap-4">
      <ProviderQuestionActions
        isQuestionOwner={isQuestionOwner}
        question={question}
      />
      <QuestionDropdown question={question} isQuestionOwner={isQuestionOwner} />
    </div>
  )
}
