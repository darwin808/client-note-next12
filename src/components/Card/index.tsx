import React from "react"

const Card = ({ data, onClick, onSubmit }: any) => {
  const [name, setname] = React.useState<string | undefined>(data?.name)
  const [message, setmessage] = React.useState<string | undefined>(data?.message)

  return (
    <div className="CardContainer">
      <div onClick={onClick} className="w-full h-full">
        <input
          placeholder={name}
          type="text"
          onChange={(e: any) => setname(e.target.value)}
          value={name}
        />
        <textarea
          name=""
          id=""
          cols={40}
          rows={10}
          value={message}
          onChange={(e: any) => setmessage(e.target.value)}
        />
      </div>

      <button onClick={() => onSubmit({ name, message, id: data?.id })}>SUbmit</button>
    </div>
  )
}

export default Card
