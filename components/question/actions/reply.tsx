import { useModalsStore } from "@/hooks"
import { Reply } from "lucide-react"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui"

export const ReplyQuestionAction = () => {
  const {} = useModalsStore()

  return (
    <Tooltip>
      <TooltipTrigger>
        <Reply className="h-4 w-4 rotate-180 text-slate-800 duration-100 hover:text-slate-300 dark:text-slate-400 lg:h-[18px] lg:w-[18px]" />
      </TooltipTrigger>
      <TooltipContent side="bottom" align="start" className="text-xs">
        Responder pergunta
      </TooltipContent>
    </Tooltip>
  )
}
