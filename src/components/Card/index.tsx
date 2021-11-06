/* eslint-disable react/jsx-key */
import React from "react"
import { CardBody, ICard } from "../../types"
import UploadBtn from "../Button/UploadBtn"

const Card = <T extends CardBody>({
  title,
  data,
  onClick,
  onSubmit,
  modal,
  setisLoading
}: ICard<T>) => {
  const [userName, setuserName] = React.useState<string | undefined>(data?.userName || "")
  const [message, setmessage] = React.useState<string | undefined>(data?.message || "")
  const [picture, setpicture] = React.useState<any[]>([])

  React.useEffect(() => {
    setuserName(data?.userName)
    setmessage(data?.message)
  }, [data])

  const showButton = modal && (
    <button
      className="CardBtn"
      onClick={(e) => onSubmit({ userName, message, picture, id: data?.id || "", e })}
    >
      Submit
    </button>
  )
  const showUpload = modal && (
    <UploadBtn setisLoading={setisLoading} picture={picture} setpicture={setpicture} />
  )

  const showpictures = data?.picture?.map((e: any) => (
    <input
      className="InputMain"
      type="text"
      defaultValue={e}
      onClick={() => navigator.clipboard.writeText(e)}
    />
  ))
  React.useEffect(() => {
    console.log(picture, "datr")
    console.log(data)
  }, [picture])
  return (
    <form
      action="submit"
      onSubmit={(e) => onSubmit({ userName, message, picture, id: data?.id || "", e })}
      className={`CardContainer ${!modal ? "bg-primary" : "bg-white"}`}
    >
      <div className="text-center">{title}</div>
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

        {showUpload}
      </div>
      {showpictures}
      {showButton}
    </form>
  )
}

export default Card
