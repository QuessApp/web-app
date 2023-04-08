import { Question } from "@/@types"

import { TooltipProvider } from "@/components/ui"

import {
  CopyQuestionLinkAction,
  DeleteQuestionAction,
  HideQuestionAction,
  ReplyQuestionAction,
} from "."

export interface ProviderQuestionActionsProps {
  question: Question
  isQuestionOwner: boolean
}

export const ProviderQuestionActions = ({
  isQuestionOwner,
  question,
}: ProviderQuestionActionsProps) => {
  return (
    <TooltipProvider>
      {isQuestionOwner ? (
        <DeleteQuestionAction id={question.id} />
      ) : (
        <>
          <ReplyQuestionAction />
          <HideQuestionAction id={question.id} />
        </>
      )}

      <CopyQuestionLinkAction id={question.id} />
    </TooltipProvider>
  )
}
