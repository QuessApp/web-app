import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components"
import { useModalsStore, useMutationDeleteQuestion } from "@/hooks"
import * as AlertDialog from "@radix-ui/react-alert-dialog"

export const DeleteQuestionModal = () => {
  const {
    isModalDeleteQuestionOpen,
    setIsModalDeleteQuestionOpen,
    modalDeleteQuestionData,
  } = useModalsStore()

  const { handleDelete } = useMutationDeleteQuestion(
    modalDeleteQuestionData?.questionId
  )

  const handleClose = () => {
    setIsModalDeleteQuestionOpen(false)
  }

  return (
    <AlertDialog.Root open={isModalDeleteQuestionOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] flex max-h-[85vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] flex-col gap-4 rounded-[6px] bg-white p-[25px] text-left shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none dark:bg-slate-900 sm:max-w-[550px] sm:text-left">
          <AlertDialog.Title className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Excluir pergunta?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-sm text-slate-500 dark:text-slate-400">
            Esta ação é irreversível. Uma vez que a pergunta for excluída, ela
            não poderá ser recuperada.
          </AlertDialog.Description>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleClose}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 text-white hover:bg-red-600 focus:ring-red-600"
                onClick={async () => {
                  await handleDelete()
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
