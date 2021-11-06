/* eslint-disable camelcase */
import axios from "axios"
import React from "react"
import { CLOUD_NAME, UPLOAD_PRESET } from "../../constants"
import { IUploadBtn } from "../../types"

const UploadBtn = ({ setisLoading, picture, setpicture }: IUploadBtn) => {
  const [img, setimg] = React.useState("")
  const handleSuccessUpload = (response: any) => {
    setimg(response.data.secure_url)
    setisLoading(false)
  }

  const handleFailedUpload = (response: any) => {
    setisLoading(false)
  }

  const uploadFile = async (data: any) => {
    const formData = new FormData()

    await Object.values(data).map(async (e: any) => {
      setisLoading(true)

      formData.append("file", e)
      formData.append("upload_preset", UPLOAD_PRESET)

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      )

      response.status === 200 && handleSuccessUpload(response)
      response.status !== 200 && handleFailedUpload(response)
    })
  }

  React.useEffect(() => {
    img && setpicture([...picture, img])
  }, [img])
  return (
    <input className="" multiple type="file" onChange={(e: any) => uploadFile(e.target.files)} />
  )
}

export default UploadBtn
