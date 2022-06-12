/* eslint-disable react/jsx-key */
import React from "react"
import type { NextPage } from "next"
import Card from "../components/Card"
import Modal from "../components/Modal"
import { useNotes } from "../services/Notes"
import { Api } from "../services"
import { useSWRConfig } from "swr"
import Button from "../components/Button"
import { ICreatePost, IUpdatePost } from "../types"
import { UI } from "../components/Ui"

const Home: NextPage = () => {
  const { data, error, loading } = useNotes()
  const [modal, setmodal] = React.useState<boolean>(false)
  const [addmodal, setaddmodal] = React.useState<boolean>(false)
  const [modalData, setmodalData] = React.useState()
  const { mutate } = useSWRConfig()
  const [isLoading, setisLoading] = React.useState<boolean>(false)

  if (error) return <div>failed to load</div>
  if (loading) return <UI.Loader />

  const handleCreatePost = async ({ userName, message, picture, e }: ICreatePost) => {
    e?.preventDefault()
    setisLoading(true)
    const res = await Api.post("/notes", {
      userName,
      message,
      picture
    })
    res.status === 200 && handleSuccesPost()
    res.status !== 200 && handleFailedPost()
  }

  const handleUpdatePost = async ({ userName, message, picture, id, e }: IUpdatePost) => {
    e?.preventDefault()
    setisLoading(true)
    const res = await Api.put(`/note/${id}`, {
      message,
      userName,
      picture
    })
    res.status === 200 && handleSuccesUpdate()
    res.status !== 200 && handleFailedUpdate()
  }

  const handleClose = () => {
    setmodal(false)
    setaddmodal(false)
    setmodalData(undefined)
  }
  const handleSuccesPost = async () => {
    await mutate("/notes")
    await setisLoading(false)
    handleClose()
  }

  const handleFailedPost = async () => {
    await mutate("/notes")
    await setisLoading(false)
    handleClose()
  }

  const handleSuccesUpdate = async () => {
    await mutate("/notes")
    await setisLoading(false)
    handleClose()
  }

  const handleFailedUpdate = async () => {
    await mutate("/notes")
    await setisLoading(false)
    handleClose()
  }

  const handleOpenUpdateModal = (data: any) => {
    setmodal(true)
    setmodalData(data)
  }

  const handleOpenCreateModal = () => {
    setaddmodal(true)
    setmodalData(undefined)
  }

  const displayCards = data
    .sort(function compare(a: any, b: any) {
      const dateA: any = new Date(a.createdAt)
      const dateB: any = new Date(b.createdAt)
      const sortedByCreatedAt = dateB - dateA
      return sortedByCreatedAt
    })
    .map((e: any) => (
      <Card
        title=""
        onSubmit={() => {}}
        data={e}
        modal={false}
        onClick={() => handleOpenUpdateModal(e)}
      />
    ))

  const showLoading = isLoading && <UI.Loader />

  const today = new Date()
  const dayToday = today.getDay()
  const switchBgColor = (day: number) => {
    switch (day) {
      case 0:
        return "bg-red-300"
      case 1:
        return "bg-yellow-300"
      case 2:
        return "bg-pink-300"
      case 3:
        return "bg-green-300"
      case 4:
        return "bg-orange-300"
      case 5:
        return "bg-blue-300"
      case 6:
        return "bg-purple-300"
      default:
        return "bg-red-300"
    }
  }
  const todayBg = switchBgColor(dayToday)

  return (
    <div className={`MainContainer   ${todayBg}`}>
      {showLoading}
      <Modal isOpen={modal} onRequestClose={handleClose}>
        <Card
          setisLoading={setisLoading}
          title="Update Note"
          modal={modal}
          data={modalData}
          onSubmit={handleUpdatePost}
        />
      </Modal>
      <Modal isOpen={addmodal} onRequestClose={handleClose}>
        <Card
          setisLoading={setisLoading}
          title="Create a note"
          data={modalData}
          modal={addmodal}
          onSubmit={handleCreatePost}
        />
      </Modal>
      <h1 className="MainHeader">Take Notes</h1>

      <Button onClick={handleOpenCreateModal}>
        <span className="font-bold text-xl">Create a Note</span>
      </Button>
      <div className={`NoteContainer  ${todayBg}`}>{displayCards}</div>
    </div>
  )
}

export default Home
