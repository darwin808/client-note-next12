/* eslint-disable react/jsx-key */
import React from "react"
import type { NextPage } from "next"
import Card from "../components/Card"
import Modal from "../components/Modal"
import { useNotes } from "../services/Notes"
import { Api } from "../services"
import { useSWRConfig } from "swr"
import Button from "../components/Button"

const Home: NextPage = () => {
  const { data, error, loading } = useNotes()
  const [modal, setmodal] = React.useState<boolean>(false)
  const [addmodal, setaddmodal] = React.useState<boolean>(false)
  const [modalData, setmodalData] = React.useState()
  const { mutate } = useSWRConfig()

  if (error) return <div>failed to load</div>
  if (loading) return <div>loading...</div>
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

  const handleClose = () => {
    setmodal(false)
    setaddmodal(false)
    setmodalData(undefined)
  }
  const handleSuccesPost = async () => {
    await mutate("/notes")
    handleClose()
  }

  const handleFailedPost = async () => {
    await mutate("/notes")
    handleClose()
  }

  const handleSuccesUpdate = async () => {
    await mutate("/notes")
    handleClose()
  }

  const handleFailedUpdate = async () => {
    await mutate("/notes")
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
    .map((e: any) => <Card data={e} onClick={() => handleOpenUpdateModal(e)} />)
  return (
    <div className="MainContainer ">
      <Modal isOpen={modal} onRequestClose={handleClose}>
        <Card data={modalData} onSubmit={handleUpdatePost} />
      </Modal>
      <Modal isOpen={addmodal} onRequestClose={handleClose}>
        <Card data={modalData} onSubmit={handleCreatePost} />
      </Modal>
      <h1 className="text-4xl py-4 ">Take Notes</h1>

      <Button onClick={handleOpenCreateModal}>ADD NOTE</Button>
      <div className="NoteContainer">{displayCards}</div>
    </div>
  )
}

export default Home
