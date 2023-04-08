import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  OpenDropdownQuestionAction,
} from "@/components"
import { QuestionDropdownActions } from "@/hooks"

interface DropdownQuestionActionProps {
  actions: QuestionDropdownActions[]
}

export const DropdownQuestionAction = ({
  actions,
}: DropdownQuestionActionProps) => {
  return (
    <DropdownMenu>
      <OpenDropdownQuestionAction />

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
