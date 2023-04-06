import { useRouter } from "next/router"

import { Button } from "@/components"
import { useFeedStore } from "@/hooks"
import { Ghost } from "lucide-react"

export const FeedEmpty = () => {
  const { push } = useRouter()
  const { filter } = useFeedStore()

  const shouldChangeText = filter === "all" || filter === "replied"

  const title = shouldChangeText
    ? "Nenhuma pergunta, ainda."
    : "Nenhuma pergunta enviada"

  const subtitle = shouldChangeText ? (
    <>
      Compartilhe seu perfil com seus amigos <br className="hidden sm:block" />{" "}
      para que eles possam enviar perguntas anônimas para você.
    </>
  ) : (
    <>
      Que tal saber se aquela pessoa que você gosta gosta de você também?{" "}
      <br className="hidden sm:block" /> Envie uma pergunta anônima para ela ou
      para seus amigos.
    </>
  )

  const button = shouldChangeText
    ? "Compartilhar meu perfil"
    : "Enviar uma pergunta"

  return (
    <div className="flex h-[300px] w-full max-w-[650px] shrink-0 items-center justify-center rounded-md border border-dashed border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800 lg:h-[350px]">
      <div className="mx-auto flex flex-col items-center justify-center gap-0 px-4 text-center md:gap-2">
        <Ghost className="h-12 w-12 text-slate-400" />
        <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
          {title}
        </h3>
        <p className="mb-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
        <Button
          className="h-11 px-8"
          onClick={() => (shouldChangeText ? undefined : push("/send"))}
        >
          {button}
        </Button>
      </div>
    </div>
  )
}
