/* eslint-disable camelcase */
import axios from "axios"
import React from "react"

const UPLOAD_PRESET = "oqfvmwef"
const CLOUD_NAME = "dqbxlaimb"

const UploadBtn = ({ picture, setpicture }: any) => {
  const [img, setimg] = React.useState("")
  const handleSuccessUpload = (response: any) => {
    setimg(response.data.secure_url)
  }

  const handleFailedUpload = (response: any) => {}

  const uploadFile = async (data: any) => {
    console.log(Object.values(data))

    const formData = new FormData()

    await Object.values(data).map(async (e: any) => {
      formData.append("file", e)
      formData.append("upload_preset", UPLOAD_PRESET)

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      )
      console.log(response)

      response.status === 200 && handleSuccessUpload(response)
      response.status !== 200 && handleFailedUpload(response)
    })
  }

  React.useEffect(() => {
    img && setpicture([...picture, img])
  }, [img])
  return (
    <div>
      <input multiple type="file" onChange={(e: any) => uploadFile(e.target.files)} />
      {/* <input type="text" value={image} onClick={() => navigator.clipboard.writeText(image)} /> */}
    </div>
  )
}

export default UploadBtn
