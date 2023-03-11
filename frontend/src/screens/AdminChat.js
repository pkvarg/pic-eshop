import React, { useEffect, useState, useRef } from 'react'
import { useStateContext } from '../context/StateContext'
import io from 'socket.io-client'
import ChatAdmin from '../components/ChatAdmin'

const AdminChat = () => {
  const socket = useRef()
  socket.current = io('http://localhost:8900')

  const [username, setUsername] = useState('Admin')
  const [showChat, setShowChat] = useState(false)
  const { chatButton, setChatButton } = useStateContext()

  let mySocketId
  // useEffect(() => {
  //   socket.current = io('ws://localhost:8900')
  //   // socket.current.on('getMessage', (data) => {
  //   //   console.log(data)

  //   // })
  //   console.log(socket.current.id)
  //   //mySocketId
  // }, [])

  let customers = []

  console.log('mSid:', mySocketId)

  // useEffect(() => {
  //   socket.current.on('getUsers', (users) => {
  //     users.map((user) => {
  //       if (user.username === 'Admin') return (mySocketId = user.socketId)
  //     })
  //     console.log('AchUsrs:', mySocketId)
  //   })
  //   //socket.current = io('http://localhost:8900')
  //   // socket.current.on('getUsers', (users) => {
  //   //   customers = users
  //   //   customers.forEach((element) => {
  //   //     console.log(element)
  //   //   })
  //   //   console.log(customers)
  //   // })
  // }, [])

  const joinChat = () => {
    socket.current = io('http://localhost:8900')
    socket.current.emit('addUser', username)
    setShowChat(true)
  }

  const closeChat = () => {
    setChatButton(true)
    setShowChat(false)
  }
  return (
    <>
      <h1 className='bg-red h-[70vh]'>ADMIN CHAT</h1>

      <div className='Socket'>
        {!showChat ? (
          <>
            <div className='joinChatContainer'>
              {/* <input
                type='text'
                placeholder='Meno...'
                onChange={(event) => {
                  setUsername(event.target.value)
                }}
              /> */}

              <div className='flex flex-row'>
                <button onClick={joinChat} className='enter'>
                  Vstúpiť
                </button>
                <button className='exit' onClick={() => closeChat()}>
                  X
                </button>
              </div>
            </div>
          </>
        ) : (
          <ChatAdmin
            sckt={(socket.current = io('http://localhost:8900'))}
            username={username}
            mySocketId={mySocketId}
            customers={customers}
            setChatButton={setChatButton}
            setShowChat={setShowChat}
          />
        )}
      </div>
    </>
  )
}

export default AdminChat
