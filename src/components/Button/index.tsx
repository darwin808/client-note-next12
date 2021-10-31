import React, { FC } from "react"

interface IButton {
  onClick: (e: any) => void
  children: React.ReactNode
}
const Button: FC<IButton> = ({ onClick, children }) => {
  return (
    <button
      className=" py-2 bg-red-500 hover:bg-red-600 focus:bg-red-600  text-white text-lg rounded-full w-44 flex text-center items-center justify-center"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
