import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import colors from 'colors'
import morgan from 'morgan'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import authRoutes from './routes/authRoutes.js'
import audioRoutes from './routes/audioRoutes.js'
import videoRoutes from './routes/videoRoutes.js'
import bannerRoutes from './routes/bannerRoutes.js'
import Stripe from 'stripe'
import { Server } from 'socket.io'

dotenv.config()
connectDB()
const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://pictusweb.art',
      'https://prud.onrender.com',
    ],
  })
)

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/audio', audioRoutes)
app.use('/api/video', videoRoutes)
app.use('/api/banner', bannerRoutes)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.get('/config', (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  })
})

app.post('/create-payment-intent', async (req, res) => {
  const cartItems = req.body.cartItems
  const totalPrice = req.body.totalPrice * 100
  console.log('req:', totalPrice)

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'EUR',
      amount: totalPrice,
      automatic_payment_methods: { enabled: false },
    })

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    })
  }
})

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)
// RENDER

const io = new Server(8990, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

const admins = []
let activeChats = []
function get_random(array) {
  return array[Math.floor(Math.random() * array.length)]
}

io.on('connection', (socket) => {
  socket.on('admin connected with server', (adminName) => {
    admins.push({ id: socket.id, admin: adminName })
  })
  console.log('admins', admins)
  socket.on('client sends message', (msg) => {
    if (admins.length === 0) {
      socket.emit('no admin', '')
    } else {
      let client = activeChats.find((client) => client.clientId === socket.id)
      console.log('client:', client)
      let targetAdminId
      if (client) {
        targetAdminId = client.adminId
      } else {
        let admin = get_random(admins)
        activeChats.push({ clientId: socket.id, adminId: admin.id })
        targetAdminId = admin.id
        console.log('admin:', admin)
      }
      socket.broadcast
        .to(targetAdminId)
        .emit('server sends message from client to admin', {
          user: socket.id,
          message: msg,
        })
    }
  })

  socket.on('admin sends message', ({ user, message }) => {
    console.log('user,message:', user, message)
    socket.broadcast
      .to(user)
      .emit('server sends message from admin to client', message)
  })

  socket.on('admin closes chat', (socketId) => {
    socket.broadcast.to(socketId).emit('admin closed chat', '')
    let c = io.sockets.sockets.get(socketId)
    c.disconnect() // reason:  server namespace disconnect
  })

  socket.on('disconnect', (reason) => {
    // admin disconnected
    const removeIndex = admins.findIndex((item) => item.id === socket.id)
    if (removeIndex !== -1) {
      admins.splice(removeIndex, 1)
    }
    activeChats = activeChats.filter((item) => item.adminId !== socket.id)

    // client disconnected
    const removeIndexClient = activeChats.findIndex(
      (item) => item.clientId === socket.id
    )
    if (removeIndexClient !== -1) {
      activeChats.splice(removeIndexClient, 1)
    }
    socket.broadcast.emit('disconnected', {
      reason: reason,
      socketId: socket.id,
    })
  })
})

const PORT = process.env.PORT || 2000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
