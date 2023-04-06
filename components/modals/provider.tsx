import {
  BlockQuestionOwnerModal,
  DeleteQuestionModal,
  HideQuestionModal,
} from "@/components"

interface ModalsProviderProps {
  children: React.ReactNode
}

export const ModalsProvider = ({ children }: ModalsProviderProps) => {
  return (
    <>
      <HideQuestionModal />
      <BlockQuestionOwnerModal />
      <DeleteQuestionModal />
      {children}
    </>
  )
}
