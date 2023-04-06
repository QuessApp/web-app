import { useMutationSendQuestion } from "@/hooks"
import { useState } from "react"

export const useSendQuestion = () => {
  const [sendTo, setSendTo] = useState("")
  const [content, setContent] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(true)

  const { handleSend, ...rest } = useMutationSendQuestion(
    sendTo,
    content,
    isAnonymous
  )

  const handleSendQuestion = async () => {
    await handleSend()
    setSendTo("")
    setContent("")
  }

  return {
    handleSendQuestion,
    sendTo,
    content,
    isAnonymous,
    setSendTo,
    setContent,
    setIsAnonymous,
    ...rest,
  }
}
