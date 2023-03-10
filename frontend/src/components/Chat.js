import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({ sckt, username, setChatButton, setShowChat }) {
  const [currentMessage, setCurrentMessage] = useState('')
  const [messageList, setMessageList] = useState([])
  const [minimize, setMinimize] = useState(false)

  useEffect(() => {
    sckt.on =
      ('getMessage',
      (data) => {
        console.log(data)
      })
  }, [])

  let senderUser

  let receiver = 'Admin'

  // if (username !== 'Admin') {
  //   receiver = 'Admin'
  // } else {
  //   receiver = ''
  // }

  // useEffect(() => {
  //   sckt.current.on('getMessage', (data) => {
  //     console.log(data)
  //     setCurrentMessage({
  //       author: data.author,
  //       message: data.message,
  //       time: data.time,
  //     })
  //   })
  // }, [sckt])

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        //room: room,
        author: username,
        receiver: receiver,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      }

      await sckt.emit('sendMessage', messageData)
      setMessageList((list) => [...list, messageData])
      setCurrentMessage('')
    }
  }

  // sckt.current.emit('sendMessage', {
  //   author: username,
  //   receiver: receiver,
  //   message: currentMessage,
  //   time:
  //     new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
  // })

  // useEffect(() => {
  //   socket.on('receive_message', (data) => {
  //     setMessageList((list) => [...list, data])
  //   })
  // }, [socket])

  // useEffect(() => {
  //   sckt.on('getMessage', (data) => {
  //     console.log(data)
  //     setMessageList((list) => [...list, data])
  //   })
  // }, [sckt])

  const closeChat = () => {
    setChatButton(true)
    setShowChat(false)
  }

  const toggleMinimize = () => {
    setMinimize((current) => !current)
  }

  return (
    <div className={minimize ? 'minimized' : 'chat-window'}>
      <div className='chat-header flex flex-row text-white justify-between'>
        <p>Chat</p>
        <div className='flex items-align gap-4'>
          <button onClick={() => toggleMinimize()}>_</button>
          <button className='mr-6' onClick={() => closeChat()}>
            X
          </button>
        </div>
      </div>
      <div className='chat-body'>
        <ScrollToBottom className='message-container'>
          {messageList.map((messageContent, i) => (
            <div
              key={i}
              className='message'
              id={username === messageContent.author ? 'you' : 'other'}
            >
              <div>
                <div className='message-content'>
                  <p>{messageContent.message}</p>
                </div>
                <div className='message-meta'>
                  <p id='time'>{messageContent.time}</p>
                  <p id='author'>{messageContent.author}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className={minimize ? 'Socket-none' : 'chat-footer'}>
        <input
          type='text'
          value={currentMessage}
          placeholder='Ahoj...'
          onChange={(event) => {
            setCurrentMessage(event.target.value)
          }}
          onKeyDown={(event) => {
            event.key === 'Enter' && sendMessage()
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
