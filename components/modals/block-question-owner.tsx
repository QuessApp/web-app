import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components"
import { useModalsStore, useMutationBlockUser } from "@/hooks"
import * as AlertDialog from "@radix-ui/react-alert-dialog"

export const BlockQuestionOwnerModal = () => {
  const {
    isModalBlockOwnerQuestionOpen,
    setIsModalBlockOwnerQuestionOpen,
    modalBlockOwnerQuestionData,
  } = useModalsStore()

  const { handleBlock } = useMutationBlockUser(
    modalBlockOwnerQuestionData?.questionOwnerId,
    modalBlockOwnerQuestionData?.questionId
  )

  const handleClose = () => {
    setIsModalBlockOwnerQuestionOpen(false)
  }

  const isBlocking = modalBlockOwnerQuestionData?.isLoading || false

  return (
    <AlertDialog.Root open={isModalBlockOwnerQuestionOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] flex max-h-[85vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] flex-col gap-4 rounded-[6px] bg-white p-[25px] text-left shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none dark:bg-slate-900 sm:max-w-[550px] sm:text-left">
          <AlertDialog.Title className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Bloquear remetente?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-sm text-slate-500 dark:text-slate-400">
            O remetente não poderá mais enviar perguntas para você. Você pode
            desbloquear o remetente a qualquer momento.
          </AlertDialog.Description>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleClose} disabled={isBlocking}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={isBlocking}
                onClick={async () => {
                  await handleBlock()
                  handleClose()
                }}
              >
                {isBlocking ? "Bloqueando..." : "Confirmar"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
