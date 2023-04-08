import { Question } from "@/@types"
import { copyToClipboard } from "@/utils"
import { Link2 } from "lucide-react"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui"

export const CopyQuestionLinkAction = (question: Pick<Question, "id">) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Link2
          className="lg:h-4.5 lg:w-4.5 h-4 w-4 rotate-180 text-slate-800 duration-100 hover:text-slate-300 dark:text-slate-400"
          onClick={() => {
            copyToClipboard(`${window.location.host}/question/${question.id}`)
          }}
        />
      </TooltipTrigger>
      <TooltipContent side="bottom" align="end" className="text-xs">
        Copiar link da pergunta
      </TooltipContent>
    </Tooltip>
  )
}
