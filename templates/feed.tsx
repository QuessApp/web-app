import Head from "next/head"

import { Container, Feed, FeedTabs, Layout, Sidebar } from "@/components"

export const FeedTemplate = () => {
  return (
    <Layout>
      <Head>
        <title>Quess | Feed</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="flex items-start justify-center gap-6 xl:justify-start">
          <Sidebar />

          <div className="w-full max-w-[650px]">
            <FeedTabs />
            <Feed />
          </div>
        </div>
      </Container>
    </Layout>
  )
}
