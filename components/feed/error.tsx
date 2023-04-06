import { ServerCrash } from "lucide-react"

export const FeedError = () => {
  return (
    <div className="flex h-[300px] w-full max-w-[650px] shrink-0 items-center justify-center rounded-md border border-dashed border-slate-200 dark:border-slate-700 lg:h-[350px]">
      <div className="mx-auto flex flex-col items-center justify-center gap-0 px-4 text-center md:gap-2">
        <ServerCrash className="h-12 w-12 text-slate-400" />
        <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
          Mexemos em algo e deu ruim!
        </h3>
        <p className="mb-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
          Algo deu errado e não conseguimos carregar o feed. Já recebemos um
          alerta e estamos trabalhando para resolver o problema.
        </p>
      </div>
    </div>
  )
}
