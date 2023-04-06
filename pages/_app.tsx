import type { AppProps } from "next/app"
import { Inter as FontSans } from "next/font/google"

import { queryClient } from "@/lib"
import { ThemeProvider } from "next-themes"
import NextNProgress from "nextjs-progressbar"
import { Toaster } from "sonner"

import "@/styles/globals.css"

import dynamic from "next/dynamic"

import { QueryClientProvider } from "@tanstack/react-query"

const LazyModalsProvider = dynamic(
  () => import("@/components/modals/provider").then((c) => c.ModalsProvider),
  {
    ssr: false,
  }
)

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
			}`}</style>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextNProgress
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <Toaster position="bottom-center" />
        <QueryClientProvider client={queryClient}>
          <LazyModalsProvider />
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}
