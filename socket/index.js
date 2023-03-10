const io = require('socket.io')(8900, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

const users = []

const addUser = (username, socketId) => {
  console.log('addU', username)
  !users.some((user) => user.username === username) &&
    users.push({ username, socketId })
  console.log('UsersArray', users)
}

const removeUser = (socketId) => {
  users.filter((user) => user.socketId !== socketId)
}

const getUser = (username) => {
  return users.find((user) => user.username === username)
}

io.on('connection', (socket) => {
  // when connect
  console.log(`User Connected: ${socket.id}`)
  // Take userId and socketId from user
  socket.on('addUser', (username) => {
    addUser(username, socket.id)
    io.emit('getUsers', users)
    console.log('UN', username)
  })

  // send and get message
  // socket.on('send_message', (data) => {
  //   console.log(data)
  //   socket.to(data.room).emit('receive_message', data)
  //  })
  socket.on('sendMessage', ({ author, receiver, message, time }) => {
    console.log('SM:', author, receiver, message, time)
    const user = getUser(receiver)
    console.log('user:', user)
    // io.to(user.socketId).emit(
    //   'receive_message',
    //   author,
    //   message,
    //   time
    // )
    io.to(user.socketId).emit('getMessage', {
      author,
      message,
      time,
    })
  })

  // when disconnect
  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id)
    removeUser(socket.id)
    io.emit('getUsers', users)
  })
})

// import { Server } from 'socket.io'

// const io = new Server(httpServer, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   },
// })
