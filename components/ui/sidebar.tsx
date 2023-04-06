import { useRouter } from "next/router"

import {
  Bell,
  Flag,
  LayoutGrid,
  LogOut,
  PlusCircle,
  Settings,
  Slash,
  User,
} from "lucide-react"

import { Button } from "./button"
import { Logo } from "./logo"

export const Sidebar = () => {
  const { asPath, replace, push } = useRouter()

  const items = [
    {
      section: "Acessos Rápidos",
      items: [
        {
          name: "Feed",
          icon: <LayoutGrid className="mr-2 h-4 w-4" />,
          href: "/feed",
        },
        {
          name: "Perguntar",
          icon: <PlusCircle className="mr-2 h-4 w-4" />,
          href: "/send",
        },
        {
          name: "Notificações",
          icon: <Bell className="mr-2 h-4 w-4" />,
          href: "/notifications",
        },
        {
          name: "Perfil",
          icon: <User className="mr-2 h-4 w-4" />,
          href: "/user/httpscaio",
        },
        {
          name: "Configurações",
          icon: <Settings className="mr-2 h-4 w-4" />,
          href: "/settings",
        },
      ],
    },
    {
      section: "Outros",
      items: [
        {
          name: "Bloqueios",
          icon: <Slash className="mr-2 h-4 w-4" />,
          href: "/blocks",
        },
        {
          name: "Denúncias",
          icon: <Flag className="mr-2 h-4 w-4" />,
          href: "/reports",
        },
        {
          name: "Sair",
          icon: <LogOut className="mr-2 h-4 w-4" />,
          handler: () => {
            replace("/")
          },
        },
      ],
    },
  ]

  return (
    <aside className="hidden max-w-xs pb-12 lg:block">
      <div className="px-8 pb-6">
        <p className="flex items-center gap-2 text-xl font-semibold tracking-tight">
          <Logo width={20} />
          Quess
        </p>
      </div>
      <div className="space-y-4">
        {items.map(({ section, items }) => (
          <div key={section} className="px-6 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              {section}
            </h2>
            <div className="space-y-1">
              {items.map(({ name, icon, href = "", handler }) => (
                <Button
                  key={name}
                  variant={asPath === href ? "subtle" : "ghost"}
                  onClick={() => {
                    typeof handler === "function" && handler()
                    !!href && push(href)
                  }}
                  size="sm"
                  className="w-full justify-start"
                >
                  {icon}
                  <span className="text-base">{name}</span>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
