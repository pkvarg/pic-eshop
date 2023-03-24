import React, { useState, useEffect } from 'react'
import { socket } from './../Socket'
import AdminChatRoomComponent from './AdminChatRoomComponent'
import { setChatRooms } from '../actions/chatActions'
import { useDispatch, useSelector } from 'react-redux'

const AdminChat = () => {
  const dispatch = useDispatch()

  const { chatRooms } = useSelector((state) => state.adminChat)
  console.log(chatRooms)

  return (
    <div className='h-[75vh]'>
      <h1 className='text-left'>Admin</h1>
      {Object.entries(chatRooms).map((chatRoom, index) => (
        <AdminChatRoomComponent
          key={index}
          chatRoom={chatRoom}
          roomIndex={index + 1}
          socket={socket}
          socketUser={chatRoom[0]}
        />
      ))}
    </div>
  )
}

export default AdminChat

// import { useStateContext } from '../context/StateContext'
// import Chat2 from './Chat2'
// import { socket } from './../Socket'

// const AdminChat = () => {
//   const [username, setUsername] = useState('Admin')
//   const [showChat, setShowChat] = useState(false)
//   const [onlineUsers, setOnlineUsers] = useState(null)
//   const { chatButton, setChatButton } = useStateContext()
//   const [contactedCustomer, setContactedCustomer] = useState()

//   useEffect(() => {
//     socket.emit('addUser', username)
//     socket.on('getUsers', (users) => {
//       setOnlineUsers(users)
//       localStorage.setItem('online', JSON.stringify(users))
//     })
//   }, [])

//   //console.log('online:', onlineUsers)

//   let customers = localStorage.getItem('online')
//     ? JSON.parse(localStorage.getItem('online'))
//     : []

//   //console.log('cst:', customers)

//   const joinChat = (customer) => {
//     setContactedCustomer(customer)
//     console.log('coUs', customer)
//     socket.emit('addUser', username)
//     setShowChat(true)
//   }

//   const closeChat = (customer) => {
//     setChatButton(true)
//     setShowChat(false)
//     socket.disconnect()
//     // socket.on('disconnect', () => {
//     //   console.log(socket.connected)
//     // })
//   }

//   //console.log(showChat)

//   return (
//     <>
//       <div className='h-[75vh] mt-8 mb-8'>
//         <h1 className='text-center text-[40px]'>Admin Chat</h1>
//         <div className='m-8'>
//           <h2 className='text-[35px] mb-4'>Who is online?</h2>
//           {customers.map((customer) =>
//             customer.username !== '' && customer.username !== 'Admin' ? (
//               <>
//                 <div className='flex w-[700px] mb-[5px]'>
//                   <div className='flex gap-4 text-[22.5px] m-2'>
//                     <p key={customer.socketId}>{customer.username}</p>
//                     <p>{customer.socketId}</p>
//                   </div>
//                   <button
//                     onClick={() => joinChat(customer)}
//                     className='px-[2px] bg-green w-[40%] ml-auto'
//                   >
//                     Start chat with {customer.username}
//                   </button>
//                   <button
//                     onClick={() => closeChat(customer)}
//                     className='bg-red text-[#fff] w-[25px] ml-1'
//                   >
//                     X
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <p></p>
//             )
//           )}
//         </div>
//       </div>

//       {showChat === true && (
//         <div className='socket-admin'>
//           <Chat2
//             username={username}
//             contactedCustomer={contactedCustomer}
//             setChatButton={setChatButton}
//             setShowChat={setShowChat}
//           />
//         </div>
//       )}
//     </>
//   )
// }

// export default AdminChat
