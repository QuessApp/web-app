import { useEffect } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import type { Question as QuestionProps } from "@/@types"
import { Container, Layout, Question, Separator } from "@/components"
import { useQuestionStore } from "@/hooks"
import { getQuestionByID } from "@/infra"
import { useTranslation } from "react-i18next"

export interface QuestionPageProps {
  question: QuestionProps
}

export default function QuestionPage({ question }: QuestionPageProps) {
  const {
    setIsReplyModalOpen,
    setQuestion,
    question: data,
  } = useQuestionStore()

  const { t } = useTranslation()

  useEffect(() => {
    setQuestion(question)
  }, [question, setQuestion])

  const handleOpenModal = () => {
    setIsReplyModalOpen(true)
  }

  const repliedQuestionData = data
  const isQuestionReplied = data?.isReplied ?? question?.isReplied
  const repliedQuestionContent = data?.reply ?? question?.reply
  const repliedDate = data?.repliedAt ?? question?.repliedAt

  return (
    <Layout>
      <Head>
        <title>Quess | Question</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="mx-auto flex w-full flex-col items-center">
          <Question {...question} />
        </div>

        {isQuestionReplied && !!repliedQuestionContent && (
          <>
            <Separator />

            <div className="block w-full text-left text-sm font-semibold">
              <span>Você respondeu</span>
            </div>
            <Question
              {...repliedQuestionData}
              content={repliedQuestionContent}
              createdAt={repliedDate}
            />
          </>
        )}
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  )

  const id = query.id as unknown as string
  const token = req.cookies.access_token as string

  const data = await getQuestionByID(id, token)

  if (!id || !data?.data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { question: data?.data || null },
  }
}
