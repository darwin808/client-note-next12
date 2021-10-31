import type { NextPage } from "next"
import Card from "../components/Card"

const Home: NextPage = () => {
  return (
    <div className="bg-red-300 h-screen w-full ">
      <h1>title</h1>

      <div className="NoteContainer">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

export default Home
