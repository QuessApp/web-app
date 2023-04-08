import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ProviderQuestionActionsProps,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components"
import { useQuestionDropdownActions } from "@/hooks"
import { MoreHorizontal } from "lucide-react"

export const QuestionDropdown = ({
  question,
  isQuestionOwner,
}: ProviderQuestionActionsProps) => {
  const actions = useQuestionDropdownActions({ question, isQuestionOwner })

  if (actions.length === 0) {
    return <div className="mt-1.5 h-4 w-4 lg:h-5 lg:w-5"></div>
  }

  return (
    <DropdownMenu>
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

      <DropdownMenuContent
        className="space-y-0.5 shadow-[hsl(206_22%_7%_/_10%)_0px_10px_38px_-10px,hsl(206_22%_7%_/10%)_0px_10px_20px_-15px]"
        side="bottom"
        align="end"
      >
        {actions.map(({ Icon, label, handler }) => (
          <DropdownMenuItem
            role="button"
            className="flex cursor-pointer gap-3 font-normal duration-100 hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800 lg:text-sm"
            key={label}
            onClick={async () => handler()}
          >
            <Icon className="h-3.5 w-3.5 text-slate-900 duration-100 dark:text-slate-400" />
            <span className="text-sm">{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
