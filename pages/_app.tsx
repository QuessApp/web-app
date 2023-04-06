import type { AppProps } from "next/app"
import { Inter as FontSans } from "next/font/google"

import { ModalsProvider } from "@/components"
import { queryClient } from "@/lib"
import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner"

import "@/styles/globals.css"

import { QueryClientProvider } from "@tanstack/react-query"

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
        <Toaster position="bottom-center" />
        <QueryClientProvider client={queryClient}>
          <ModalsProvider>
            <Component {...pageProps} />
          </ModalsProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}
