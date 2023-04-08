import { ProviderQuestionActions, ProviderQuestionActionsProps } from "."

export const BaseQuestionActions = ({
  isQuestionOwner,
  question,
}: ProviderQuestionActionsProps) => {
  return (
    <ProviderQuestionActions
      isQuestionOwner={isQuestionOwner}
      question={question}
    />
  )
}
