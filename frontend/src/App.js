import React, { useState, useEffect } from 'react'
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

// import axios from 'axios'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
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
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route path='/create-discount' element={<CreateDiscount />} />
        <Route path='/admin/reviews' element={<Reviews />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
