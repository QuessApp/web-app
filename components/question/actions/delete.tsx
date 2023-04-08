import { Question } from "@/@types"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components"
import { useModalsStore } from "@/hooks"
import { Trash2 } from "lucide-react"

export const DeleteQuestionAction = (question: Pick<Question, "id">) => {
  const { setModalDeleteQuestionData } = useModalsStore()

  return (
    <Tooltip>
      <TooltipTrigger>
        <Trash2
          className="h-3.5 w-3.5 text-slate-800 duration-100 hover:text-slate-300 dark:text-slate-400 lg:h-4 lg:w-4"
          onClick={() => {
            setModalDeleteQuestionData({
              questionId: question.id,
              isOpen: true,
            })
          }}
        />
      </TooltipTrigger>
      <TooltipContent side="bottom" align="start" className="text-xs">
        Excluir pergunta permanentemente
      </TooltipContent>
    </Tooltip>
  )
}
