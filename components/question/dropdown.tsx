import {
  DropdownQuestionAction,
  ProviderQuestionActionsProps,
} from "@/components"
import { useQuestionDropdownActions } from "@/hooks"

export const QuestionDropdown = ({
  question,
  isQuestionOwner,
}: ProviderQuestionActionsProps) => {
  const actions = useQuestionDropdownActions({ question, isQuestionOwner })

  if (actions.length === 0) {
    return <div className="mt-1.5 h-4 w-4 lg:h-5 lg:w-5"></div>
  }

  return <DropdownQuestionAction actions={actions} />
}
