// import React, { useState, useEffect } from 'react'
// import { useStateContext } from '../context/StateContext'
// import Chat from './Chat'
// import { socket } from './../Socket'

// const Socket = () => {
//   const [username, setUsername] = useState('')
//   const [showChat, setShowChat] = useState(false)
//   const [onlineUsers, setOnlineUsers] = useState(null)
//   const { chatButton, setChatButton } = useStateContext()
//   const [whoIsAdmin, setWhoIsAdmin] = useState()

//   useEffect(() => {
//     socket.emit('addUser', username)
//     // socket.on('getUsers', (users) => {
//     //   setOnlineUsers(users)
//     // })
//     socket.on('getUsers', (users) => {
//       setOnlineUsers(users)
//       setWhoIsAdmin(users.find((user) => user.username === 'Admin'))
//     })
//   }, [])

//   // let admin = onlineUsers.find((user) => user.username === 'Admin')

//   console.log('admin:', whoIsAdmin)

//   console.log('online:', onlineUsers)

//   const joinChat = () => {
//     socket.emit('addUser', username)
//     setShowChat(true)
//   }

//   const closeChat = () => {
//     setChatButton(true)
//     setShowChat(false)
//   }
//   return (
//     <>
//       {!chatButton && (
//         <div className='Socket'>
//           {!showChat ? (
//             <>
//               <div className='joinChatContainer'>
//                 <input
//                   type='text'
//                   placeholder='Meno...'
//                   onChange={(event) => {
//                     setUsername(event.target.value)
//                   }}
//                 />

//                 <div className='flex flex-row'>
//                   <button onClick={joinChat} className='enter'>
//                     Vstúpiť
//                   </button>
//                   <button className='exit' onClick={() => closeChat()}>
//                     X
//                   </button>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <Chat
//               username={username}
//               admin={whoIsAdmin}
//               setUsername={setUsername}
//               onlineUsers={onlineUsers}
//               setOnlineUsers={setOnlineUsers}
//               setChatButton={setChatButton}
//               setShowChat={setShowChat}
//             />
//           )}
//         </div>
//       )}
//     </>
//   )
// }

// export default Socket
