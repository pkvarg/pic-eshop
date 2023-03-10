import React, { useEffect, useState, useRef } from 'react'
import { useStateContext } from '../context/StateContext'
import Chat from '../components/Chat'
import io from 'socket.io-client'
// const socket = io.connect('http://localhost:2000')

const AdminChat = () => {
  const socket = useRef()

  const [username, setUsername] = useState('Admin')
  const [showChat, setShowChat] = useState(false)
  const { chatButton, setChatButton } = useStateContext()

  // useEffect(() => {
  //   socket.current = io('http://localhost:2000')
  //   socket.current.on('getMessage', (data) => {
  //     console.log(data)

  //   })
  // }, [])

  // useEffect(() => {
  //   socket.current.emit('addUser', username)
  //   socket.current.on('getUsers', (users) => {
  //     console.log(users)
  //   })
  // }, [username])

  const joinChat = () => {
    socket.current = io('http://localhost:2000')
    socket.current.emit('addUser', username)
    socket.current.on('getUsers', (users) => {
      console.log(users)
    })
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
          <Chat
            sckt={(socket.current = io('http://localhost:2000'))}
            username={username}
            setChatButton={setChatButton}
            setShowChat={setShowChat}
          />
        )}
      </div>
    </>
  )
}

export default AdminChat
