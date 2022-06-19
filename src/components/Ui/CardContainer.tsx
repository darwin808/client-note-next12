/* eslint-disable react/jsx-key */
import Card from "components/Card"
import React, { useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

interface Props {
  data: any
  handleOpenUpdateModal: any
}

export const CardContainer = ({ data = [], handleOpenUpdateModal }: Props) => {
  const [count, setcount] = useState(9)
  const [collectect, setcollectect] = useState([])
  //   const collection = data.slice(0, count)
  const fetchData = () => {
    setcount(count + 3)
  }
  useEffect(() => {
    setcollectect(data.slice(0, count))
  }, [count, data])

  return (
    <div className=" overflow-auto min-h-screen">
      <InfiniteScroll
        dataLength={collectect?.length}
        next={fetchData}
        hasMore={true}
        loader={<h4 className="">Loading...</h4>}
        className="NoteContainer"
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {collectect
          ?.sort(function compare(a: any, b: any) {
            const dateA: any = new Date(a.createdAt)
            const dateB: any = new Date(b.createdAt)
            const sortedByCreatedAt = dateB - dateA
            return sortedByCreatedAt
          })
          ?.map((e: any) => {
            return (
              <div className="">
                <Card
                  title=""
                  onSubmit={() => {}}
                  data={e}
                  modal={false}
                  onClick={() => handleOpenUpdateModal(e)}
                />
              </div>
            )
          })}
      </InfiniteScroll>
    </div>
  )
}
