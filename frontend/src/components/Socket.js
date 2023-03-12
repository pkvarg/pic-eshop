import React, { useState, useEffect, useRef } from 'react'
import { useStateContext } from '../context/StateContext'
import Chat from './Chat'
import { io } from 'socket.io-client'

const Socket = () => {
  const [username, setUsername] = useState('')
  const [showChat, setShowChat] = useState(false)
  const [arrivingMessage, setArrivingMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState(null)

  const { chatButton, setChatButton } = useStateContext()
  const socket = useRef()
  socket.current = io('ws://localhost:8900')

  // useEffect(() => {
  //   console.log('aaa')
  //   socket.current.on('getMessage', (data) => {
  //     console.log('data:', data)
  //     setArrivingMessage({
  //       author: data.author,
  //       message: data.message,
  //       time: data.time,
  //     })
  //   })
  // })

  useEffect(() => {
    socket.current.emit('addUser', username)
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(users)
    })
  }, [])

  console.log('online:', onlineUsers)

  const joinChat = () => {
    socket.current.emit('addUser', username)
    setShowChat(true)
  }

  const closeChat = () => {
    setChatButton(true)
    setShowChat(false)
  }
  return (
    <>
      {!chatButton && (
        <div className='Socket'>
          {!showChat ? (
            <>
              <div className='joinChatContainer'>
                <input
                  type='text'
                  placeholder='Meno...'
                  onChange={(event) => {
                    setUsername(event.target.value)
                  }}
                />

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
            <Chat
              username={username}
              // arrivingMessage={arrivingMessage}
              onlineUsers={onlineUsers}
              setChatButton={setChatButton}
              setShowChat={setShowChat}
            />
          )}
        </div>
      )}
    </>
  )
}

export default Socket
