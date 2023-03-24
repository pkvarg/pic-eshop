import { Server } from 'socket.io'

const io = new Server(8990, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

const users = []

const addUser = (username, socketId) => {
  //console.log('addU', username)
  !users.some((user) => user.username === username) &&
    users.push({ username, socketId })
  console.log('UsersArray', users)
}

const removeUser = (socketId) => {
  users.filter((user) => user.socketId !== socketId)
}

// const getUser = (username) => {
//   return users.find((user) => user.username === username)
// }

io.on('connection', (socket) => {
  // when connect
  console.log(`User Connected: ${socket.id}`)
  // Take userId and socketId from user
  socket.on('addUser', (username) => {
    addUser(username, socket.id)
    io.emit('getUsers', users)
    //console.log('UN', username)
  })

  // send and get message

  socket.on('sendMessage', (data) => {
    console.log('data:', data)
    io.to(data.receiver.socketId).emit('receiveMessage', data)
  })

  // when disconnect
  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id)
    removeUser(socket.id)
    io.emit('getUsers', users)
    console.log('afterDisconnect:', users)
  })
})
