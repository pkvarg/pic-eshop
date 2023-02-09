import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ContactScreen from './screens/ContactScreen'
import LoginScreen from './screens/LoginScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import ResetPasswordScreen from './screens/ResetPasswordScreen'
import RegisterScreen from './screens/RegisterScreen'

import Header from './components/Header'
import Footer from './components/Footer'

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
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
