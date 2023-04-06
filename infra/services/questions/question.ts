import { Request } from "@/@types"
import { mainAPIAdapter } from "@/infra"
import { handleReq } from "@/utils"

import { GetQuestionByID, SendQuestion } from "./@types"

export const getQuestionByID = async (id: string, authToken: string) =>
  handleReq(
    mainAPIAdapter.get<Request<GetQuestionByID>>(`/questions/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
  )

export const replyQuestion = async (
  id: string,
  authToken: string,
  content: string
) =>
  handleReq(
    mainAPIAdapter.patch<Request<GetQuestionByID>>(
      `/questions/reply/${id}`,
      {
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
  )

export const hideQuestion = async (questionId: string, authToken: string) =>
  handleReq(
    mainAPIAdapter.patch<Request<null>>(
      `/questions/hide/${questionId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
  )

export const sendQuestionToAnUser = async (
  sendTo: string,
  content: string,
  isAnonymous: boolean,
  authToken: string
) =>
  handleReq(
    mainAPIAdapter.post<Request<SendQuestion>>(
      `/questions`,
      {
        sendTo,
        content,
        isAnonymous,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
  )

export const deleteQuestion = async (questionId: string, authToken: string) =>
  handleReq(
    mainAPIAdapter.delete<Request<null>>(`/questions/${questionId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
  )
