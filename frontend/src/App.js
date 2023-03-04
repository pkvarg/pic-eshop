import React, { useState, useEffect, useContext, createContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ContactScreen from './screens/ContactScreen'
import LoginScreen from './screens/LoginScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import ResetPasswordScreen from './screens/ResetPasswordScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderScreen from './screens/OrderScreen'
import OrderListScreen from './screens/OrderListScreen'
import CreateDiscount from './screens/CreateDiscount'
import Reviews from './screens/Reviews'
import CartScreen from './screens/CartScreen'
import ProductScreen from './screens/ProductScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import { StateContext } from './context/StateContext'
import { Toaster } from 'react-hot-toast'
import PaymentCompletion from './screens/PaymentCompletion'
import Chat from './components/Chat'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:5000')

function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room)
      setShowChat(true)
    }
  }
  return (
    <>
      <div className='Socket'>
        {!showChat ? (
          <div className='joinChatContainer'>
            <h3>Join A Chat</h3>
            <input
              type='text'
              placeholder='John...'
              onChange={(event) => {
                setUsername(event.target.value)
              }}
            />
            <input
              type='text'
              placeholder='Room ID...'
              onChange={(event) => {
                setRoom(event.target.value)
              }}
            />
            <button onClick={joinRoom}>Join A Room</button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>

      <Router>
        <StateContext>
          <Header />
          <Toaster />
          {/* <Chat /> */}

          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/search/:keyword' element={<HomeScreen />} />
            <Route path='/page/:pageNumber' element={<HomeScreen />} />
            <Route
              path='/search/:keyword/page/:pageNumber'
              element={<HomeScreen />}
            />

            <Route path='/contact' element={<ContactScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/forgot-password' element={<ForgotPasswordScreen />} />
            <Route
              path='/reset-password/:token/:name/:email/:id/:genToken'
              element={<ResetPasswordScreen />}
            />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            <Route path='/admin/productlist' element={<ProductListScreen />} />
            <Route
              path='/admin/productlist/:pageNumber'
              element={<ProductListScreen />}
            />
            <Route
              path='/admin/product/:id/edit'
              element={<ProductEditScreen />}
            />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/admin/orderlist' element={<OrderListScreen />} />
            <Route path='/create-discount' element={<CreateDiscount />} />
            <Route path='/admin/reviews' element={<Reviews />} />
            {/* <Route path='/cart'>
            <Route path=':id' element={<CartScreen />} />
            <Route path='' element={<CartScreen />} />
          </Route> */}
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/completion' element={<PaymentCompletion />} />
          </Routes>
          <Footer />
        </StateContext>
      </Router>
    </>
  )
}

export default App
