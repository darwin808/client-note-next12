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

  const handleCreatePost = async ({ userName, message, e }: ICreatePost) => {
    e.preventDefault()
    setisLoading(true)
    const res = await Api.post("/notes", {
      userName,
      message
    })
    res.status === 200 && handleSuccesPost()
    res.status !== 200 && handleFailedPost()
  }

  const handleUpdatePost = async ({ userName, message, id, e }: IUpdatePost) => {
    e.preventDefault()
    setisLoading(true)
    const res = await Api.patch(`/note/${id}`, {
      message,
      userName
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

  return (
    <div className="MainContainer ">
      {showLoading}
      <Modal isOpen={modal} onRequestClose={handleClose}>
        <Card title="Update Note" modal={modal} data={modalData} onSubmit={handleUpdatePost} />
      </Modal>
      <Modal isOpen={addmodal} onRequestClose={handleClose}>
        <Card title="Create a note" data={modalData} modal={addmodal} onSubmit={handleCreatePost} />
      </Modal>
      <h1 className="MainHeader">Take Notes</h1>

      <Button onClick={handleOpenCreateModal}>Create a Note </Button>
      <div className="NoteContainer">{displayCards}</div>
    </div>
  )
}

export default Home
