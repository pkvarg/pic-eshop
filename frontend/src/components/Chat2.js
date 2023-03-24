// import React, { useEffect, useState } from 'react'
// import ScrollToBottom from 'react-scroll-to-bottom'
// import { socket } from './../Socket'

// function Chat2({ username, contactedCustomer, setChatButton, setShowChat }) {
//   const [currentMessage, setCurrentMessage] = useState('')
//   const [messageList, setMessageList] = useState([])
//   const [minimize, setMinimize] = useState(false)

//   //console.log('contactedCustomer:', contactedCustomer)

//   const sendMessage = async () => {
//     if (currentMessage !== '') {
//       const messageData = {
//         author: username,
//         receiver: contactedCustomer,
//         message: currentMessage,
//         time:
//           new Date(Date.now()).getHours() +
//           ':' +
//           new Date(Date.now()).getMinutes(),
//       }

//       await socket.emit('sendMessage', messageData)
//       setMessageList((list) => [...list, messageData])
//       setCurrentMessage('')
//     }
//   }

//   useEffect(() => {
//     socket.on('receiveMessage', (data) => {
//       // console.log('data:', data)
//       setMessageList((list) => [...list, data])
//     })
//   }, [])

//   //console.log('Me:', username)

//   const closeChat = () => {
//     setChatButton(true)
//     setShowChat(false)
//   }

//   const toggleMinimize = () => {
//     setMinimize((current) => !current)
//   }

//   return (
//     <div className={minimize ? 'minimized' : 'chat-window'}>
//       <div className='chat-header2 flex flex-row text-white justify-between'>
//         <p>Chat with {contactedCustomer.username.toUpperCase()}</p>
//         <div className='flex items-align gap-4'>
//           <button onClick={() => toggleMinimize()}>_</button>
//           <button className='mr-6' onClick={() => closeChat()}>
//             X
//           </button>
//         </div>
//       </div>
//       <div className='chat-body'>
//         <ScrollToBottom className='message-container'>
//           {messageList.map((messageContent, i) => (
//             <div
//               key={i}
//               className='message'
//               id={username === messageContent.author ? 'you' : 'other'}
//             >
//               <div>
//                 <div className='message-content'>
//                   <p>{messageContent.message}</p>
//                 </div>
//                 <div className='message-meta'>
//                   <p id='time'>{messageContent.time}</p>
//                   <p id='author'>{messageContent.author}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </ScrollToBottom>
//       </div>
//       <div className={minimize ? 'Socket-none' : 'chat-footer'}>
//         <input
//           type='text'
//           value={currentMessage}
//           placeholder='Ahoj...'
//           onChange={(event) => {
//             setCurrentMessage(event.target.value)
//           }}
//           onKeyDown={(event) => {
//             event.key === 'Enter' && sendMessage()
//           }}
//         />
//         <button onClick={sendMessage}>&#9658;</button>
//       </div>
//     </div>
//   )
// }

// export default Chat2
