import React, { FC } from "react"

interface IButton {
  onClick: (e: any) => void
  children: React.ReactNode
}
const Button: FC<IButton> = ({ onClick, children }) => {
  return (
    <button className="MainBtn " onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
