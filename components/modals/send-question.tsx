import { useState } from "react"

import { useRouter } from "next/router"

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components"
import { cn } from "@/lib"
import * as AlertDialog from "@radix-ui/react-alert-dialog"
import { ChevronsUpDown } from "lucide-react"
import { useLocalStorage } from "usehooks-ts"

type User = {
  nick: string
  name: string
  avatar: string
}

const users: User[] = [
  {
    nick: "@caioaugustoo",
    name: "Caio Augusto",
    avatar: "https://avatars.githubusercontent.com/u/62035389?v=4",
  },
  {
    nick: "@janedoe",
    name: "Jane Doe",
    avatar: "https://avatars.githubusercontent.com/u/1234567?v=4",
  },
  {
    nick: "@david",
    name: "David",
    avatar: "https://avatars.githubusercontent.com/u/1234567?v=4",
  },
]

const UserItem = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-6 w-6">
        <AvatarImage src={user?.avatar} />
        <AvatarFallback>{user.nick.substring(0, 1)}</AvatarFallback>
      </Avatar>

      <div>
        {user.name} <span className="text-slate-500">- {user.nick}</span>
      </div>
    </div>
  )
}

const MAX_CHARS = 300

export const SendQuestionModal = () => {
  const [content, setContent] = useState("")
  const { pathname, query, push } = useRouter()
  const [disabledAnonymousWarning, setDisabledAnonymousWarning] =
    useLocalStorage("disabled-anonymous-warning", false)

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [value, setValue] = useState<User>(null)

  const [sendAsAnonymous, setSendAsAnonymous] = useState(true)

  const foundUser = users.find(
    (user) => user.name.toLowerCase() === search.toLowerCase()
  )

  const reachedMaxChars = content.length > MAX_CHARS
  const isButtonDisabled = !content || reachedMaxChars

  return (
    <AlertDialog.Root open={pathname === "/send"}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed bottom-0 left-[50%] top-[50%] flex h-[80vh] max-h-[85vh] w-full translate-x-[-50%] flex-col gap-4 rounded-2xl bg-white p-[25px] text-left shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none dark:bg-slate-900 sm:bottom-[unset] sm:h-[auto] sm:w-[90vw] sm:max-w-[550px] sm:translate-y-[-50%] sm:rounded-[6px] sm:text-left">
          <AlertDialog.Title className="text-center text-lg font-semibold text-slate-900 dark:text-slate-50 sm:text-left">
            Enviar pergunta
          </AlertDialog.Title>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="w-full">
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {value ? (
                  <UserItem user={foundUser} />
                ) : (
                  "Selecione um remetente"
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0">
              <Command className="w-[500px]">
                <CommandInput placeholder="Digite o nome de usuário" />
                <CommandEmpty>Nenhum usuário encontrado</CommandEmpty>
                <CommandGroup>
                  {users.map((user) => (
                    <CommandItem
                      key={user.nick}
                      className="flex gap-2"
                      onSelect={(currentValue) => {
                        setSearch(currentValue === search ? "" : currentValue)
                        setValue(user)
                        setOpen(false)
                      }}
                    >
                      <UserItem user={user} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <div>
            <Textarea
              placeholder="Digite aqui..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <p
              className={cn(
                "mt-2 text-right text-xs ",
                reachedMaxChars ? "text-red-500" : "text-slate-500"
              )}
            >
              {content.length}/{MAX_CHARS}
            </p>
          </div>

          <div className="flex items-center space-x-3 sm:mb-1">
            <Switch
              id="send-as-anonymous"
              checked={sendAsAnonymous}
              onClick={() => setSendAsAnonymous((p) => !p)}
            />
            <Label htmlFor="send-as-anonymous">
              Anônimo ({sendAsAnonymous ? "Sim" : "Não"})
            </Label>
          </div>

          {!sendAsAnonymous && !disabledAnonymousWarning && (
            <div className="rounded-md bg-amber-50 p-4">
              <p className="text-xs text-yellow-800">
                <b>Atenção!</b> Você está enviando uma pergunta de forma{" "}
                <b>não anônima</b>. <br />
                Isso significa que o usuário que você selecionou visualizará seu
                perfil. <br />{" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        onClick={() => setDisabledAnonymousWarning(true)}
                        variant="link"
                        className="h-fit p-0 text-xs text-yellow-800 underline"
                      >
                        Não exibir mais.
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      align="start"
                      className="text-xs"
                    >
                      Ocultar essa mensagem.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => push("/feed")}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction disabled={isButtonDisabled}>
                Enviar
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
