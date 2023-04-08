interface UserProviderProps {
  children: React.ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  return (
    <div className="text-left">
      <div className="flex items-center">{children}</div>
    </div>
  )
}
