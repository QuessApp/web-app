import { useCallback, useEffect, useState } from "react"

import { useRouter } from "next/router"

import { useGetAuthenticatedUser, useUserStore } from "@/hooks"
import { mainAppAdapter } from "@/infra"
import { customAPIError } from "@/utils"
import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { toast } from "sonner"

export const useAuth = () => {
  const [keepConnected, setKeepConnected] = useState(false)
  const { setIsLoggedIn, setUser, ...auth } = useUserStore()

  const { push } = useRouter()

  const { data, refetch } = useGetAuthenticatedUser()

  const handleLogOut = useCallback(async () => {
    setUser(null)
    setIsLoggedIn(false)
    Cookies.remove("access_token")
    push("/signin")
  }, [])

  const { mutateAsync, ...rest } = useMutation({
    onError: (error) => {
      const { message } = customAPIError(error)
      toast.error(message)
    },
    onSuccess: ({ data }) => {
      Cookies.set("access_token", data.data.accessToken)
      push("/")
    },
    mutationFn: async () => mainAppAdapter.post("/auth/signin", {}),
  })

  useEffect(() => {
    ;(async () => {
      if (Cookies.get("access_token")) {
        try {
          // await refetch();

          if (data?.user) {
            setUser(data?.user)
          }
        } catch (err) {
          handleLogOut()
        }
      } else {
        setIsLoggedIn(false)
      }
    })()
  }, [])

  const handleSignIn = useCallback(async () => {
    await mutateAsync()
  }, [])

  const handleSignUp = useCallback(async () => {}, [])

  return {
    keepConnected,
    setKeepConnected,
    handleSignIn,
    handleSignUp,
    handleLogOut,
    ...rest,
    ...auth,
  }
}
