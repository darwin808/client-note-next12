import React from "react"
import { CardBody, ICard } from "../../types"

const Card = <T extends CardBody>({ data, onClick, onSubmit, modal }: ICard<T>) => {
  const [name, setname] = React.useState<string | undefined>(data?.name || "")
  const [message, setmessage] = React.useState<string | undefined>(data?.message || "")

  React.useEffect(() => {
    setname(data?.name)
    setmessage(data?.message)
  }, [data])

  return (
    <form
      action="submit"
      onSubmit={(e) => onSubmit({ name, message, id: data?.id || "", e })}
      className={`CardContainer px-4  py-4 ${!modal ? "bg-primary" : "bg-white"}`}
    >
      <div
        onClick={onClick}
        className={`
        ${!modal ? "bg-primary" : "bg-white"}
        mb-4 overflow-y-hidden px-2 overflow-x-hidden w-full h-full cursor-pointer`}
      >
        <input
          disabled={!modal}
          placeholder={name || "Your Name here...."}
          type="text"
          onChange={(e: any) => setname(e.target.value)}
          value={name}
          className="bg-tertiary  px-4 outline-none ring-1 focus:ring-2  ring-primary text-black  inset-2 my-2  w-full h-10 rounded-md transition-all cursor-pointer"
        />
        <textarea
          disabled={!modal}
          name=""
          id=""
          placeholder={message || "Your message here..."}
          cols={28}
          rows={10}
          value={message}
          onChange={(e: any) => setmessage(e.target.value)}
          className="bg-tertiary rounded-md outline-none ring-1 focus:ring-2 ring-primary text-black px-4 py-1 text-xl"
        />
      </div>
      {modal && (
        <button
          className="bg-primary py-1 rounded text-tertiary font-medium"
          onClick={(e) => onSubmit({ name, message, id: data?.id || "", e })}
        >
          Submit
        </button>
      )}
    </form>
  )
}

export default Card
