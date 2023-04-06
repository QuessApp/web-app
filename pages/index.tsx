import Head from "next/head"
import Link from "next/link"

import { Container, Layout, buttonVariants } from "@/components"

import { siteConfig } from "@/config/site"

export default function IndexPage() {
  return (
    <Layout siteHeader>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div className="flex flex-col gap-4 lg:gap-6">
          <h1 className="text-left text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-center lg:text-6xl">
            Descubra o poder da curiosidade anônima com Quess
          </h1>
          <p className="block max-w-[700px] text-left  text-lg text-slate-700 dark:text-slate-400 sm:text-xl lg:mx-auto lg:text-center">
            Envie perguntas anônimas para seus amigos e descubra o que eles
            realmente pensam sobre você.
          </p>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 md:flex-row lg:justify-center">
            <Link
              href={siteConfig.links.feed}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "lg" })}
            >
              Envie perguntas
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.github}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Saiba mais
            </Link>
          </div>

          <div>
            <p className="text-left text-sm text-slate-500 dark:text-slate-400 lg:text-center">
              You are looking at an early preview. You can follow the progress
              on{" "}
              <a
                className="font-medium underline underline-offset-4"
                href="https://github.com/QuessApp"
              >
                Github
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
