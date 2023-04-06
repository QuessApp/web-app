import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components"
import { useModalsStore, useMutationHideQuestion } from "@/hooks"
import * as AlertDialog from "@radix-ui/react-alert-dialog"

export const HideQuestionModal = () => {
  const {
    isModalHideQuestionOpen,
    setIsModalHideQuestionOpen,
    modalHideQuestionData,
  } = useModalsStore()

  const { handleHideQuestion } = useMutationHideQuestion(
    modalHideQuestionData?.questionId
  )

  const handleClose = () => {
    setIsModalHideQuestionOpen(false)
  }

  return (
    <AlertDialog.Root open={isModalHideQuestionOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] flex max-h-[85vh] w-[90vw] max-w-[650px] translate-x-[-50%] translate-y-[-50%] flex-col gap-4 rounded-[6px] bg-white p-[25px] text-left shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none sm:text-left">
          <AlertDialog.Title className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Ocultar pergunta?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-sm text-slate-500 dark:text-slate-400">
            A pergunta não será deletada permanentemente, mas ficará oculta para
            você. Para que você possa vê-la novamente, você precisará
            desocultá-la.
          </AlertDialog.Description>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleClose}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  await handleHideQuestion()
                  handleClose()
                }}
              >
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
