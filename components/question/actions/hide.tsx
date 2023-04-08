import { Question } from "@/@types"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components"
import { useModalsStore } from "@/hooks"
import { EyeOff } from "lucide-react"

export const HideQuestionAction = (question: Pick<Question, "id">) => {
  const { setModalHideQuestionData } = useModalsStore()

  return (
    <Tooltip>
      <TooltipTrigger>
        <EyeOff
          className="lg:h-4.5 lg:w-4.5 h-4 w-4 rotate-180 text-slate-800 duration-100 hover:text-slate-300 dark:text-slate-400"
          onClick={() => {
            setModalHideQuestionData({ questionId: question.id, isOpen: true })
          }}
        />
      </TooltipTrigger>
      <TooltipContent side="bottom" align="center" className="text-xs">
        Ocultar pergunta
      </TooltipContent>
    </Tooltip>
  )
}
