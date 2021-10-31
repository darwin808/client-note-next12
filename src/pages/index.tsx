/* eslint-disable react/jsx-key */
import React from "react"
import type { NextPage } from "next"
import Card from "../components/Card"
import Modal from "../components/Modal"
import { useNotes } from "../services/Notes"
import { Api } from "../services"
import { useSWRConfig } from "swr"

const Home: NextPage = () => {
  const { data, error, loading } = useNotes()
  const [modal, setmodal] = React.useState<boolean>(false)
  const [addmodal, setaddmodal] = React.useState<boolean>(false)
  const [modalData, setmodalData] = React.useState()
  const { mutate } = useSWRConfig()

  const handleCreatePost = async ({ name, message }: any) => {
    const res = await Api.post("/notes", {
      name,
      message
    })
    res.status === 200 && handleSuccesPost()
    res.status !== 200 && handleFailedPost()
  }
  const handleUpdatePost = async ({ name, message, id }: any) => {
    const res = await Api.patch(`/note/${id}`, {
      message
    })
    res.status === 200 && handleSuccesUpdate()
    res.status !== 200 && handleFailedUpdate()
  }
  const handleSuccesPost = async () => {
    await mutate("/notes")
  }
  const handleFailedPost = async () => {
    await mutate("/notes")
  }
  const handleSuccesUpdate = async () => {
    await mutate("/notes")
  }
  const handleFailedUpdate = async () => {
    await mutate("/notes")
  }

  const handleOpenUpdateModal = (data: any) => {
    setmodal(true)
    setmodalData(data)
  }
  const handleOpenCreateModal = () => {
    setaddmodal(true)
    setmodalData(undefined)
  }
  const handleClose = () => {
    setmodal(false)
    setaddmodal(false)
    setmodalData(undefined)
  }

  if (error) return <div>failed to load</div>
  if (loading) return <div>loading...</div>

  const displayCards = data.map((e: any) => (
    <Card data={e} onClick={() => handleOpenUpdateModal(e)} />
  ))

  return (
    <div className="MainContainer">
      <Modal isOpen={modal} onRequestClose={handleClose}>
        <Card data={modalData} onSubmit={handleUpdatePost} />
      </Modal>
      <Modal isOpen={addmodal} onRequestClose={handleClose}>
        <Card data={modalData} onSubmit={handleCreatePost} />
      </Modal>
      <h1>title</h1>

      <button onClick={handleOpenCreateModal}>ADD NOTE</button>
      <div className="NoteContainer">{displayCards}</div>
    </div>
  )
}

export default Home
