import React from "react"

interface ContainerProps {
  children: React.ReactNode
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <section className="container grid gap-6 pb-8 pt-6 md:py-10">
      <div className="mx-auto flex w-full flex-col">{children}</div>
    </section>
  )
}
