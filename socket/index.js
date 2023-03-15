import { Server } from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()
//const httpServer = http.createServer(app)

// const io = new Server(httpServer, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   },
// })

const io = new Server(8990, {
  cors: {
    origin: 'http://localhost:3000',
    //methods: ['GET', 'POST'],
  },
})

// const io = require('socket.io')(8990, {
//   cors: {
//     origin: 'http://localhost:3000',
//     //methods: ['GET', 'POST'],
//   },
// })

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
    console.log('UN', username)
  })

  // send and get message

  socket.on('sendMessage', (data) => {
    console.log('data:', data)
    io.to(data.receiver.socketId).emit('receiveMessage', data)
  })

  // socket.on('sendMessage', ({ author, receiver, message, time }) => {
  //   console.log('SM:', author, receiver, message, time)
  //   io.to(receiver.socketId).emit('getMessage', {
  //     author,
  //     message,
  //     time,
  //   })
  // })

  // when disconnect
  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id)
    removeUser(socket.id)
    io.emit('getUsers', users)
  })
})

// httpServer.listen(8990, console.log(`Socket server running on port 8990`))
