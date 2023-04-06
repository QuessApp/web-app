import { SiteHeader } from "@/components/site-header"

interface LayoutProps {
  children: React.ReactNode
  siteHeader?: boolean
}

export function Layout({ children, siteHeader = false }: LayoutProps) {
  return (
    <>
      {siteHeader && <SiteHeader />}
      <main>{children}</main>
    </>
  )
}
