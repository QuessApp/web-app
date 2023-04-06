import { NavItem } from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    github: string
    feed: string
  }
}

export const siteConfig: SiteConfig = {
  name: "Quess",
  description: "Descubra o poder da curiosidade anônima com Quess.",
  mainNav: [
    {
      title: "Feed",
      href: "/",
    },
  ],
  links: {
    github: "https://github.com/shadcn/ui",
    feed: "/feed",
  },
}
