import { Question } from "@/@types"
import {
  QuestionDropdown,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components"
import { useModalsStore } from "@/hooks"
import { copyToClipboard } from "@/utils"
import { EyeOff, Link2, Reply } from "lucide-react"

export interface QuestionActionsProps {
  question: Question
}

export const QuestionActions = ({ question }: QuestionActionsProps) => {
  const { setModalHideQuestionData, setIsModalHideQuestionOpen } =
    useModalsStore()

  return (
    <div className="flex items-center justify-between gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Reply className="h-4 w-4 rotate-180 text-slate-800 duration-100 hover:text-slate-300 lg:h-5 lg:w-5" />
          </TooltipTrigger>
          <TooltipContent side="bottom" align="start" className="text-xs">
            Responder pergunta
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <EyeOff
              className="lg:h-4.5 lg:w-4.5 h-4 w-4 rotate-180 text-slate-800 duration-100 hover:text-slate-300"
              onClick={() => {
                setModalHideQuestionData({ questionId: question.id })
                setIsModalHideQuestionOpen(true)
              }}
            />
          </TooltipTrigger>
          <TooltipContent side="bottom" align="center" className="text-xs">
            Ocultar pergunta
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Link2
              className="lg:h-4.5 lg:w-4.5 h-4 w-4 rotate-180 text-slate-800 duration-100 hover:text-slate-300"
              onClick={() => {
                copyToClipboard(
                  `${window.location.host}/question/${question.id}`
                )
              }}
            />
          </TooltipTrigger>
          <TooltipContent side="bottom" align="end" className="text-xs">
            Copiar link da pergunta
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <QuestionDropdown question={question} />
    </div>
  )
}
