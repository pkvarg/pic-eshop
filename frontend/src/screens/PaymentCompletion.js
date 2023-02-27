import React, { useEffect } from 'react'
import { useStateContext } from '../context/StateContext'

const PaymentCompletion = () => {
  const {
    totalPrice,
    setTotalPrice,
    totalQuantities,
    setTotalQuantities,
    cartItems,
    setCartItems,
  } = useStateContext()

  useEffect(() => {
    setCartItems([])
    setTotalQuantities(0)
    // setTotalPrice(0)
  }, [])

  return <h1>Payment Completed! 🎉</h1>
}

export default PaymentCompletion
