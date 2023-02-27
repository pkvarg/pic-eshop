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

// const users = []

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/audio', audioRoutes)
app.use('/api/video', videoRoutes)
app.use('/api/banner', bannerRoutes)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// app.post('/api/stripe', async (req, res) => {
//   let status, error
//   const { token, amount } = req.body
//   try {
//     await stripe.charges.create({
//       source: token.id,
//       amount,
//       currency: 'eur',
//     })
//     status = 'success'
//   } catch (error) {
//     console.log(error)
//     status = 'failure'
//   }
//   res.json({ error, status })
// })

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

const PORT = process.env.PORT || 2000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
