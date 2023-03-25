import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'

import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'

import { socket } from './../Socket'

const UserChatComponent = () => {
  const [chat, setChat] = useState([])
  const [messageReceived, setMessageReceived] = useState(false)
  const [chatConnectionInfo, setChatConnectionInfo] = useState(false)
  //const [reconnect, setReconnect] = useState(false)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  console.log('useinf:', userInfo)

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      //setReconnect(false)
      var audio = new Audio('/audio/chat-msg.mp3')
      socket.on('no admin', (msg) => {
        setChat((chat) => {
          return [...chat, { admin: 'No admin available at the moment.' }]
        })
      })
      socket.on('server sends message from admin to client', (msg) => {
        setChat((chat) => {
          return [...chat, { admin: msg }]
        })
        setMessageReceived(true)
        audio.play()
        const chatMessages = document.querySelector('.cht-msg')
        chatMessages.scrollTop = chatMessages.scrollHeight
      })

      socket.on('admin closed chat', () => {
        setChat([])
        setChatConnectionInfo(
          `Admin closed the chat. Reload to start a new chat`
        )
        //setReconnect(true)
      })

      //return () => socket.disconnect()
    }
  }, [userInfo])

  const rejoinChat = () => {
    window.location.reload(false)
  }

  // const closeChat = () => {
  //   socket.disconnect()
  // }

  const clientSubmitChatMsg = (e) => {
    if (e.keyCode && e.keyCode !== 13) {
      return
    }
    setChatConnectionInfo('')
    setMessageReceived(false)
    const msg = document.getElementById('clientChatMsg')
    let v = msg.value.trim()
    if (v === '' || v === null || v === false || !v) {
      return
    }
    socket.emit('client sends message', v)
    setChat((chat) => {
      return [...chat, { client: v }]
    })
    msg.focus()
    setTimeout(() => {
      msg.value = ''
      const chatMessages = document.querySelector('.cht-msg')
      chatMessages.scrollTop = chatMessages.scrollHeight
    }, 200)
  }

  return !userInfo || !userInfo.isAdmin ? (
    <>
      <input type='checkbox' id='check' />
      <label className='chat-btn' htmlFor='check'>
        <FontAwesomeIcon icon={faCommentDots} className='text-[30px] comment' />

        {messageReceived && (
          <span className='absolute top-0 right-[50%] -translate-y-[50%] p-2 bg-[#CD3049] border border-light rounded-full'></span>
        )}

        <FontAwesomeIcon icon={faCircleXmark} className='text-[30px] close' />
      </label>

      <div className='chat-wrapper'>
        <div className='chat-header flex items-center justify-between'>
          <h6 className='text-[#ffffff]'>Let's Chat</h6>
          <div
            className='text-[#ffffff] cursor-pointer'
            onClick={() => rejoinChat()}
          >
            <FontAwesomeIcon icon={faRotateRight} className='text-[15px]' />
          </div>
          {/* <div className='cursor-pointer' onClick={() => closeChat()}>
            X
          </div> */}
        </div>
        <div className='chat-form'>
          <div className='cht-msg'>
            <p>{chatConnectionInfo}</p>
            {chat.map((item, id) => (
              <div key={id}>
                {item.client && (
                  <p className='bg-[yellow] mb-1 ms-2 text-[black] text-center p-3 rounded-pill w-[60%]'>
                    <b>You:</b> {item.client}
                  </p>
                )}
                {item.admin && (
                  <p className='bg-[orange] ml-[40%] p-3 mb-1 rounded-pill w-[60%] text-center mt-1'>
                    <b>Support:</b> {item.admin}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className='flex flex-col'>
            <textarea
              onKeyUp={(e) => clientSubmitChatMsg(e)}
              id='clientChatMsg'
              className='form-control'
              placeholder='Your Text Message'
            ></textarea>

            <button
              onClick={(e) => clientSubmitChatMsg(e)}
              className='bg-[green] p-1 mt-1 text-[#fff] rounded-lg'
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    ''
  )
}

export default UserChatComponent
