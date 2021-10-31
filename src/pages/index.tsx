/* eslint-disable react/jsx-key */
import React from "react"
import type { NextPage } from "next"
import Card from "../components/Card"
import Modal from "../components/Modal"
import { useNotes } from "../services/Notes"
import { Api } from "../services"

const Home: NextPage = () => {
  const { data, error, loading } = useNotes()
  const [modal, setmodal] = React.useState<boolean>(false)
  const [addmodal, setaddmodal] = React.useState<boolean>(false)
  const [modalData, setmodalData] = React.useState()

  const handleCreatePost = async ({ name, message }: any) => {
    const res = await Api.post("/notes", {
      name,
      message
    })
    res.status === 200 && console.log(res)
    res.status !== 200 && console.log(res)
  }
  const handleUpdatePost = async ({ name, message, id }: any) => {
    const res = await Api.patch(`/note/${id}`, {
      message
    })
    res.status === 200 && console.log(res)
    res.status !== 200 && console.log(res)
  }
  const handleEditModal = (data: any) => {
    setmodal(true)
    setmodalData(data)
  }
  const handleClose = () => {
    setmodal(false)
    setaddmodal(false)
    setmodalData(undefined)
  }
  const handleOpenAddModal = () => {
    setaddmodal(true)
    setmodalData(undefined)
  }
  if (error) return <div>failed to load</div>
  if (loading) return <div>loading...</div>

  const displayCards = data.map((e: any) => <Card data={e} onClick={() => handleEditModal(e)} />)

  return (
    <div className="bg-red-300 h-screen w-full ">
      <Modal isOpen={modal} onRequestClose={handleClose}>
        <Card data={modalData} onSubmit={handleUpdatePost} />
      </Modal>
      <Modal isOpen={addmodal} onRequestClose={handleClose}>
        <Card data={modalData} onSubmit={handleCreatePost} />
      </Modal>
      <h1>title</h1>

      <button onClick={handleOpenAddModal}>ADD NOTE</button>
      <div className="NoteContainer">{displayCards}</div>
    </div>
  )
}

export default Home
