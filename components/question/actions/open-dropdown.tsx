import { MoreHorizontal } from "lucide-react"

import {
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui"

export const OpenDropdownQuestionAction = () => {
  return (
    <DropdownMenuTrigger>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {/* TODO: remove this mt */}
            <MoreHorizontal className="mt-1.5 h-4 w-4 rotate-180 text-slate-800 duration-100 hover:text-slate-300 dark:text-slate-400 lg:h-5 lg:w-5" />
          </TooltipTrigger>
          <TooltipContent side="bottom" align="end" className=" text-xs">
            Ações
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </DropdownMenuTrigger>
  )
}
