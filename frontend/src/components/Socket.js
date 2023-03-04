import React, { useState } from 'react'
import { useStateContext } from '../context/StateContext'
import Chat from './Chat'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:2000')

const Socket = () => {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)
  const { chatButton, setChatButton } = useStateContext()

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room)
      setShowChat(true)
    }
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
                <input
                  type='text'
                  placeholder='Room ID...'
                  onChange={(event) => {
                    setRoom(event.target.value)
                  }}
                />
                <div className='flex flex-row'>
                  <button onClick={joinRoom} className='enter'>
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
              socket={socket}
              username={username}
              room={room}
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
