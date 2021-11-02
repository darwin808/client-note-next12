import React from "react"
import { CardBody, ICard } from "../../types"

const Card = <T extends CardBody>({ data, onClick, onSubmit, modal }: ICard<T>) => {
  const [userName, setuserName] = React.useState<string | undefined>(data?.userName || "")
  const [message, setmessage] = React.useState<string | undefined>(data?.message || "")

  React.useEffect(() => {
    setuserName(data?.userName)
    setmessage(data?.message)
  }, [data])

  const showButton = modal && (
    <button
      className="CardBtn"
      onClick={(e) => onSubmit({ userName, message, id: data?.id || "", e })}
    >
      Submit
    </button>
  )
  return (
    <form
      action="submit"
      onSubmit={(e) => onSubmit({ userName, message, id: data?.id || "", e })}
      className={`CardContainer ${!modal ? "bg-primary" : "bg-white"}`}
    >
      <div
        onClick={onClick}
        className={`
        ${!modal ? "bg-primary" : "bg-white"}
       InputContainer`}
      >
        <input
          disabled={!modal}
          placeholder={userName || "Your Name here...."}
          type="text"
          onChange={(e: any) => setuserName(e.target.value)}
          value={userName}
          className="InputMain"
        />
        <textarea
          disabled={!modal}
          name=""
          id=""
          placeholder={message || "Your message here..."}
          cols={35}
          rows={10}
          value={message}
          onChange={(e: any) => setmessage(e.target.value)}
          className="TextAreaMain"
        />
      </div>
      {showButton}
    </form>
  )
}

export default Card
