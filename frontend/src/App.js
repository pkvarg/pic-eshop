import React from 'react'
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
import Socket from './components/Socket'
import AdminChat from './components/AdminChat'

function App() {
  return (
    <>
      <Router>
        <StateContext>
          <Socket />
          <Header />
          <Toaster />

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

            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/completion' element={<PaymentCompletion />} />
            <Route path='/admin/chat' element={<AdminChat />} />
          </Routes>
          <Footer />
        </StateContext>
      </Router>
    </>
  )
}

export default App
