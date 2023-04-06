import { Question } from "@/@types"
import { QuestionActionsProps } from "@/components"
import { useModalsStore } from "@/hooks"
import { Flag, Slash, Trash2 } from "lucide-react"

export const useQuestionDropdownActions = ({
  question,
}: QuestionActionsProps) => {
  const {
    setIsModalBlockOwnerQuestionOpen,
    setIsModalDeleteQuestionOpen,
    setModalDeleteQuestionData,
    setModalBlockOwnerQuestionData,
  } = useModalsStore()

  const isQuestionOnwer = false

  const { id: questionOwnerId, nick: questionOwnerNick } =
    question?.sentBy || {}

  const actions = isQuestionOnwer
    ? [
        {
          Icon: Trash2,
          label: "Excluir pergunta",
          handler: (question: Question) => {
            setModalDeleteQuestionData({ questionId: question.id })
            setIsModalDeleteQuestionOpen(true)
          },
        },
      ]
    : [
        {
          Icon: Slash,
          label: question.isAnonymous
            ? "Bloquear remetente"
            : `Bloquear ${questionOwnerNick}`,
          handler: () => {
            setModalBlockOwnerQuestionData({
              isLoading: false,
              questionOwnerId: questionOwnerId,
              questionId: question.id,
            })
            setIsModalBlockOwnerQuestionOpen(true)
          },
        },
        {
          Icon: Flag,
          label: "Denunciar pergunta",
        },
      ]

  return actions
}
