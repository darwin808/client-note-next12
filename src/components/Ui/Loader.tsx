import React from "react"
import Modal from "../Modal"
import Image from "next/image"
import loader from "../../assets/loader.svg"
const Loader = () => {
  return (
    <Modal isOpen={true} onRequestClose={() => {}}>
      <Image src={loader} alt="Picture of the author" width={100} height={100} />
    </Modal>
  )
}

export default Loader
