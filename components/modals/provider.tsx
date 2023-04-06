import dynamic from "next/dynamic"

const HideQuestionModal = dynamic(() =>
  import("./hide-question").then((c) => c.HideQuestionModal)
)

const BlockQuestionOwnerModal = dynamic(() =>
  import("./block-question-owner").then((c) => c.BlockQuestionOwnerModal)
)

const DeleteQuestionModal = dynamic(() =>
  import("./delete-question").then((c) => c.DeleteQuestionModal)
)

const SendQuestionModal = dynamic(() =>
  import("./send-question").then((c) => c.SendQuestionModal)
)

export const ModalsProvider = () => {
  return (
    <>
      <HideQuestionModal />
      <BlockQuestionOwnerModal />
      <DeleteQuestionModal />
      <SendQuestionModal />
    </>
  )
}
